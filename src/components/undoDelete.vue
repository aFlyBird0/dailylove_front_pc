<template>
  <div>
    <!-- 撤销删除 -->
    <Affix :offset-bottom="10" style="float: right; margin-right: 10px" v-show="showUndoDelete">
      <Button shape="circle" size="large" icon="ios-undo" @click="undoDelete"></Button>
    </Affix>
  </div>
</template>

<script>
export default {
  name: "undo-delete",
  data() {
    return {
      undoDeleteLeftTime: 0 //撤销还剩几秒
    };
  },
  props: {
    undoDeletedThingId: Number //要背撤销删除的id
  },
  created() {},
  computed: {
    showUndoDelete() {
      return this.undoDeleteLeftTime > 0; //剩余显示时间大于0才显示, 并且要被父组件激活
    }
  },
  watch: {
    // //监听active属性变化
    // active() {
    //   if (this.active) {
    //     //等待下一次激活
    //     this.active = false;
    //     //时间调整为6秒
    //     this.undoDeleteLeftTime = 6;
    //     this.countLeftTime();
    //   }
    // }
  },
  methods: {
    undoDelete: function() {
      return;
    },
    //计算还有多少时间不显示
    countLeftTime() {
      let timeCount = setInterval(() => {
        this.undoDeleteLeftTime--;
        // this.sendCodeButtonHint = this.undoDeleteLeftTime + "s后可重发";
        // console.log(this.undoDeleteLeftTime);
        if (this.undoDeleteLeftTime == 0) {
          clearInterval(timeCount);
        }
      }, 1000);
      return;
    },
    //激活撤销删除组件
    active: function() {
      //时间调整为6秒
      this.undoDeleteLeftTime = 6;
      this.countLeftTime();
    },
    //撤销删除
    undoDelete: function() {
        this.undoDeleteLeftTime = 0;
      let this_ = this;
      axios
        .post(
          this_.serverUrl + "/api/thing/undoDelete",
          { thingId: this.undoDeletedThingId },
          { headers: { Authorization: this.globalData.getSessionId() } }
        )
        .then(res => {
          if (res.data.meta.result == 1) {
            //成功后重新获取数据
            this_.$Message.success("已撤销删除");
            console.log("重新获取");
            this_.$emit("refresh");
          } else {
            this_.$Message.error("撤销删除失败," + res.data.meta.message);
          }
        });
    }
  }
};
</script>

