<template>
  <div id="show">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :pulling-text="pullingText"></van-pull-refresh>
    <introduce :showIntroduce="showIntroduce"></introduce>
    <br />
    <Row>
      <Col span="12" offset="6">
        <DatePicker
          type="date"
          :options="options"
          :value="selectedDate"
          @on-change="changeSelectedDate"
          placeholder="历史记录"
          style="width: 200px"
        ></DatePicker>
      </Col>

      <undo-delete ref="undoDeleteChild" @refresh="refresh" :undoDeletedThingId="deletedThingId"></undo-delete>
    </Row>
    <!-- 选择日期：{{selectedDate}} -->
    <h1>展示</h1>
    <!-- <p>注意展示功能尚未完善，登录注册是完整的，但展示界面的添加删除修改以及展示用的是系统默认账户</p>
    {{serverUrl}}
    <p>这是checkCode: {{globalData.checkCode}}</p>
    <p>这是sessionId: {{globalData.sessionId}}</p>-->
    <thing-show @refresh="refresh" :things="things" v-on:sendDelete="handleDelete"></thing-show>
    <BackTop></BackTop>
    <!-- <button @click="getUsers">获取所有用户</button> -->

    <!-- <Alert type="warning">确认删除吗</Alert> -->
    <!-- 加了导航栏就不需要按钮了 -->
    <!-- <div align="right">
      <Button @click="gotoCouple">组队</Button>
      <Button @click="gotoAdd">添加事件</Button>
    </div>-->
  </div>
</template>

<script>
import thingShow from "../components/thingShow.vue";
import thingShowScroller from "../components/thingShowScroller.vue";
import introduce from "../components/introduce.vue";
import undoDelete from "../components/undoDelete.vue";
import * as dateUtil from "../utils/dateUtil";
import { setTimeout } from "timers";

export default {
  name: "show",
  components: {
    thingShow,
    introduce,
    thingShowScroller,
    undoDelete
  },
  data() {
    return {
      things: [],
      page: 1,
      pageSize: 10,
      // userIdSelf: this.globalData.userIdSelf, //自己id  //TODO
      // userIdSelf: this.$cookies.get("userId"),  //自己userId
      userIdLove: 2, //爱人id  //TODO
      // checkCode: this.$route.params.checkCode,
      // sessionId: this.$route.params.sessionId
      selectedDate: "", //日期选择器显示时间
      dateShow: dateUtil.getFormatDate(), //实际展示查询的时间
      //日期选择器的快捷选项
      isLoading: false,
      count: 0,
      pullingText: "重新获取数据中",
      deletedThingId: 0, //被删除的thingId，用于撤销删除
      // activeUndoDelete: false,
      options: {
        shortcuts: [
          {
            text: "今天",
            value() {
              return new Date();
            },
            onClick: picker => {
              this.$Message.info("已切换到今天");
            }
          },
          {
            text: "昨天",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: picker => {
              this.$Message.info("已切换到昨天");
            }
          },
          {
            text: "一星期前",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              return date;
            },
            onClick: picker => {
              this.$Message.info("已切换到一星期前");
            }
          }
        ]
      }
    };
  },
  mounted: function() {
    //获取数据
    this.getThings();
    this.showLoveMessage();
  },
  computed: {
    //是否展示介绍界面
    showIntroduce: function() {
      //测试指引时使用
      // this.globalData.removeLaunchTime();
      let launchTime = this.globalData.getLaunchTime();
      //获取次数后要及时将次数加一，下次再打开就是1了
      if (launchTime != 0) {
        return false;
      }
      this.globalData.setLaunchTime();
      return false;
    }
  },
  methods: {
    gotoAdd: function() {
      this.$router.push({
        name: "add"
        // params: { sessionId: this.sessionId, checkCode: this.checkCode }
      });
    },
    gotoCouple: function() {
      this.$router.push({ name: "couple" });
    },
    gotoLogin: function() {
      this.$router.push({ name: "login" });
    },
    getThings: function() {
      let this_ = this;
      axios
        .post(
          this_.serverUrl + "/api/thing/get/two",
          {
            // date: dateUtil.getFormatDate(),
            date: this_.dateShow
            // userId: this_.userIdSelf
          },
          {
            headers: {
              Authorization: this_.globalData.getSessionId(),
              // Authorization: this_.$cookies.get("sessionId"),
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(result => {
          console.log("获取到的信息", result);
          this_.things = result.data.data; //所有页面的数据
          dateUtil.formatHMSToHM(this_.things);
        })
        .catch(error => {
          console.log(error.response);
          //如果授权失败就重新登录
          if (error.response.status == 401) {
            this_.$Message.error("用户状态异常，请重新登录");
            // this_.$cookies.remove("sessionId");
            this_.globalData.removeSessionId();
            this_.globalData.removeUserIdSelf();
            this_.globalData.removeCheckCode();
            this_.gotoLogin();
          }
        });
    },
    changeSelectedDate: function(dateNew) {
      this.selectedDate = dateNew;
      this.dateShow = dateNew;
      // console.log("时间改变为"+dateNew);
      //时间改变后重新获取事件
      if (this.dateShow != "") {
        this.getThings();
      }
    },
    refresh: function() {
      this.getThings();
      // console.log("父组件成功监听到子组件事件");
      console.log("重新获取数据");
    },
    onRefresh: function() {
      this.count++;
      this.$Message.info("刷新成功." + "当前是第" + this.count + "次刷新");
      this.getThings();
      this.isLoading = false;
    },
    //七夕特别活动
    showLoveMessage: function() {
      let userIdSelf = this.globalData.getUserIdSelf();
      console.log(userIdSelf);
      axios
        .get(
          "http://api.tianapi.com/txapi/saylove/?key=ef5a4865e200c388aed28afa87ab9403",
          { key: "ef5a4865e200c388aed28afa87ab9403" },
          {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(result => {
          let message = result.data.newslist[0].content;
          return message;
        })
        .then(message => {
          if (userIdSelf == "1" || userIdSelf == "2") {
            this.$Modal.info({
              title: "七夕特别惊喜",
              content: message
            });
          }
        });
      // .catch(error => {
      //   console.log(error);
      // });
    },
    //子组件删除事件后需要告诉父组件，父组件需要进行处理，以撤销
    handleDelete: function(deletedThingId) {
      this.deletedThingId = deletedThingId;
      this.getThings();
      //激活撤销删除组件
      // this.activeUndoDelete = true;
      console.log("激活撤销删除组件");
      this.$refs.undoDeleteChild.active();
    }
  }
};
</script>

<style>
</style>
