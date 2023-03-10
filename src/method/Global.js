export default {
    /**
     * axios 에러를 콘솔에 출력한다.
     * @param err
     */
    printError(err) {
        const response = err.response.data;
        const messages = response.message;
        for(const message of messages) {
            console.log(message)
        }
    },
    /**
     * 주어진 초를 "0시간 00분" 문자열로 반환한다.
     * @param seconds
     * @returns {string}
     */
    getTimeHM(seconds) {
        let hour = 0;
        let min = 0;
        if(seconds !== undefined) {
            hour = seconds/3600;
            min = (seconds/60)%60;

            if(min < 10) {
                min = "0" + min;
            }
        }

        return hour + "시간 " + min + "분";
    },
    /**
     * isoString 을 Date 로 반환한다.
     * @param isoString
     * @returns {Date}
     */
    getDate(isoString) {
        return new Date(isoString.substring(0, 19));
    }
}