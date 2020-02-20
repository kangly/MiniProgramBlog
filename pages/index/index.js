//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    articles: [],
    isLoadingMore: false,
    currentPage: 1,
    info: ''
  },
  loadArticles: function () {
    var that = this
    wx.request({
      url: `https://kangly.club/api/articles/${that.data.currentPage}`,
      success: (res) => {
        if (res.data.message === 'success') {
          if (res.data.articles.data.length == 0) {
            that.setData({
              isLoadingMore: false,
              info: '我是有底线的'
            });
          }
          that.setData({
            articles: that.data.articles.concat(res.data.articles.data)
          })
        } else {
          that.setData({
            info: '列表加载失败，请重试'
          })
        }
        wx.hideLoading()
      }
    })
  },
  onReachBottom: function () {
    this.data.currentPage++
    if (this.data.isLoadingMore) {
      this.data.isLoadingMore = false
      this.data.info = '我是有底线的'
      return
    }
    wx.showLoading({
      title: '加载中...'
    })
    this.data.isLoadingMore = true
    this.loadArticles()
  },
  onShareAppMessage() {
    return {
      title: '小康博客',
      path: '/pages/index'
    }
  },
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中...'
    })
    this.loadArticles();
  }
})
