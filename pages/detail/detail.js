// pages/detail/detail.js
//获取应用实例
const app = getApp()

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
    this.loadArticle(options.id)
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
  loadArticle: function (uid) {
    var that = this
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: `https://kangly.club/api/article/info?id=${that.data.article.id}&token=${app.globalData.token}&jwt=1`,
      success: (res) => {
        if (res.data.msg=='success'){
          that.setData({
            article: {
              id: res.data.article.id,
              title: res.data.article.title,
              author: res.data.article.author,
              content: res.data.article.content,
              posted_at: res.data.article.posted_at,
              views: res.data.article.views,
              store: res.data.article.store
            },
            DotStyle: res.data.article.store
          })
          // 引入 wxParse 组件处理文章正文
          var wxParse = require('../../components/wxParse/wxParse.js')
          wxParse.wxParse('article_content', 'html', that.data.article.content, that, 1)
        }
        else if(res.data.code== 1001){
            app.userLogin().then(res => {
              if (res.msg == 'success') {
                this.loadArticle();
              }
            })
        }
        else{
          that.data.info = '获取详情数据失败'
        }
      },
      fail: function () {
        that.data.info = '获取详情数据失败'
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },

  /**
   * 收藏文章
   */
  postStore: function(event) {
    var that = this
    var content = '';
    if (that.data.DotStyle==1){
      content = '确认取消收藏文章吗？';
    }else{
      content = '确认收藏文章吗？';
    }
    wx.showModal({
      title: '提示',
      content: content,
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: `https://kangly.club/api/article/store?id=${event.currentTarget.dataset.id}&store=${that.data.DotStyle}&token=${app.globalData.token}&jwt=1`,
            success: (res) => {
              if(res.data.msg=='success'){
                wx.showToast({
                  title: '操作成功',
                  icon: 'none',
                  duration: 1500
                })
                that.setData({
                  DotStyle: that.data.DotStyle == 1 ? 0 : 1
                })
              }else{
                wx.showToast({
                  title: '操作失败',
                  icon: 'none',
                  duration: 1500
                })
              }
            },
            fail: function () {
              wx.showToast({
                title: '操作失败',
                icon: 'none',
                duration: 1500
              })
            }
          })
        }
      }
    })
  }
})