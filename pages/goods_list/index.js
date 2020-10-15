// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  //接口需要的参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  //定义总页数
  totalPage: 0,
  //获取顶部栏子组件传递过来的数据
  tabsItemChange(e) {
    //获取菜单对象
    let { tabs } = this.data
    //遍历设置对应激活
    tabs.forEach((v, k) => { k === e.detail ? v.isActive = true : v.isActive = false });
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.queryParams.cid = options.cid
    //获取商品数据列表
    this.getGoodsList()
  },
  getGoodsList() {
    request({
      url: '/goods/search',
      data: this.queryParams
    }).then((res) => {
      this.totalPage = res.total
      this.setData({ goodsList: [...this.data.goodsList, ...res.goods] })
    })
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
    console.log('下拉');
    this.queryParams.pagenum = 1
    this.setData({
      goodsList: [],

    })
    //重新获取数据
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载下一页数据
    // 先求出最多可以加载几页
    var pageMax = Math.ceil(this.totalPage / this.queryParams.pagesize)
    if (pageMax >= this.queryParams.pagenum) {
      console.log('还有数据');
      this.queryParams.pagenum++
      this.getGoodsList()
    } else {
      wx.showToast({
        title: '没有更多数据了',

      });

    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})