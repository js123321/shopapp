<template>
  <div id="detail">
    <detail-nav-tab class="detail-nav" @tabClick="tabClick" ref="navTab"></detail-nav-tab>
    <scroll class="content-swiper" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" ref="aaa"/>
      <detail-base-info :goods="goods" ref="baseInfo" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailGoodsImgLoad="detailGoodsImgLoad" ref="goodsInfo" />
      <detail-param-info :param-info="paramInfo" ref="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <goods-list :goods="recommendInfo" ref="recommendInfo"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-cart-bar></detail-cart-bar>
  </div>
</template>

<script>
import DetailNavTab from './ChildComps/DetailNavTab'
import DetailSwiper from './ChildComps/DetailSwiper'
import DetailBaseInfo from './ChildComps/DetailBaseInfo'
import DetailShopInfo from './ChildComps/DetailShopInfo'
import DetailGoodsInfo from './ChildComps/DetailGoodsInfo'
import DetailParamInfo from './ChildComps/DetailParamInfo'
import DetailCommentInfo from './ChildComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList.vue'
import DetailCartBar from './ChildComps/DetailCartBar'
import Scroll from 'components/common/scroll/Scroll'

import { itemListenerMixin, backTopMixin } from 'common/mixin.js'
import { debounce } from 'common/utils.js'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from 'network/detail.js'
export default {
  name: 'Detail',
  mixins: [itemListenerMixin, backTopMixin], // 使用混入
  components: {
    DetailNavTab,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailCartBar,
    Scroll
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      commonTop: [], // 保存对应组件top值
      refreshTop: null
    }
  },
  created () {
    // this.iid = this.$route.params.iid
    this.iid = this.$route.query.iid
    this.getDetail(this.iid)
    this.getRecommend()

    this.refreshTop = debounce(() => {
      this.commonTop = []
      this.commonTop.push(this.$refs.aaa.$el.offsetTop)
      this.commonTop.push(this.$refs.paramInfo.$el.offsetTop)
      this.commonTop.push(this.$refs.commentInfo.$el.offsetTop)
      this.commonTop.push(this.$refs.recommendInfo.$el.offsetTop)
      this.commonTop.push(Number.MAX_SAFE_INTEGER)
    }, 200)
  },
  destroyed () {
    this.$bus.$off('itemImgLoad', 'itemImaListener')
  },
  methods: {
    /**
     * 获取数据相关
     */
    // 获取detail数据
    getDetail (iid) {
      getDetail(iid).then(res => {
        const data = res.result
        // console.log(data)
        // 1.获取轮播图数据
        this.topImages = data.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        )
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )
        // 6.获取评论信息
        this.commentInfo = data.rate.list[0]
      })
    },
    getRecommend () {
      getRecommend().then(res => {
        this.recommendInfo = res.data.list
      })
    },
    /**
     * 操作事件相关
     */
    // 详情图片展示加载刷新
    detailGoodsImgLoad () {
      this.refresh()
      this.refreshTop()
    },
    // 滚动对应位置，对应选项激活
    contentScroll (position) {
      this.isShowBackTopDom(position)
      var positionY = -position.y
      for (let i = 0; i < this.commonTop.length - 1; i++) {
        if (positionY >= this.commonTop[i] && positionY < this.commonTop[i + 1]) {
          this.$refs.navTab.currentIndex = i
        }
      }
    },
    // 点击滚动到对应位置
    tabClick (index) {
      this.$refs.scroll.scrollTo(0, -this.commonTop[index])
    }
  }
}
</script>

<style lang="less" scoped>
#detail {
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 99;
}
.detail-nav {
  background-color: #fff;
}
.content-swiper {
  position: absolute;
  top: 44px;
  bottom: 60px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
