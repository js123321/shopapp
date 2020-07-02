<template>
  <nav-tab>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="content" class="titles">
      <div
        class="titles-item"
        v-for="(item, index) in titles"
        :key="index"
        :class="{active: index === currentIndex}"
        @click="tabClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </nav-tab>
</template>

<script>
import NavTab from 'components/common/navtab/NavTab.vue'
export default {
  name: 'DetailNavTab',
  components: {
    NavTab
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    // 导航切换
    tabClick (index) {
      this.currentIndex = index
      this.$emit('tabClick', index) // (jun)
    },
    // 返回按钮
    backClick () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.back {
  margin-top: 6px;
}
.titles {
  display: flex;
  font-size: 13px;
  .titles-item {
    flex: 1
  }
  .active {
    color: var(--color-high-text);
  }
}
</style>>
