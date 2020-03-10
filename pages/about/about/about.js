// pages/about/about/about.js
Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小康博客 - 关于博客',
      path: '/pages/about/about/about'
    }
  }
})