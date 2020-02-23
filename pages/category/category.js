// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorys: [
      {
        'id': 1,
        'title': '测试1',
        'text': '这是一条测试数据1'
      },
      {
        'id': 2,
        'title': '测试2',
        'text': '这是一条测试数据2'
      },
      {
        'id': 3,
        'title': '测试3',
        'text': '这是一条测试数据3'
      },
      {
        'id': 4,
        'title': '测试4',
        'text': '这是一条测试数据4'
      }
    ]
  },

  postCategoryDetail: function(event) {
    wx.navigateTo({
      url: '/pages/list/list?id=' + event.currentTarget.dataset.id,
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