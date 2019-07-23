<template>
  <div id="show">
    <h1>展示界面</h1>
    <!-- {{serverUrl}} -->
    <!-- <p>这是checkCode: {{checkCode}}</p>
    <p>这是sessionId: {{sessionId}}</p> -->
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
      checkCode: this.$route.params.checkCode,
      sessionId: this.$route.params.sessionId
    };
  },
  mounted: function() {
    //获取数据
    this.getThings();
  },
  methods: {
    gotoAdd: function() {
      this.$router.push({ name: "add" });
    },
    getThings: function() {
      axios
        .post(this.serverUrl + "/api/thing/get", {
          date: dateUtil.getFormatDate(),
          userId: 1
        })
        .then(result => {
          console.log("获取到的信息", result);
          this.things = result.data.data; //所有页面的数据
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
