<template>
  <div>
    <!-- 搜索框 -->
    <my-search></my-search>
    <!-- 轮播图 -->
    <swiper :indicator-dots="indicatorDots" :autoplay="indicatorDots">
      <swiper-item :key="index" v-for="(item,index) in imgUrls">
        <image :src="item.image_src" class="slide-image" />
      </swiper-item>
    </swiper>
    <!-- 菜单 -->
    <div class="menu">
      <img :key="index" v-for="(item, index) in menuList" :src="item.image_src" alt>
    </div>
    <!-- 楼层效果 -->
    <div class="floor" v-for="(item, index) in getImg" :key="index">
      <div class="floor-title">
        <img :src="item.floor_title.image_src" alt>
      </div>
      <div class="floor-con">
        <div class="left">
          <img :src="item.leftImg" alt>
        </div>
        <div class="right">
          <img v-for="(img, i) in item.product_list" :key="i" :src="img.image_src" alt>
        </div>
      </div>
    </div>
    <!-- 回到顶部 -->
    <div @click="backTop" class="to-top" v-if="topShow">
      ︿
      <p>顶部</p>
    </div>
  </div>
</template>

<script>
import SearchBar from "../../components/search.vue";
import request from "../../utils/request";
export default {
  created() {
    // this.swiper();
    // this.menus();
    // this.floorLists();
    this.initData()
  },
  data() {
    return {
      imgUrls: [],
      indicatorDots: true,
      menuList: [],
      floorList: [],
      topShow: false
    };
  },
  methods: {
    async initData() {
      // 轮播图
      let imgurl = await request("home/swiperdata");
      this.imgUrls = imgurl.data.message;
      // 菜单
      let menu = await request("home/catitems");
      this.menuList = menu.data.message;
      // 楼层导航
      let floor = await request("home/floordata");
      this.floorList = floor.data.message;
    },
    /* 轮播图 */
    // async swiper() {
    //   // var that = this;
    //   // mpvue.request({
    //   //   url: "https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata", // 仅为示例，并非真实的接口地址
    //   //   success: function(res) {
    //   //     // console.log(res.data);
    //   //     let { message } = res.data;
    //   //     // console.log(message);
    //   //     that.imgUrls = message;
    //   //     // console.log(that.imgUrls);
    //   //   }
    //   // });
    //   let imgurl = await request("home/swiperdata");
    //   let { message } = imgurl.data;
    //   this.imgUrls = message;
    // },
    /* 菜单 */
    // async menus() {
    //   // var that = this;
    //   // mpvue.request({
    //   //   url: "https://www.zhengzhicheng.cn/api/public/v1/home/catitems", // 仅为示例，并非真实的接口地址
    //   //   success: function(res) {
    //   //     // console.log(res.data);
    //   //     let { message } = res.data;
    //   //     // console.log(message);
    //   //     that.menuList = message;
    //   //     // console.log(that.menuList);
    //   //   }
    //   // });
    //   let menu = await request("home/catitems");
    //   let { message } = menu.data;
    //   this.menuList = message;
    // },
    /* 楼层效果 */
    // async floorLists() {
    //   let floor = await request("home/floordata");
    //   let { message } = floor.data;
    //   // console.log(message)
    //   this.floorList = message;
    //   // console.log(this.floorList);
    // },
    /* 返回顶部 */
    backTop() {
      mpvue.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  },
  computed: {
    /* 楼层效果 */
    getImg() {
      return this.floorList.map(item => {
        let imgs = item.product_list.filter((img, index) => {
          return index > 0;
        });
        item.leftImg = item.product_list[0].image_src;
        item.product_list = imgs;
        // console.log(item);
        return item;
      });
    }
  },
  // 回到顶部
  onPageScroll(event) {
    this.topShow = event.scrollTop > 50;
  },
  // 下拉刷新
  onPullDownRefresh() {
    // console.log(111)
    this.initData()
  },
  components: {
    "my-search": SearchBar
  }
};
</script>

<style scoped>
.menu {
  margin-top: 15rpx;
  display: flex;
  justify-content: space-around;
}
.menu img {
  width: 148rpx;
  height: 168rpx;
}
.floor {
  margin-top: 10rpx;
  padding: 10rpx;
}
.floor .floor-title img {
  width: 750rpx;
  height: 60rpx;
}
.floor .floor-con {
  display: flex;
  justify-content: space-around;
}
.floor .floor-con .left img {
  width: 232rpx;
  height: 385rpx;
}
.floor .floor-con .right {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.floor .floor-con .right img {
  width: 232rpx;
  height: 188rpx;
  border-radius: 4px;
}
.to-top {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  position: fixed;
  right: 40rpx;
  bottom: 40rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
}
</style>
