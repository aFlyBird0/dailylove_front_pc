<template>
  <div id="app">
    <!-- 菜单导航 -->
    <!-- 登录注册不显示导航 -->
    <Menu
      mode="horizontal"
      active-name="show"
      v-show="($route.name != 'login' && $route.name != 'register')"
    >
      <MenuItem name="show" to="show">
        <Icon type="ios-paper" />展示
      </MenuItem>
      <MenuItem name="add" to="add">
        <Icon type="ios-add-circle" />添加
      </MenuItem>
      <MenuItem name="couple" to="couple">
        <Icon type="ios-people" />组队
      </MenuItem>
      <!-- <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
      </MenuItem>-->
    </Menu>
    <br />
    <!-- <p>Change theme</p>
    <RadioGroup v-model="theme1">
        <Radio label="light"></Radio>
        <Radio label="dark"></Radio>
        <Radio label="primary"></Radio>
    </RadioGroup>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
