<template>
  <div>
    <div class="search">
      <navigator url="/pages/search/main">
        <div class="search-item">
          <icon type="search"></icon>
          <span>搜索</span>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.search {
  background-color: #eb4450;
  text-align: center;
  padding: 20rpx;
}
.search-item {
  background-color: #fff;
}
.search-item icon {
  vertical-align: middle;
}
</style>
