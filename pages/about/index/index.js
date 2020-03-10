// pages/about/index/index.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //是否显示授权信息
    isHide: false,
    avatarUrl: '',
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 是否授权
    var that = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          if (app.globalData.userInfo){
            that.setData({
              avatarUrl: `background-image:url(${app.globalData.userInfo.avatarUrl})`,
              nickName: app.globalData.userInfo.nickName
            })
          } else {
            wx.getUserInfo({
              success: function (res) {
                app.globalData.userInfo = res.userInfo
                that.setData({
                  avatarUrl: `background-image:url(${res.userInfo.avatarUrl})`,
                  nickName: res.userInfo.nickName
                })
              }
            })
          }
        } else {
          // 用户没有授权 显示授权页面
          that.setData({
            isHide: true
          })
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小康博客 - 关于',
      path: '/pages/about/index/index'
    }
  },

  /**
   * 点击复制github链接
   */
  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        wx.showToast({
          title: '已复制GitHub链接'
        })
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户点击允许授权按钮 可以进行些数据存储
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        isHide: false,
        avatarUrl: `background-image:url(${e.detail.userInfo.avatarUrl})`,
        nickName: e.detail.userInfo.nickName
      })
    }
  }
})