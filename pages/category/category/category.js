// pages/category/category/category.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    categorys: [],
    info: '',
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...'
    })
    this.loadCategory()
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
    this.loadCategory()
    wx.stopPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小康博客 - 类别',
      path: '/pages/category/category/category'
    }
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
              categorys: res.data.items
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
   * 点击类别,跳转到类别文章列表
   */
  postCategoryDetail: function (event) {
    wx.navigateTo({
      url: '/pages/category/list/list?id=' + event.currentTarget.dataset.id + '&title=' + event.currentTarget.dataset.title
    })
  }
})