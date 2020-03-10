// pages/about/store/store.js
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
    this.loadArticles()
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
    this.loadArticles()
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小康博客 - 我的收藏',
      path: '/pages/about/store/store'
    }
  },

  /**
   * 加载收藏文章列表
   */
  loadArticles: function () {
    wx.showLoading({
      title: '加载中'
    })
    app.login().then(() => {
      wx.request({
        url: `https://kangly.club/api/article/storeList?token=${app.globalData.token}&jwt=1`,
        success: (res) => {
          if (res.data.msg === 'success') {
            this.setData({
              articles: res.data.articles
            })
          } else if (res.data.code == 1001) {
            this.loadArticles();
          } else {
            this.data.info = '数据加载失败'
          }
        },
        fail: function () {
          this.data.info = '数据加载失败'
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },

  /**
   * 点击跳转到文章详情
   */
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id
    })
  }
})