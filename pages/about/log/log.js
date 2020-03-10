// pages/about/log/log.js
Page({
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '小康博客 - 更新日志',
      path: '/pages/about/log/log'
    }
  }
})