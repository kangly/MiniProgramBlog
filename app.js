//app.js
App({
  globalData: {
    token: ''
  },
  userLogin: function () {
    var that = this
    return new Promise(function (resolve, reject) {
      wx.login({
        success: res => {
          if(res.code){
            wx.request({
              url: 'https://kangly.club/api/onLogin',
              data: {
                code: res.code
              },
              success(res) {
                if(res.data.msg == 'success'){
                  that.globalData.token = res.data.token
                  //存入session缓存中
                  // wx.setStorageSync('token',that.globalData.token)
                  //promise机制放回成功数据
                  resolve(res.data);
                }else{
                  reject('error');
                }
              },
              fail: function (res) {
                reject(res);
                wx.showToast({
                  title: '系统异常'
                })
              }
            })
          }else{
            reject("error");
          }
        }
      })
    })
  }
})