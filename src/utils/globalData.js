export default{
    checkCode: "",  //checkCode, 用来邀请以及验证
    sessionId: "",  //sessionId, 会话管理
    userIdSelf: "",  //自己的id
    setCheckCode(checkCode){
        this.checkCode = checkCode;
    },
    setSessionId(sessionId){
        this.sessionId = sessionId;
    },
    setUserIdSelf(userIdSelf){
        this.userIdSelf = userIdSelf;
    }
}