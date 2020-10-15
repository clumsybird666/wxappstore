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
    }).then((result) => {
      this.setData({
        swiperList: result
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
    }).then((result) => {
      this.setData({
        floordata: result
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
