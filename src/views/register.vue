<template>
  <div>
    <div class="register-wrap">
      <br />
      <ul style="line-height:40px">
        <li>
          <h1>注册</h1>
        </li>
        <li>
          <Input
            type="text"
            placeholder="请输入用户名"
            v-model="username"
            clearable
            style="width: 200px"
          />
        </li>
        <li>
          <Input
            type="password"
            placeholder="请输入密码"
            v-model="password"
            clearable
            style="width: 200px"
          />
        </li>
        <li>
          <Input
            type="password"
            placeholder="再次输入密码以确认"
            v-model="passwordVerify"
            clearable
            style="width: 200px"
          />
        </li>
        <li>
          <Input
            type="email"
            placeholder="请输入邮箱"
            v-model="email"
            @on-change="sendCodeCheck"
            clearable
            style="width: 200px"
          />
        </li>
        <li>
          <Input type="email" placeholder="请输入验证码" v-model="code" clearable style="width: 120px" />
          <Button
            type="primary"
            @click="sendCode"
            :disabled="disableSendCode"
            style="width: 80px"
          >获取验证码</Button>
        </li>
        <li>
          <Button type="primary" v-on:click="register" style="width: 200px">注册</Button>
        </li>
        <li>
          已有账号?
          <router-link to="/login">立即登录</router-link>
          <!-- <a href="/login">立即登录</a> -->
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
      showHint: false,
      hint: "",
      username: "",
      password: "",
      username: "",
      email: "",
      password: "",
      passwordVerify: "",
      code: "",
      registerType: "email",
      disableSendCode: true
    };
  },

  methods: {
    //发送验证码
    sendCode() {
      if (this.email == "") {
        this.$Message.warning("请填写邮箱");
      }
      let this_ = this;
      axios
        .post(this_.serverUrl + "/api/mail/getMailCode", {
          mailAddress: this_.email
        })
        .then(res => {
          console.log(res);
          if (res.data.meta.result == 1) {
            this_.$Message.info("邮件已发送");
          }
        });
    },
    //邮箱发送禁用
    sendCodeCheck() {
      this.disableSendCode = this.email == "";
    },
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
      if (this.password != this.passwordVerify) {
        this.$Message.warning("两次密码不一样, 请重新输入");
        return false;
      }
      if (this.email == "") {
        this.$Message.warning("邮箱不能为空");
        return false;
      }
      if (this.code == "") {
        this.$Message.warning("验证码不能为空");
      }
      return true;
    },
    //注册
    register() {
      /*接口请求*/
      if (!this.inputCheck()) {
        return;
      }
      let this_ = this;
      axios
        .post(this_.serverUrl + "/api/user/register", {
          username: this_.username,
          email: this_.email,
          password: this_.password,
          registerType: this_.registerType,
          mailCode: this_.code
        })
        .then(res => {
          console.log(res.data);
          if (res.data.meta.result == 1) {
            this_.$Message.success("注册成功");
            this_.$router.push({ name: "login" });
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