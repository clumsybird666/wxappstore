// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: {},
    cart: {},
    totalPrice: 0,
    totalNum: 0

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const addressInfo = wx.getStorageSync("address");
    //计算全选
    // const allChecked=cart.length?cart.every(v=>v.checked):false
    this.setData({
      addressInfo
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

    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数组
    cart = cart.filter(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    //计算价格和数量
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum
    })
  },

  //减少增加商品数量
  handleItemNum(e) {
    let { id, operation } = e.currentTarget.dataset
    console.log(id, operation);
    //获取购物车数组
    let { cart } = this.data
    //找到修改的商品索引
    const index = cart.findIndex(v => v.goods_id === id)
    //判断商品数量
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        title: '提示',
        content: '是否删除',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            cart.splice(index, 1)
            this.setCart(cart)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      //修改数量
      cart[index].num += operation
      this.setCart(cart)
    }

  },
  //点击结算按钮 跳转
  handlePay() {
    if (!this.data.cart.length) {
      wx.showToast({
        title: '购物车没有商品，去添加',
        icon: 'none',
        duration: 1500,
        mask: false,

      });
      return
    }
    if (!this.data.addressInfo) {
      wx.showToast({
        title: '请添加地址',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      return
    }
    wx.navigateTo({
      url: '../pay/index',
    });

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },
})