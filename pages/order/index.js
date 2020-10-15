// pages/order/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部订单",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 2,
        value: "退款/退货",
        isActive: false
      }
    ],
  },

  tabsItemChange(e) {
    //获取菜单对象
    let index = e.detail
    this.handleChangeNav(index)
  },
  handleChangeNav(index) {
    let { tabs } = this.data
    //遍历设置对应激活
    tabs.forEach((v, k) => { k === index ? v.isActive = true : v.isActive = false });
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    let { type } = pages[pages.length - 1].options
    console.log(type);
    this.handleChangeNav(type - 1)
  },

  //获取订单列表
  getOrderList(type) {

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