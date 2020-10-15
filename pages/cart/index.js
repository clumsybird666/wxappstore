// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: {},
    cart: {},
    allChecked: false,
    totalPrice: 0,
    totalNum: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //获取地址信息
  handleGetAdress() {
    wx.getSetting({
      success: (result) => {
        // console.log(result)
        const scopedAddress = result.authSetting["scope.address"]
        if (scopedAddress === true || scopedAddress === undefined) {
          this.setAddress()
        } else {
          //用户之前拒绝过授权权限
          wx.openSetting({
            success: (result) => {
              this.setAddress()
            },

          });
        }
      },

    });
  },

  //存地理信息到缓存
  setAddress() {
    wx.chooseAddress({
      success: (result) => {
        wx.setStorageSync("address", result);
        console.log(result);
      }
    });
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
    //获取缓存中的收获地址信息
    let addressInfo = wx.getStorageSync("address");
    //获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    console.log(cart);
    //计算全选
    // const allChecked=cart.length?cart.every(v=>v.checked):false
    this.setData({
      addressInfo
    })
    this.setCart(cart)
  },
  //选中切换事件
  handleCheckedChange(e) {
    //获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id
    console.log(goods_id);
    //获取购物车数据
    let { cart } = this.data
    //找到被修改的商品数据
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setData({
      cart
    })
    this.setCart(cart)

  },
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    //计算价格和数量
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    //判断数据是否为空
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart)
  },
  //商品的全选功能
  handleAllChecked() {
    let { allChecked, cart } = this.data
    //修改全选按钮
    allChecked = !allChecked
    //修改商品的选中状态
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
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