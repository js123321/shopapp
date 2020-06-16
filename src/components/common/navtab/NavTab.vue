<template>
  <div class="navtab">
    <div class="left"><slot name="left"></slot></div>
    <div class="content"><slot name="content"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavTab'
}
</script>

<style scoped>
.navtab {
  display:flex;
  height:44px;
  line-height:44px;
  text-align:center;
  /* box-shadow: 0px 1px 1px rgba(100, 100, 100, .1); */
}
.left, .right{
  width:60px;
}
.content {
  flex:1;
}
</style>
