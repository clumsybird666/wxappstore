//Page Object
import { request } from '../../request/index.js'

Page({
  data: {
    swiperList: [],
    catList: [],
    floordata: []

  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList()
    this.getCateList()
    this.getfloorList()

  },
  //获取轮播图数据
  getSwiperList() {
    request({
      url: '/home/swiperdata',
    }).then((res) => {

      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          res[key]['navigator_url'] = res[key]['navigator_url'].replace(/main/, 'index');
        }
      }
      this.setData({
        swiperList: res
      })
    })
  },

  //获取导航数据
  getCateList() {
    request({
      url: '/home/catitems',
    }).then((result) => {
      this.setData({
        catList: result
      })
    })
  },

  //获取瓷片区数据
  getfloorList() {
    request({
      url: '/home/floordata',
    }).then((res) => {
      console.log(res);
      let data = JSON.stringify(res)
      data = data.replace(/goods_list/g, 'goods_list/index')
      data = JSON.parse(data)
      console.log(data);
      this.setData({
        floordata: data
      })
    })
  },


  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
