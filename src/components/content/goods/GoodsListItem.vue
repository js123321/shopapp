<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return []
      }
    }
  },
  methods: {
    // 监听图片加载完成
    imgLoad () {
      this.$bus.$emit('itemImgLoad')
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    width: 100%;
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price {
      color: var(--color-high-text);
      margin-right: 20px;
    }
    .collect {
      position: relative;
    }
    .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        // background: url("~assets/img/common/collect.svg") 0px 0px/14px 14px;
        background: url("~assets/img/common/collect.svg");
        background-position: 0 0;
        background-size: 14px 14px;
      }
  }
}
</style>>
