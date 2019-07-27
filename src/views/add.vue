<template>
  <div>
    <h1>添加事件</h1>
    <br />
    <br />
    <Row>
      <Col span="6" offset="9">
        <!-- 请选择开始结束时间 -->
        <TimePicker
          :value="startEndTime"
          format="HH:mm"
          type="timerange"
          placement="bottom-end"
          placeholder="选择开始结束时间"
          style="width: 100%"
          confirm
          @on-open-change="initTime"
          @on-change="changeTime"
          @on-clear="clearTime"
        ></TimePicker>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="6" offset="9">
        <Input v-model="oneThing.detail" placeholder="事件详情" @on-enter="addThing" />
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="6" offset="9">
        <Button @click="addThing" type="primary" style="width: 100%">提交</Button>
      </Col>
    </Row>
    <br />

    <Row>
      <Col span="6" offset="9">
        <Button @click="gotoShow" :size="backButtonSize" style="width: 100%">返回展示界面</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import * as dateUtil from "../utils/dateUtil";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      oneThing: {
        thingId: "",
        // userId: this.$route.params.userIdSelf,
        userId: 1,
        date: dateUtil.getFormatDate(),
        startTime: "",
        endTime: "",
        detail: ""
      },
      // alertShow: false, //事件不能为空的提示,
      //currentTime: dateUtil.getFormatTime(),
      userIdSelf: 1, //自己id //TODO
      startEndTime: [], //时间选择器显示时间
      submitButtonSize: "large", //提交按钮大小
      backButtonSize: "large", //返回按钮大小
      timePickerOpenTime: 0, //时间选择器打开次数
      // sessionId: this.$route.params.sessionId,
      // checkCode: this.$route.params.checkCode
    };
  },
  mounted: function() {},
  computed: {},
  methods: {
    initTime: function() {
      //在点击事件时触发，直接设置会覆盖placeholder
      //只有第一次打开会改变
      if (this.timePickerOpenTime > 0) {
        return;
      }
      this.timePickerOpenTime++;
      this.startEndTime = [dateUtil.getFormatTime(), dateUtil.getFormatTime()];
      this.oneThing.startTime = dateUtil.getFormatTime();
      this.oneThing.endTime = dateUtil.getFormatTime();
    },
    changeTime: function(SETime) {
      this.oneThing.startTime = SETime[0];
      this.oneThing.endTime = SETime[1];
    },
    clearTime: function() {
      this.startEndTime = [];
      this.oneThing.startTime = "";
      this.oneThing.endTime = "";
    },
    gotoShow: function() {
      this.$router.push({
        name: "show"
        // params: { sessionId: this.sessionId, checkCode: this.checkCode }
      });
    },
    // inputFocus: function() {
    //   //用户重新输入的时候把警告隐藏
    //   this.alertShow = false;
    // },
    addThing: function() {
      if (this.oneThing.detail == "") {
        this.$Message.warning("事件不能为空");
        return;
      }
      if (this.oneThing.startTime == "") {
        this.$Message.warning("时间未设置");
        return;
      }

      // console.log(this.oneThing);
      let this_ = this;
      this_.$axios
        .post(this.serverUrl + "/api/thing/add", this.oneThing, {
          headers: { Authorization: this_.globalData.sessionId }
        })
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.meta.result == 1) {
            // console.log("添加成功");
            this.$Message.success("添加成功");
            //52毫秒后返回展示界面
            setTimeout(this.gotoShow(), 52.0);
            // setTimeout(this.$router.push({ name: "show" , params: this.sessionId}), 52.0);
          } else {
            console.log(
              "添加失败,错误码:" +
                data.meta.result +
                ",错误信息" +
                data.meta.message
            );
            this_.$Message.error("添加失败" + data.meta.message);
          }
        });
    }
  }
};
</script>

