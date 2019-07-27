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
          <Input v-model="password" placeholder="请输入密码" @on-enter="login" clearable style="width: 200px" />
        </li>
        <li>
          <Button type="primary" v-on:click="login">登录</Button>
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
      loginType: "email"
    };
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
          loginType: this_.loginType
        })
        .then(res => {
          console.log(res.data);
          if (res.data.meta.result == 1) {
            this_.$Message.success("登录成功");
            this_.globalData.setCheckCode(res.data.data.checkCode);
            this_.globalData.setSessionId(res.data.data.sessionId);
            this_.globalData.setUserIdSelf(res.data.data.userId);
            this_.$router.push({
              name: "show"
              // params: {
              //   checkCode: res.data.data.checkCode,
              //   sessionId: res.data.data.sessionId
              // }
            });
          } else {
            this_.$Message.error(res.data.meta.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>