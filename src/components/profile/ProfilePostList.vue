<template>
  <div class="base-container">
    <div class="title">
      <span>게시글 관리</span>
      <v-pagination length="5"></v-pagination>
    </div>
    <div class="group-container">
      <div class="group-card">
        <span>게시글 제목</span>
        <div class="post-info">
          <div>
            <span>조회수</span>
            <span>1</span>
          </div>
          <div>
            <span>댓글</span>
            <span>1</span>
          </div>
        </div>
        <span>작성일 2023-04-05</span>
        <div class="card-action">
          <v-btn variant="tonal">바로가기</v-btn>
          <v-btn variant="tonal">삭제</v-btn>
        </div>
      </div>
    </div>
    <div class="align-self-end">
      <v-btn variant="tonal">전체 삭제</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePostList",
  methods: {
    async postsGetApiCall() {
      try {
        const response = await this.axios.get("/api/v1/posts");

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
.base-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #efefef;
  padding: 30px;
}
.base-container .title {
  display: flex;
  justify-content: space-between;
}
.group-container {
  display: flex;
}
.group-card {
  display: flex;
  flex-direction: column;
  gap: 5px;

  width: 25%;
  padding: 15px;

  border: 2px solid #efefef;
  border-radius: 10px;
}
.group-card .card-action {
  display: flex;
  gap: 10px;
}
.post-info {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>