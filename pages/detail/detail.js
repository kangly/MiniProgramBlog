// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.article.id = options.id
    this.loadArticle()
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
    let id = this.data.article.id
    let title = this.data.article.title
    return {
      title: `小康博客 - ${title}`,
      path: `/pages/detail/detail?id=${id}`
    }
  },

  /**
   * 加载文章详情
   */
  loadArticle: function () {
    var that = this
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: `https://kangly.club/api/article/${that.data.article.id}`,
      success: (res) => {
        that.setData({
          article: {
            title: res.data.title,
            author: res.data.author,
            content: res.data.content,
            posted_at: res.data.posted_at,
            views: res.data.views
          }
        })
        // 引入 wxParse 组件处理文章正文
        var wxParse = require('../../components/wxParse/wxParse.js')
        wxParse.wxParse('article_content', 'html', that.data.article.content, that, 1)
      },
      fail: function () {
        that.data.info = '获取详情数据失败'
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  }
})