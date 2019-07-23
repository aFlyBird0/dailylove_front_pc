<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" />
    <p>
      <router-link :to="{name:'show'}">展示界面</router-link>
      <p>路由出现了问题<p>
    </p> -->
    <!-- <p>
      <Button @click="gotoShow">点我去展示界面</Button>
      <Button @click="gotoIndex">点我返回主页面</Button>
    </p> -->
    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: "app",
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    gotoShow: function(){
      this.$router.push({name:'show'});
    }
  }
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
