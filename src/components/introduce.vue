<template>
  <div id="introduce">
    <!-- <Button type="primary" @click="modal1 = true">Display dialog box</Button> -->
    <Modal v-model="showIntroduceThis" title="DailyLove简易入门指引" @on-ok="ok" @on-cancel="cancel">
      <!-- <strong>DailyLove简易入门指引</strong> -->
      <p>
        <strong>app初衷：</strong>记录自己每个时间段做了什么，起到提醒自己珍惜时间的作用，并且可以邀请一个人共享记录，互相监督
      </p>
      <p>
        <strong>添加：</strong>添加一个事件，记录某个时间段干了什么
      </p>
      <p>
        <strong>展示：</strong>按天显示事件，选中自己事件可修改或删除
      </p>
      <p>
        <strong>组队：</strong>组队后两人可看到对方事件
      </p>
      <p>
        <strong>设置：</strong>开发中，目前可更改字体颜色
      </p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "introduce",
  props: {
    showIntroduce: false
  },
  data() {
    return {
        showIntroduceThis: this.showIntroduce
    };
  },
  methods: {
    ok() {
      // this.$Message.info('Clicked ok');
    },
    cancel() {
      // this.$Message.info('Clicked cancel');
    }
  }
};
</script>