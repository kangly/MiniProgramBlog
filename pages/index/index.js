//index.js
//获取应用实例
const app = getApp()

Page({
   /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    swiperList: [],
    isLoadingMore: false,
    currentPage: 1,
    info: '',
    keywords: '',
    cardCur: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中...'
    })
    // var token = wx.getStorageSync("token");
    var token = app.globalData.token;
    if (token==''){
      app.userLogin().then(res => {
        if (res.msg=='success') {
          this.loadArticles();
          this.loadArticleRecommends();
          this.towerSwiper('swiperList');
        }
      })
    }else {
      this.loadArticles();
      this.loadArticleRecommends();
      this.towerSwiper('swiperList');
    }
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
    this.setData({
      articles: [],
      swiperList: [],
      isLoadingMore: false,
      currentPage: 1,
      info: '',
      keywords: '',
      cardCur: 0,
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.loadArticles();
    this.loadArticleRecommends();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.currentPage++
    if (this.data.isLoadingMore) {
      this.data.isLoadingMore = false
      this.data.info = '我是有底线的'
      return
    }
    wx.showLoading({
      title: '加载中...'
    })
    this.data.isLoadingMore = true
    this.loadArticles()
  },

   /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '小康博客',
      path: '/pages/index/index'
    }
  },

  /**
   * 文章列表
   */
  loadArticles: function () {
    var that = this
    wx.request({
      url: `https://kangly.club/api/article/show?page=${that.data.currentPage}&token=${app.globalData.token}&jwt=1`,
      success: (res) => {
        if (res.data.message === 'success') {
          if (res.data.articles.length == 0) {
            if (that.data.currentPage == 1) {
              that.setData({
                isLoadingMore: false,
                info: '哎呀！还没有文章'
              });
            } else {
              that.setData({
                isLoadingMore: false,
                info: '我是有底线的'
              });
            }
          }
          that.setData({
            articles: that.data.articles.concat(res.data.articles)
          })
        } 
        else if (res.data.code==1001){
          app.userLogin().then(res => {
            if (res.msg == 'success') {
              this.loadArticles();
            }
          })
        }
        else {
          that.setData({
            info: '列表加载失败，请重试'
          })
        }
        wx.hideLoading()
      }
    })
  },

  /**
   * 文章推荐列表
   */
  loadArticleRecommends: function () {
    var that = this
    wx.request({
      url: `https://kangly.club/api/article/recommend?token=${app.globalData.token}&jwt=1`,
      success: (res) => {
        if (res.data.message === 'success') {
          that.setData({
            swiperList: res.data.articles
          })
        }
        else if (res.data.code == 1001) {
          app.userLogin().then(res => {
            if (res.msg == 'success') {
              this.loadArticles();
            }
          })
        }
        wx.hideLoading()
      }
    })
  },

  /**
   * 点击跳转至详情
   */
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
    })
  },

  /**
   * 搜索跳转
   */
  wxSearchInput: function (e) {
    if (this.data.keywords){
      wx.navigateTo({
        url: '/pages/search/search/search?keywords=' + this.data.keywords,
      })
    }else{
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none',
        duration: 1500
      })
    }
  },

  /**
   * 设置搜索内容
   */
  wxSearchButton: function (e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },

  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },

  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },

  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})