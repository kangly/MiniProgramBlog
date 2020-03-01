// pages/category/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys: [],
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.loadCategory();
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
    this.setData({
      categorys: [],
      info: ''
    })
    wx.showLoading({
      title: '加载中...'
    })
    this.loadCategory();
    wx.stopPullDownRefresh()
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

  },

  /**
   * 加载类别列表
   */
  loadCategory: function () {
    var that = this
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: `https://kangly.club/api/category`,
      success: (res) => {
        if (res.data.message === 'success') {
          that.setData({
            categorys: res.data.items
          })
        } else {
          that.setData({
            info: '获取类别数据失败，请重试'
          })
        }
      },
      fail: function () {
        that.data.info = '获取类别数据失败'
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },

  /**
   * 点击类别,跳转到类别文章列表
   */
  postCategoryDetail: function (event) {
    wx.navigateTo({
      url: '/pages/category/list/list?id=' + event.currentTarget.dataset.id + '&title=' + event.currentTarget.dataset.title,
    })
  }
})