// pages/about/store/store.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.loadArticles();
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
      articles: [],
      info: ''
    })
    wx.showLoading({
      title: '加载中...'
    })
    this.loadArticles();
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
   * 加载收藏文章列表
   */
  loadArticles: function () {
    var that = this
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: `https://kangly.club/api/article/storeList?token=${app.globalData.token}&jwt=1`,
      success: (res) => {
        if (res.data.msg === 'success') {
          that.setData({
            articles: res.data.articles
          })
        }
        else if (res.data.code == 1001) {
          app.userLogin().then(res => {
            if (res.msg == 'success') {
              this.loadArticles();
            }
          })
        }
        else {
          that.setData({
            info: '获取数据失败，请重试'
          })
        }
      },
      fail: function () {
        that.data.info = '获取数据失败'
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },

  /**
   * 点击跳转到文章详情
   */
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  }
})