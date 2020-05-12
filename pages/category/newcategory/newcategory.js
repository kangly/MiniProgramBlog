// pages/category/newcategory/newcategory.js
const app = getApp()
Page({
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    isLoadingMore: false,
    currentPage: 1,
    id: 1,
    info: '',
    list: [],
    content: []
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.loadCategory()
    this.loadArticles()
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id - 1,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
    this.setData({
      id: e.currentTarget.dataset.id,
      isLoadingMore: false,
      currentPage: 1,
      info: '',
      content: [],
    })
    this.loadArticles()
  },
  /**
   * 加载类别列表
   */
  loadCategory: function () {
    var that = this
    app.login().then(() => {
      wx.showLoading({
        title: '加载中'
      })
      wx.request({
        url: `https://kangly.club/api/category?token=${app.globalData.token}&jwt=1`,
        success: (res) => {
          if (res.data.message === 'success') {
            that.setData({
              list: res.data.items
            })
          } else if (res.data.code == 1001) {
            that.loadCategory()
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
                isLoadingMore: false,
                info: '我是有底线的'
              })
            } else {
              that.setData({
                isLoadingMore: true,
                content: that.data.content.concat(res.data.articles)
              })
            }
          } else if (res.data.code == 1001) {
            that.loadArticles()
          } else {
            that.setData({
              isLoadingMore: false,
              info: '数据加载失败'
            })
          }
        },
        fail: function () {
          that.setData({
            isLoadingMore: false,
            info: '数据加载失败'
          })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },
  VerticalMain(e) {
    if (this.data.isLoadingMore===false) {
      return
    }
    this.data.currentPage++
    wx.showLoading({
      title: '加载中...'
    })
    this.setData({
      isLoadingMore: false
    })
    this.loadArticles()
  },
  /**
   * 点击标题跳转到详情页
   */
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小康博客 - 类别',
      path: '/pages/category/newcategory/newcategory'
    }
  },
})