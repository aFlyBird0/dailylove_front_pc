<template>
  <div>
    <h1>登录</h1>
    <div class="login-wrap">
      <ul style="line-height:40px ">
        <li >
          <ButtonGroup style="width: 240px">
            <Button @click="toUsernameLogin" type="dashed" style="width:120px">用户名登录</Button>
            <Button @click="toEmailLogin" type="dashed" style="width:120px">邮箱登录</Button>
          </ButtonGroup>
        </li>
        <li  v-show="usernameLogin">
          <Input v-model="username" placeholder="请输入用户名" clearable style="width: 240px" />
        </li>
        <li  v-show="emailLogin">
          <Input v-model="email" placeholder="请输入邮箱" clearable style="width: 240px" />
        </li>
        <li >
          <Input
            v-model="password"
            placeholder="请输入密码"
            @on-enter="usernameLogin ? loginByUsername : loginByEmail"
            clearable
            style="width: 240px"
          />
        </li>
        <li  v-show="usernameLogin">
          <Button type="primary" v-on:click="loginByUsername" style="width: 240px">登录</Button>
        </li>
        <li  v-show="emailLogin">
          <Button type="primary" v-on:click="loginByEmail" style="width: 240px">登录</Button>
        </li>
        <li >
          <Checkbox v-model="rememberMe">记住密码 |</Checkbox>
          <router-link to="/resetPassword">账号密码找回 </router-link>|
          <router-link to="/register">免费注册</router-link>
        </li>
      </ul>

      <!-- <div>
        <Row>
          <Col span="3" offset="9">
            <Button @click="toUsernameLogin" type="text" long>用户名登录</Button>
          </Col>
          <Col span="3">
            <Button @click="toEmailLogin" type="text" long>邮箱登录</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="6" offset="9">
            <Input
              v-model="username"
              placeholder="请输入用户名"
              clearable
              style="width: 240px"
              v-show="usernameLogin"
            />
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="9">
            <Input
              v-model="email"
              placeholder="请输入邮箱"
              clearable
              style="width: 240px"
              v-show="emailLogin"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="6" offset="9">
            <Input
              v-model="password"
              placeholder="请输入密码"
              @on-enter="login"
              clearable
              style="width: 240px"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="6" offset="9">
            <Button
              type="primary"
              v-on:click="loginByUsername"
              style="width: 240px"
              v-show="usernameLogin"
            >登录</Button>
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="9">
            <Button
              type="primary"
              v-on:click="loginByEmail"
              style="width: 240px"
              v-show="emailLogin"
            >登录</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="6" offset="9">
            <Checkbox v-model="rememberMe">记住密码 |</Checkbox>
            <router-link to="/resetPassword">账号密码找回</router-link>|
            <router-link to="/register">免费注册</router-link>
          </Col>
        </Row>
      </div>-->
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
      email: "",
      password: "",
      loginType: "email", //登录方式
      rememberMe: true, //记住密码,
      usernameLogin: true, //用户名登录
      emailLogin: false //邮箱登录
    };
  },
  created: function() {
    this.autoLogin();
  },
  methods: {
    //输入检查
    inputCheck() {
      if (this.username == "" && this.email == "") {
        this.$Message.warning("用户名或邮箱不能为空");
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
    loginByUsername() {
      if (!this.inputCheck()) {
        return;
      }
      let this_ = this;
      /*接口请求*/
      axios
        .post(this_.serverUrl + "/api/user/login/username", {
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
            this_.globalData.setUserIdSelf(res.data.data.userId);
            //清除sessionId缓存
            this_.globalData.removeSessionId();
            //记住密码的话缓存sessionId
            if (this_.rememberMe) {
              this_.globalData.setSessionId(res.data.data.sessionId);
            }

            //登录成功后将sessioId存到cookie中, 七天有效期
            //注意后来用全局变量形式改写，并且换成缓存
            //这样子以后修改变量存储形式以及获取形式不需要修改调用的地方，接口名不变
            // this_.$cookies.set(
            //   "sessionId",
            //   res.data.data.sessionId,
            //   60 * 60 * 24 * 7
            // );
            // //保存用户id, 只有选中userId为自己userId的事件才能修改
            // this_.$cookies.set(
            //   "userId",
            //   res.data.data.userId,
            //   60 * 60 * 24 * 7
            // );
            this.gotoShow();
          } else {
            this_.$Message.error(res.data.meta.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loginByEmail() {
      if (!this.inputCheck()) {
        return;
      }
      let this_ = this;
      /*接口请求*/
      axios
        .post(this_.serverUrl + "/api/user/login/email", {
          email: this.email,
          password: this_.password,
          loginType: this_.loginType,
          rememberMe: this_.rememberMe
        })
        .then(res => {
          console.log(res.data);
          if (res.data.meta.result == 1) {
            this_.$Message.success("登录成功");
            this_.globalData.setCheckCode(res.data.data.checkCode);
            this_.globalData.setUserIdSelf(res.data.data.userId);
            //清除sessionId缓存
            this_.globalData.removeSessionId();
            //记住密码的话缓存sessionId
            if (this_.rememberMe) {
              this_.globalData.setSessionId(res.data.data.sessionId);
            }
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
      // let sessionId = this.$cookies.get("sessionId");
      let sessionId = this.globalData.getSessionId();
      //如果有cookie就去展示界面
      // console.log("cookie中的sessionId:"+sessionId);
      if (sessionId != "" && sessionId != null) {
        this.gotoShow();
      }
    },
    toUsernameLogin: function() {
      this.usernameLogin = true;
      this.emailLogin = false;
    },
    toEmailLogin: function() {
      this.usernameLogin = false;
      this.emailLogin = true;
    }
  }
};
</script>

<style>
.login-wrap {
  text-align: center;
  margin: 0, auto;
}
</style>
