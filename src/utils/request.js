// 封装一个通用的接口调用方法
let request = (path, type= 'get', data={}) => {
  let url = `https://www.zhengzhicheng.cn/api/public/v1/${path}`
  return new Promise((resolve, rejuect) => {
    mpvue.request({
      url: url, // 仅为示例，并非真实的接口地址
      data: data,
      method: type,
      success: function (res) {
        resolve(res)
      }
    })
  })
}
export default request
