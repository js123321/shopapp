// 混入
import BackTop from 'components/content/backTop/BackTop.vue'

import { debounce } from './utils'
export const itemListenerMixin = {
  data () {
    return {
      itemImaListener: null,
      refresh: null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImaListener = () => { this.refresh() }
    // 监听goodsitem图片加载完成
    // this.$bus.$on('itemImgLoad', () => {
    //   refresh()
    // })
    this.$bus.$on('itemImgLoad', this.itemImaListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick () { // 返回顶部
      this.$refs.scroll.scrollTo(0, 0)
    },
    isShowBackTopDom (position) {
      // backTop的显示和隐藏
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
