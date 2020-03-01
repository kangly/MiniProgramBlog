// pages/search/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    isLoadingMore: false,
    currentPage: 1,
    info: '',
    id: 1,
    keywords: ''
  },
  loadArticles: function () {
    var that = this
    wx.request({
      url: `https://kangly.club/api/article/search?keywords=${that.data.keywords}&page=${that.data.currentPage}`,
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
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.setData({
      keywords: options.keywords
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