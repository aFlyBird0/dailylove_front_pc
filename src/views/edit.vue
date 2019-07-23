<template>
  <div>
    <h1>修改事件</h1>
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
          @on-change="changeTime"
          @on-clear="clearTime"
        ></TimePicker>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="6" offset="9">
        <Input
          v-model="oneThing.detail"
          placeholder="事件详情"
          @on-enter="updateThing"
        />
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="6" offset="9">
        <Button @click="updateThing" type="primary" style="width: 100%">提交</Button>
      </Col>
    </Row>
    <br />

    <Row>
      <Col span="6" offset="9">
        <Button @click="gotoShow" style="width: 100%">返回展示界面</Button>
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
        userId: 1,
        date: dateUtil.getFormatDate(),
        startTime: "",
        endTime: "",
        detail: ""
      },
      // alertShow: false, //事件不能为空的提示,
      //currentTime: dateUtil.getFormatTime(),
      startEndTime: [], //时间选择器显示时间
    };
  },
  mounted: function() {
    //初始化待修改事件为原信息，这样子只需要修改要修改的就行
    this.oneThing = this.$route.params.oneThing;
    this.startEndTime = [this.oneThing.startTime, this.oneThing.endTime];
  },
  computed: {},
  methods: {
    // initTime: function(){
    //   //在点击事件时触发，直接设置会覆盖placeholder
    //   //只有第一次打开会改变
    //   if(this.timePickerOpenTime > 0){
    //     return;
    //   }
    //   this.timePickerOpenTime++;
    //   this.startEndTime = [dateUtil.getFormatTime(), dateUtil.getFormatTime()];
    //   this.oneThing.startTime = dateUtil.getFormatTime();
    //   this.oneThing.endTime = dateUtil.getFormatTime();
    // },
    changeTime: function(SETime) {
      this.oneThing.startTime = SETime[0];
      this.oneThing.endTime = SETime[1];
    },
    clearTime: function(){
      this.startEndTime = [];
      this.oneThing.startTime = "";
      this.oneThing.endTime = "";
    },
    gotoShow: function() {
      this.$router.push({ name: "show" });
    },
    updateThing: function() {
      if (this.oneThing.detail == "") {
        this.$Message.warning("事件不能为空");
        return;
      }
      if(this.oneThing.startTime == ""){
        this.$Message.warning("时间未设置");
        return;
      }

      // console.log(this.oneThing);
      let this_ = this;
      this_.$axios
        .post(this.serverUrl + "/api/thing/update", this.oneThing)
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.meta.result == 1) {
            // console.log("添加成功");
            this.$Message.success("修改成功");
            //520毫秒后返回展示界面
            setTimeout(this.$router.push({ name: "show" }), 52.0);
          } else {
            console.log(
              "修改失败,错误码:" +
                data.meta.result +
                ",错误信息" +
                data.meta.message
            );
            this_.$Message.error("修改失败"+data.meta.message);
          }
        });
    }
  }
};
</script>

