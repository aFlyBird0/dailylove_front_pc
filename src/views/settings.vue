<template>
  <div>
    <h1>设置(开发中)</h1>
    <br/>
    <div>
      <Row>
        <Col span="12" offset="6">
          <strong>注意因为组件限制， 只有字体颜色可以自定义, 改背景颜色无效</strong>
        </Col>
      </Row>
    </div>
    <br/>
    <Row>
      <Col span="12" offset="6">
        选择自己事件背景颜色
        <ColorPicker alpha v-model="bgColorSelf" @on-change="changeBgColorSelf" />
      </Col>
    </Row>
    <Row>
      <Col span="12" offset="6">
        选择伴侣事件背景颜色
        <ColorPicker alpha v-model="bgColorLove" @on-change="changeBgColorLove" />
      </Col>
    </Row>
    <Row>
      <Col span="12" offset="6">
        选择自己事件字体颜色
        <ColorPicker alpha v-model="fontColorSelf" @on-change="changeFontColorSelf" />
      </Col>
    </Row>
    <Row>
      <Col span="12" offset="6">
        选择伴侣事件字体颜色
        <ColorPicker alpha v-model="fontColorLove" @on-change="changeFontColorLove" />
      </Col>
    </Row>
    <Row>
      <Col span="12" offset="6">
        <Button @click="setDefaultColor">还原成默认值</Button>
      </Col>
    </Row>
    <!-- <ul>
      <li>{{bgColorSelf}}</li>
      <li>{{bgColorLove}}</li>
      <li>{{fontColorSelf}}</li>
      <li>{{fontColorLove}}</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgColorSelf: localStorage.getItem("bgColorSelf")
        ? localStorage.getItem("bgColorSelf")
        : "#6290d162", //自己背景颜色
      bgColorLove: localStorage.getItem("bgColorLove")
        ? localStorage.getItem("bgColorLove")
        : "#e2868393", //伴侣背景颜色
      fontColorSelf: localStorage.getItem("fontColorSelf")
        ? localStorage.getItem("fontColorSelf")
        : "#fff", //自己字体颜色
      fontColorLove: localStorage.getItem("fontColorLove")
        ? localStorage.getItem("fontColorLove")
        : "#fff" //伴侣字体颜色
    };
  },
  methods: {
    changeBgColorSelf: function() {
      localStorage.setItem("bgColorSelf", this.bgColorSelf);
      console.log(localStorage.getItem("bgColorSelf"));
    },
    changeBgColorLove: function() {
      localStorage.setItem("bgColorLove", this.bgColorLove);
      console.log(localStorage.getItem("bgColorLove"));
    },
    changeFontColorSelf: function() {
      localStorage.setItem("fontColorSelf", this.fontColorSelf);
      console.log(localStorage.getItem("fontColorSelf"));
    },
    changeFontColorLove: function() {
      localStorage.setItem("fontColorLove", this.fontColorLove);
      console.log(localStorage.getItem("fontColorLove"));
    },
    setDefaultColor: function() {
      this.bgColorSelf = "#6290d162"; //自己背景颜色
      this.bgColorLove = "#e2868373"; //伴侣背景颜色
      this.fontColorSelf = "#fff"; //自己字体颜色
      this.fontColorLove = "#fff"; //伴侣字体颜色
      localStorage.setItem("bgColorSelf", this.bgColorSelf);
      localStorage.setItem("bgColorLove", this.bgColorLove);
      localStorage.setItem("fontColorSelf", this.fontColorSelf);
      localStorage.setItem("fontColorLove", this.fontColorLove);

    }
  }
};
</script>

<style>
</style>


