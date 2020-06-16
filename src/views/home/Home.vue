<template>
  <div id="home">
    <nav-tab class="home-navtab">
      <div slot="content">购物街</div>
    </nav-tab>
    <tab-control
        class="tab-control"
        :titles="['推荐', '流行', '精品']"
        @tabClick="tabClick"
        @swiperImgLoad="swiperImgLoad"
        v-show="isTabFixed"
        ref="tabControl1"
    >
    </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control
        :titles="['推荐', '流行', '精品']"
        @tabClick="tabClick"
        ref="tabControl2"
      >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavTab from 'components/common/navtab/NavTab.vue'
import HomeSwiper from './ChildComps/HomeSwiper'
import HomeRecommend from './ChildComps/HomeRecommend'
import HomeFeature from './ChildComps/HomeFeature'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import { getMultiData, getProductData } from 'network/home.js'
import { debounce } from 'common/utils.js'

export default {
  name: 'Home',
  components: {
    NavTab,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0 // 保存离开时滚动条位置
    }
  },
  // 计算属性
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 请求商品数据
    this.getMultiData()
    this.getProductData('pop')
    this.getProductData('new')
    this.getProductData('sell')
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    // 监听goodsitem图片加载完成
    this.$bus.$on('itemImgLoad', () => {
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  destroyed () {
    console.log('销毁时执行')
  },
  deactivated () {
    // 离开时保存滚动条位置
    this.saveY = this.$refs.scroll.getScrollY()
  },
  activated () {
    // 跳到保存滚动条位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 刷新下滚动条(解决一些bug)
    this.$refs.scroll.refresh()
  },
  methods: {
    /**
     * 事件监听相关
     */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
        default:
          break
      }
      // 使2个tabControl的状态保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
      // 分类切换时能跳回来
      this.$refs.scroll.scrollTo(0, (-this.tabOffsetTop))
    },
    backClick () { // 返回顶部
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (position) { // 滚动监听
      // backTop的显示和隐藏
      this.isShowBackTop = (-position.y) > 1000
      // tabControl 吸顶效果
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore () { // 上拉加载更多
      this.getProductData(this.currentType)
    },
    swiperImgLoad () { // 监听轮播图图片加载
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    },
    /**
     * 网络请求相关
     */
    // 获取banner和recommend数据
    getMultiData () {
      getMultiData().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    // 获取商品展示数据
    getProductData (type) {
      const page = this.goods[type].page + 1
      getProductData(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  // padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-navtab {
  background-color: var(--color-tint);
  color: #fff;
  // position: fixed;
  // left: 0;
  // top: 0;
  // right: 0;
  // z-index: 99;
}
.tab-control {
  // position: sticky;
  // top: 44px;
  position: relative;
  z-index: 99;
}
// .fixed {
//   position: fixed;
//   left: 0;
//   right: 0;
//   top: 44px
// }
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
