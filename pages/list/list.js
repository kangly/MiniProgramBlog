// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [
      {
        'id': 1,
        'title': '测试文章标题1',
        'summary': '测试文章内容',
        'date': '2018-09-01',
        'views': 100,
        'thumb': ''
      },
      {
        'id': 2,
        'title': '测试文章标题2',
        'summary': '测试文章内容',
        'date': '2018-09-01',
        'views': 100,
        'thumb': ''
      },
      {
        'id': 3,
        'title': '测试文章标题3',
        'summary': '测试文章内容',
        'date': '2018-09-01',
        'views': 100,
        'thumb': ''
      },
      {
        'id': 4,
        'title': '测试文章标题4',
        'summary': '测试文章内容',
        'date': '2018-09-01',
        'views': 100,
        'thumb': ''
      },
      {
        'id': 5,
        'title': '测试文章标题5',
        'summary': '测试文章内容',
        'date': '2018-09-01',
        'views': 100,
        'thumb': ''
      },
    ]
  },

  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})