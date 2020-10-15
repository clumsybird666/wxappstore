// pages/category/index.js
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  cateList: [],
  data: {
    //左侧数据
    leftList: [],
    //右侧数据
    rightList: [],
    //左侧菜单被点击的索引
    currentIndex: 0,
    // 右侧数据距离顶部距离
    scrollTop: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //缓存记录
    //1. 获取本地存储的数据
    const cates = wx.getStorageSync("cates");
    //2.判断数据是否存在  不存在则发送数据
    if (!cates) {
      this.getCateList()
    } else {
      //有旧的数据  定义过期时间
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCateList()
      } else {
        this.cateList = cates.data
        let leftList = this.cateList.map(k => k.cat_name)
        // 右侧数据
        let rightList = this.cateList[0].children
        this.setData({
          leftList,
          rightList
        })
      }
    }

  },
  //获取分类数据
  getCateList() {
    request({
      url: '/categories',
    }).then((result) => {
      this.cateList = result
      //数据存入本地
      wx.setStorageSync("cates", { time: Date.now(), data: this.cateList })
      // 左侧数据
      let leftList = this.cateList.map(k => k.cat_name)
      // 右侧数据
      // let rightList = this.cateList.map(v => v.children)
      let rightList = this.cateList[0].children
      this.setData({
        leftList,
        rightList
      })
    })
  },
  //滚动事件
  handleScroll(e) {
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  //点击左侧菜单
  handleItemTtap(e) {
    //获取左侧菜单索引
    const { menuindex } = e.currentTarget.dataset
    this.setData({
      currentIndex: menuindex
    })
    //根据左侧菜单索引获取右侧内容
    let rightList = this.cateList[menuindex].children
    this.setData({
      scrollTop: 0,
      rightList
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})