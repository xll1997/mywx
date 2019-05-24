<template>
  <div>
    <!-- 顶部搜索框 -->
    <search-bar></search-bar>
    <!-- 左侧菜单渲染 -->
    <div class="content">
      <div class="left">
        <div
          @click="changeRight(item.cat_id)"
          :class="{active: curretId == item.cat_id}"
          v-for="item in list"
          :key="item.cat_id"
          class="menu-item"
        >{{item.cat_name}}</div>
      </div>
      <!-- 右侧商标渲染 -->
      <!-- 二级内容 -->
      <div class="right">
        <div class="brand-item" v-for="second in getRightData" :key="second.cat_id">
          <!-- 标题 -->
          <div class="brand-title">{{second.cat_name}}</div>
          <div class="brand-list">
            <!-- 三级内容 -->
            <div class="brand" v-for="(img,i) in second.children" :key="img.cat_id">
              <img :src="img.cat_icon" mode="aspectFill">
              <p>{{img.cat_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "../../components/search";
import request from "../../utils/request";
export default {
  created() {
    this.cateData();
  },
  data() {
    return {
      curretId: 1,
      list: []
    };
  },
  computed: {
    getRightData() {
      let ret = this.list.filter(item => {
        return item.cat_id == this.curretId
      })
      let rt = ret[0].children;
      
      return rt;
    }
  },
  methods: {
    async cateData() {
      let ret = await request("categories");
      // console.log(ret)
      this.list = ret.data.message;
      // console.log(this.list);
    },
    changeRight(id) {
      this.curretId = id
    }
  },
  components: {
    "search-bar": searchBar
  }
};
</script>

<style scoped lang="scss">
@import "main.scss";
</style>
