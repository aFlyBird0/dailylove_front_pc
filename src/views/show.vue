<template>
  <div id="show">
    <h1>展示界面</h1>
    <p>注意展示功能尚未完善，登录注册是完整的，但展示界面的添加删除修改以及展示用的是系统默认账户</p>
    <!-- {{serverUrl}} -->
    <p>这是checkCode: {{globalData.checkCode}}</p>
    <p>这是sessionId: {{globalData.sessionId}}</p>
    <thing-show @refresh="refresh" :things="things"></thing-show>
    <!-- <button @click="getUsers">获取所有用户</button> -->

    <!-- <Alert type="warning">确认删除吗</Alert> -->
    <div align="right">
      <Button @click="gotoAdd">添加事件</Button>
    </div>
  </div>
</template>

<script>
import thingShow from "../components/thingShow.vue";
import * as dateUtil from "../utils/dateUtil";
import { setTimeout } from "timers";

export default {
  name: "show",
  components: {
    thingShow
  },
  data() {
    return {
      things: [],
      page: 1,
      pageSize: 10,
      userIdSelf: 1, //自己id  //TODO
      userIdLove: 2, //爱人id  //TODO
      // checkCode: this.$route.params.checkCode,
      // sessionId: this.$route.params.sessionId
    };
  },
  mounted: function() {
    //获取数据
    this.getThings();
  },
  methods: {
    gotoAdd: function() {
      this.$router.push({
        name: "add",
        params: { sessionId: this.sessionId, checkCode: this.checkCode }
      });
    },
    getThings: function() {
      let this_ = this;
      axios
        .post(
          this.serverUrl + "/api/thing/get/two",
          {
            date: dateUtil.getFormatDate(),
            userId: 1
          },
          {
            headers: {
              Authorization: this_.globalData.sessionId,
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(result => {
          console.log("获取到的信息", result);
          this.things = result.data.data; //所有页面的数据
          dateUtil.formatHMSToHM(this.things);
        })
        .catch(error => {
          console.log(error);
        });
    },
    refresh: function() {
      this.getThings();
      console.log("父组件成功监听到子组件事件");
      this.getThings();
    }
  }
};
</script>

<style>
</style>
