export const request = (params) => {
  //加载中效果

  let ajaxNum = 0
  ajaxNum++
  wx.showLoading({
    title: '加载中',
    mask: true,
  });
  //定义公共的URl
  //https://api-hmugo-web.itheima.net/api/public/v1/categories
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: (result) => { resolve(result.data.message) },
      fail: (error) => {
        reject(error)
      },
      complete: () => {
        ajaxNum--
        if (ajaxNum === 0) {
          wx.hideLoading();
        }
        //隐藏加载动画


      }
    })
  })
}