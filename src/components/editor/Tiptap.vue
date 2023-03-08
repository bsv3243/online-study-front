<template>
  <div class="editor-container">
    <div v-if="editor" class="menu-bar">
      <div class="menu menu1">
        <button @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
          <IconBold/>
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
          <IconItalic/>
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }">
          <IconStrike/>
        </button>
      </div>
      <div class="menu menu2">
        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          <IconH1/>
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          <IconH2/>
        </button>
        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
          <IconH3/>
        </button>
      </div>
      <div class="menu menu2">
        <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
          <IconList/>
        </button>
        <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }">
          <IconListOrdered/>
        </button>
      </div>
      <div class="menu menu3">
        <button @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }">
          <IconDoubleQuotes/>
        </button>
        <button @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }">
          <IconCode/>
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <IconSepartor/>
        </button>
      </div>
    </div>
    <div class="input-container">
      <editor-content :editor="editor" class="editor"/>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import IconBold from "@/components/icons/IconBold";
import IconItalic from "@/components/icons/IconItalic";
import IconStrike from "@/components/icons/IconStrike";
import IconH1 from "@/components/icons/IconH1";
import IconH2 from "@/components/icons/IconH2";
import IconH3 from "@/components/icons/IconH3";
import IconCode from "@/components/icons/IconCode";
import IconListOrdered from "@/components/icons/IconListOrdered";
import IconList from "@/components/icons/IconList";
import IconDoubleQuotes from "@/components/icons/IconDoubleQuotes";
import IconSepartor from "@/components/icons/IconSepartor";
export default {
  name: "Tiptap",
  components: {
    IconSepartor,
    IconDoubleQuotes,
    IconList,
    IconListOrdered,
    IconCode,
    IconH3,
    IconH2,
    IconH1,
    IconStrike,
    IconItalic,
    IconBold,
    EditorContent,
  },
  data:() => ({
    editor: null,
    content: null,
  }),
  mounted() {
    this.editor = new Editor({
      content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
      extensions: [
        StarterKit,
      ],
      onUpdate: (({editor}) => {
        this.content = editor.getHTML();
        this.$emit('content', this.content);
    })
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    contentUpdate(e) {
      this.$emit('content', e.target.value)
    }
  }
}
</script>

<style lang="scss">
button {
  border-radius: 5px;
  padding: 3px
}
button:hover {
  background-color: #e7e7e7;
}
.editor-container {
  border: 1px solid #ced4da;
  border-radius: 5px;
}
.menu-bar {
  border-bottom: 1px solid #ced4da;
  padding: 5px;
  display: flex;
}
.menu {
  display: flex;
  gap: 5px;
}
.menu1 {
  border-right: 1px solid #ced4da;
  padding-right: 10px;
}
.menu2 {
  border-right: 1px solid #ced4da;
  padding-right: 10px;
  padding-left: 10px;
}
.menu3 {
  padding-left: 10px;
}
.input-container {
}
.editor {
  padding: 10px;
}
.border-center {
  border-right: 1px solid #ced4da;
}
/* Basic editor styles */
.ProseMirror {
  min-height: 50vh;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }
}
.ProseMirror:focus {
  outline: none;
}
</style>