<template>
  <div>
    <h1>组队</h1>
    <!-- <p>我的邀请码: {{globalData.checkCode}}</p> -->
    <Input v-model="checkCodeInput" placeholder="请输入被邀请人邀请码" />
    <Row>
    <Button @click="copyCheckCodeToClipboard">复制我的邀请码到剪切板</Button>
    <Button @click="addCouple">提交</Button>
    <Button @click="gotoShow">返回展示</Button>
    </Row>
  </div>
</template>

<script>
export default {
  name: "couple",
  data() {
    return {
      checkCodeInput: ""
    };
  },
  methods: {
    addCouple: function() {
      if(this.checkCodeInput == ""){
        this.$Message.warning("邀请码不能为空");
        return;
      }
      let this_ = this;
      axios
        .post(
          this.serverUrl + "/api/couple/add",
          {
            userId: this_.globalData.userIdSelf,
            checkCode: this_.checkCodeInput
          },
          {
            headers: {
              // Authorization: this_.globalData.sessionId,
              Authorization: this.$cookies.get("sessionId"),
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.meta.result == 1) {
            // console.log("添加成功");
            this.$Message.success("组队成功");
            //52毫秒后返回展示界面
            setTimeout(this.gotoShow(), 52.0);
          } else {
            console.log(
              "组队失败,错误码:" +
                data.meta.result +
                ",错误信息" +
                data.meta.message
            );
            this_.$Message.error("组队失败" + data.meta.message);
          }
        });
    },
    copyCheckCodeToClipboard: function() {
      let this_ = this;
      this.$copyText(this_.globalData.checkCode).then(function(e) {
        this_.$Message.success("复制成功");
        console.log(e);
      });
    },
    gotoShow: function() {
      this.$router.push({ name: "show" });
    }
  }
};
</script>
