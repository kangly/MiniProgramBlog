// pages/category/list/list.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    isLoadingMore: false,
    currentPage: 1,
    info: '',
    id: 0,
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.setData({ 
      id: options.id,
      title: options.title
    })
    this.loadArticles()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.currentPage++
    if (this.data.isLoadingMore) {
      this.setData({
        isLoadingMore: false,
        info: '我是有底线的'
      })
      return
    }
    wx.showLoading({
      title: '加载中...'
    })
    this.setData({
      isLoadingMore: true
    })
    this.loadArticles()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `小康博客 - ${this.data.title}`,
      path: `/pages/category/list/list?id=${this.data.id}&title=${this.data.id}`
    }
  },

  /**
   * 加载该类别所属文章
   */
  loadArticles: function () {
    app.login().then(() => {
      var that = this
      wx.request({
        url: `https://kangly.club/api/category/article?id=${that.data.id}&page=${that.data.currentPage}&token=${app.globalData.token}&jwt=1`,
        success: (res) => {
          if (res.data.message == 'success') {
            if (res.data.articles.length == 0) {
              that.setData({
                info: '我是有底线的'
              })
            } else {
              that.setData({
                articles: that.data.articles.concat(res.data.articles)
              })
            }
          } else if (res.data.code == 1001) {
            that.loadArticles()
          } else {
            that.setData({
              info: '数据加载失败'
            })
          }
        },
        fail: function () {
          that.setData({
            info: '数据加载失败'
          })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },

  /**
   * 点击标题跳转到详情页
   */
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id
    })
  }
})