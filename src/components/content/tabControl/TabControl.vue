<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      :class="{active: index === currentIndex}"
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      this.$emit('tabClick', index) // 自定义事件，父组件监听，获取index
    }
  }
}
</script>

<style lang="less" scoped>
.tab-control {
  background: #fff;
  display: flex;
  text-align: center;
  font-size: 15px;
  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    span {
      padding: 5px;
    }
  }
  .active {
    color: var(--color-high-text);
    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
</style>>
