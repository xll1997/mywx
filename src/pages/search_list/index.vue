<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <div class="search-input">
        <icon type="search" size="16" color="#999"/>
        {{keyword}}
      </div>
    </div>
    <!-- tab切换 -->
    <div class="tabs">
      <div
        @click="changeTabs(index)"
        :class="{active: currentIndex === index}"
        class="tab-item"
        v-for="(item,index) in tabNames"
        :key="index"
      >{{item}}</div>
    </div>
    <!-- 列表展示 -->
    <div class="goods-list">
      <navigator url v-for="item in dataList" :key="item.goods_id" class="goods-item">
        <img :src="item.goods_small_logo" mode="aspectFill">
        <div class="goods-right">
          <h4>{{item.goods_name}}</h4>
          <div class="price">
            <span>￥</span>
            {{item.goods_price}}
          </div>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      currentIndex: 0,
      tabNames: ["综合", "销量", "价格"],
      keyword: "",
      dataList: [],
      pagenum: 1
    };
  },
  methods: {
    async getData() {
      let ret = await request("goods/search", "get", {
        query: this.keyword,
        pagenum: this.pagenum
      });
      // console.log(ret);
      this.dataList = ret.data.message.goods;
    },
    //  切换tab栏
    changeTabs(id) {
      this.currentIndex = id;
    }
  },
  onLoad(param) {
    this.keyword = param.query;
  }
};
</script>

<style lang="scss" scoped>
@import "./main.scss";
</style>
