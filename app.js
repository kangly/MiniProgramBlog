//app.js
App({
  globalData: {
    openid: ''
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://kangly.club/api/onLogin',
          //   data: {
          //     code: res.code
          //   },
          //   success: (res) => {
          //     if (res.data.msg == 'success'){
          //       var result = JSON.parse(res.data.data);
          //       this.globalData.openid = result.openid
          //     }
          //   },
          //   fail: function (error) {
          //     console.log(error);
          //   }
          // })
        }
      },
      fail: function () {
        console.log('登录获取code失败！');
      }
    })
  }
})