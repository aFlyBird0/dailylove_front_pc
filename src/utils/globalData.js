/**
 * 自己写的一个全局变量的实现形式，以后改变变量的存储方式不用改具体位置，
 * 而是修改这个文件的实现，包括以后改成vuex
 */



export default{
    checkCode: "",  //checkCode, 用来邀请以及验证
    sessionId: "",  //sessionId, 会话管理
    userIdSelf: "",  //自己的id
    launchTime:"",  //应用启动次数，用来判断是否展示新手引导
    getCheckCode(){
        return localStorage.getItem("checkCode");
    },
    setCheckCode(checkCode){
        localStorage.setItem("checkCode", checkCode);
    },
    removeCheckCode(){
        localStorage.removeItem("checkCode", this.checkCode);
    },

    getSessionId(){
        return localStorage.getItem("sessionId");
    },
    setSessionId(sessionId){
        localStorage.setItem("sessionId", sessionId);
    },
    removeSessionId(){
        localStorage.removeItem("sessionId");
    },

    getUserIdSelf(){
        return localStorage.getItem("userIdSelf");
    },
    setUserIdSelf(userIdSelf){
        localStorage.setItem("userIdSelf", userIdSelf);
    },
    removeUserIdSelf(){
        localStorage.removeItem("userIdSelf");
    },

    getLaunchTime(){
        let launchTime = localStorage.getItem("launchTime");
        if(launchTime != null){
            return parseInt(launchTime);
        }
        return 0;
    },
    setLaunchTime(){
        let launchTime = localStorage.getItem("launchTime");
        //反正登录次数只有0和非0， 所以直接用1设置
        localStorage.setItem("launchTime", 1);
    },
    //仅测试用，实际生产环境不能调用
    removeLaunchTime(){
        localStorage.removeItem("launchTime");
    }
}