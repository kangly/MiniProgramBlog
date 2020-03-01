//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    articles: [],
    isLoadingMore: false,
    currentPage: 1,
    info: '',
    keywords: ''
  },

  /**
   * 页面上拉触底事件的处理函数
   */
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

   /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '小康博客',
      path: '/pages/index/index'
    }
  },

  loadArticles: function () {
    var that = this
    wx.request({
      url: `https://kangly.club/api/articles/${that.data.currentPage}`,
      success: (res) => {
        if (res.data.message === 'success') {
          if (res.data.articles.length == 0) {
            if (that.data.currentPage == 1) {
              that.setData({
                isLoadingMore: false,
                info: '哎呀！还没有文章'
              });
            } else {
              that.setData({
                isLoadingMore: false,
                info: '我是有底线的'
              });
            }
          }
          that.setData({
            articles: that.data.articles.concat(res.data.articles)
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

  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },

  wxSearchInput: function (e) {
    if (this.data.keywords){
      wx.navigateTo({
        url: '/pages/search/search/search?keywords=' + this.data.keywords,
      })
    }else{
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 1500
      })
    }
  },

  wxSearchButton: function (e) {
    this.setData({
      keywords: e.detail.value
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
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      articles: [],
      isLoadingMore: false,
      currentPage: 1,
      info: '',
      keywords: ''
    })
    wx.showLoading({
      title: '加载中...'
    })
    this.loadArticles();
    wx.stopPullDownRefresh()
  }
})