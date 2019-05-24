<template>
  <div>
    <div class="search">
      <div class="search-content">
        <div class="search-input">
          <icon type="search" size="16"/>
          <input @confirm="saveKeyword" @input="searchKeyWord" placeholder="请输入关键字" v-model="keyword">
        </div>
        <button @click="cancelSearch" class="cancel" v-if="keyword">取消</button>
      </div>
      <div v-if="keyword" class="search-modal" v-for="item in keyList" :key="item.goods_id">
        <div class="search-item">{{item.goods_name}}</div>
      </div>
    </div>
    <!-- 搜索关键字历史 -->
    <div class="history">
      <h4>搜索历史</h4>
      <icon @click="clearKeyword" type="clear" size="16"/>
    </div>
    <!-- 关键字列表 -->
    <div class="history-list">
      <div class="history-item" v-for="(item, index) in historyKeyword" :key="index">
        <navigator :url="'/pages/search_list/main?query=' + item ">{{item}}</navigator>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../utils/request";
export default {
  data() {
    return {
      keyword: "",
      keyList: [],
      isLoading: false,
      historyKeyword: mpvue.getStorageSync('hkw') || []
    };
  },
  methods: {
    // 清空历史
    clearKeyword() {
      this.historyKeyword = []
      mpvue.clearStorageSync()
    },
    // 回车保存历史记录
    saveKeyword() {
      this.historyKeyword.unshift(this.keyword)
      this.historyKeyword = [...new Set(this.historyKeyword)]
      mpvue.setStorageSync('hkw', this.historyKeyword)
      mpvue.navigateTo({
        url: '/pages/search_list/main?query=' + this.keyword
      })
    },
    searchKeyWord() {
      // console.log(res);
      // console.log(this.keyList);
      /* 函数防抖 */
      let that = this;
      clearInterval(this.timer);
      this.timer = setTimeout(async () => {
        let res = await request("goods/qsearch", "get", {
          query: that.keyword
        });
        this.keyList = res.data.message;
      }, 1000);

      /* 函数节流 */
      // if(this.isLoading) {
      //   return;
      // }
      // this.isLoading = true;
      // setTimeout(async () => {
      //   let res = await request('goods/qsearch','get',{query:that.keyword})
      //   this.keyList = res.data.message
      //    this.isLoading = false
      // },1000)
    },
    cancelSearch() {
      this.keyword = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "main.scss";
</style>
