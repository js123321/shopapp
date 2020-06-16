<template>
  <div id="app">
    <!--keep-alive路由切换组件不销毁 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/tabbar/MainTabBar.vue'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style lang="less">
@import '~assets/css/base.css';
</style>
