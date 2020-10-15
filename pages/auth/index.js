// pages/auth/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleGetUserInfo(e) {
    console.log(e);
    let { encryptedData, iv, rawData, signature } = e.detail

    wx.login({
      timeout: 10000,
      success: (res) => {
        console.log(res);
        let { code } = res
        let data = { encryptedData, iv, rawData, signature, code }
        request({
          url: '/users/wxlogin',
          data: data,
          method: 'post'
        }).then((res) => {
          console.log(res);
        })
      },
    });



    // wx.setStorageSync('token', data);

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