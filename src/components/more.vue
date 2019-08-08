<template>
  <div>
    <!-- 用来显示右上角的三个点 -->
    <Affix :offset-top="10" style="float: right; margin-right: 10px">
      <Button shape="circle" size="large" icon="ios-more-outline" @click="showDrawer=true"></Button>
    </Affix>
    <!-- 抽屉，具体操作 -->
    <Drawer title="更多" :closable="false" v-model="showDrawer" simple>
      <div>
        <Collapse v-model="chooseCollpase">
          <Panel name="1">
            快速指引
            <div slot="content">
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
            </div>
          </Panel>
          <Panel name="2">
            小技巧
            <div slot="content">
              <p>
                <strong>历史记录：</strong>可查看过去历史
                <strong>撤销删除：</strong>删除事件后可在6秒内点击右上角按钮撤销
              </p>
            </div>
          </Panel>
          <Panel name="3">
            意见反馈（开发中）
            <p slot="content">开发中</p>
          </Panel>
        </Collapse>
      </div>
      <div></div>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "more",
  data() {
    return {
      showDrawer: false,
      chooseCollpase: null, //选择哪个默认展开
    };
  }
};
</script>

