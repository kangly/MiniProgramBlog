//app.js
App({
  globalData: {
    token: '',
    userInfo: ''
  },
  login: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      if (that.globalData.token) {
        resolve(that.globalData.token)
      } else {
        wx.login({
          success: res => {
            if (res.code) {
              wx.request({
                url: 'https://kangly.club/api/onLogin',
                data: {
                  code: res.code
                },
                success(res) {
                  if (res.data.msg == 'success') {
                    that.globalData.token = res.data.token
                    resolve(res.data.token)
                  } else {
                    reject('error')
                  }
                },
                fail: function (res) {
                  reject(res)
                  wx.showToast({
                    title: '网络异常'
                  })
                }
              })
            }
          }
        })
      }
    })
  }
})