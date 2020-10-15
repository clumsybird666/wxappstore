// pages/goods_detail/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}
  },
  //商品数据
  goodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //获取商品详情数据
    let { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  //添加购物车
  // 1.取出缓存购物车数据  是否第一次添加   是  直接添加
  // 2.不是第一次添加  数量++
  // 3.将数据加到缓存中
  handleAddCart() {


    //获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    //判断商品对象是否存在购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id)

    //如果=-1表示不存在  
    if (index === -1) {
      //商品不存在  第一次加入缓存
      this.goodsInfo.num = 1
      this.goodsInfo.checked=true
      cart.push(this.goodsInfo)
    } else {
      //商品存在  数量需要++
      cart[index].num++

    }
    // 将数据加入缓存
    wx.setStorageSync("cart", cart)

    wx.showToast({
      title: '加入成功',
      icon: 'success',
      image: '',
      duration: 1500,
      mask: true,
    });




  },
  // 点击轮播图预览大图
  handlePreveImage(e) {
    console.log(e);
    let image = this.data.goodsDetail.pics
    //构建预览的数组
    image = image.map(v => {
      return v.pics_big
    })
    // 获取返回的url
    let current = e.currentTarget.dataset.url
    // console.log(image);
    wx.previewImage({
      current,
      urls: image,
    });

  },
  //获取商品详情数据
  getGoodsDetail(id) {
    request({
      url: '/goods/detail',
      data: { 'goods_id': id }
    }).then((res) => {
      console.log(res);
      let goodsDetail = res
      this.goodsInfo = res
      this.setData({
        goodsDetail: {

          pics: goodsDetail.pics,
          goods_price: goodsDetail.goods_price,
          goods_name: goodsDetail.goods_name,
          goods_introduce: goodsDetail.goods_introduce
        }
      })
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