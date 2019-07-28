<template>
  <div>
    <div class="login-wrap">
      <br />
      <ul style="line-height:40px">
        <li>
          <h1>登录</h1>
        </li>
        <li>
          <Input v-model="username" placeholder="请输入用户名" clearable style="width: 200px" />
        </li>
        <li>
          <Input
            v-model="password"
            placeholder="请输入密码"
            @on-enter="login"
            clearable
            style="width: 200px"
          />
        </li>
        <!-- <li>
          <Checkbox v-model="rememberMe">记住密码</Checkbox>
        </li> -->
        <li>
          <Button type="primary" v-on:click="login" style="width: 200px">登录</Button>
        </li>
        <li>
          没有账号?
          <router-link to="/register">免费注册</router-link>
          <!-- <a href="/register">免费注册</a> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      hint: "",
      username: "",
      password: "",
      loginType: "email", //登录方式
      rememberMe: false //记住密码
    };
  },
  created: function(){
    this.autoLogin();
  },
  methods: {
    //输入检查
    inputCheck() {
      if (this.username == "") {
        this.$Message.warning("用户名不能为空");
        return false;
      }
      if (this.password == "") {
        this.$Message.warning("密码不能为空");
        return false;
      }
      return true;
    },
    gotoShow() {
      this.$router.push({
        name: "show"
      });
    },
    login() {
      if (!this.inputCheck()) {
        return;
      }
      let this_ = this;
      /*接口请求*/
      axios
        .post(this_.serverUrl + "/api/user/login", {
          username: this_.username,
          password: this_.password,
          loginType: this_.loginType,
          rememberMe: this_.rememberMe
        })
        .then(res => {
          console.log(res.data);
          if (res.data.meta.result == 1) {
            this_.$Message.success("登录成功");
            this_.globalData.setCheckCode(res.data.data.checkCode);
            this_.globalData.setSessionId(res.data.data.sessionId);
            // this_.globalData.setUserIdSelf(res.data.data.userId);
            //登录成功后将sessioId存到cookie中, 七天有效期
            this_.$cookies.set(
              "sessionId",
              res.data.data.sessionId,
              60 * 60 * 24 * 7
            );
            this.gotoShow();
          } else {
            this_.$Message.error(res.data.meta.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //自动登录
    autoLogin() {
      //获取浏览器存的sessionId
      let sessionId = this.$cookies.get("sessionId");
      //如果有cookie就去展示界面
      // console.log("cookie中的sessionId:"+sessionId);
      if (sessionId != "" && sessionId != null) {
        this.gotoShow();
      }
    },
    //获取自己的userId, 用来区分哪些事件是自己的, 只能修改自己的事件
    getUserIdSelf(){
      let this_ = this;
    }
  }
};
</script>