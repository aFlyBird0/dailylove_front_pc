<template>
  <div id="show">
    <Row>
      <Col span="3" offset="18">
        <DatePicker
          type="date"
          :options="options"
          :value="selectedDate"
          @on-change="changeSelectedDate"
          placeholder="历史记录"
          style="width: 200px"
        ></DatePicker>
      </Col>
    </Row>
    <!-- 选择日期：{{selectedDate}} -->
    <h1>展示</h1>
    <!-- <p>注意展示功能尚未完善，登录注册是完整的，但展示界面的添加删除修改以及展示用的是系统默认账户</p>
    {{serverUrl}}
    <p>这是checkCode: {{globalData.checkCode}}</p>
    <p>这是sessionId: {{globalData.sessionId}}</p>-->

    <thing-show @refresh="refresh" :things="things"></thing-show>
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
      userIdSelf: this.globalData.userIdSelf, //自己id  //TODO
      userIdLove: 2, //爱人id  //TODO
      // checkCode: this.$route.params.checkCode,
      // sessionId: this.$route.params.sessionId
      selectedDate: "", //日期选择器显示时间
      dateShow: dateUtil.getFormatDate(), //实际展示查询的时间
      //日期选择器的快捷选项
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
    getThings: function() {
      let this_ = this;
      axios
        .post(
          this_.serverUrl + "/api/thing/get/two",
          {
            // date: dateUtil.getFormatDate(),
            date: this_.dateShow,
            // userId: this_.userIdSelf
          },
          {
            headers: {
              // Authorization: this_.globalData.sessionId,
              Authorization: this_.$cookies.get("sessionId"),
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
          console.log(error);
        });
    },
    changeSelectedDate: function(dateNew){
      this.selectedDate = dateNew;
      this.dateShow = dateNew;
      // console.log("时间改变为"+dateNew);
      //时间改变后重新获取事件
      if(this.dateShow != ""){
        this.getThings();
      }
    },
    refresh: function() {
      this.getThings();
      // console.log("父组件成功监听到子组件事件");
    }
  }
};
</script>

<style>
</style>
