//index.js
const app = getApp()

Page({
   /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    cardCur: 0,
    articles: [],
    currentPage: 1,
    isLoadingMore: false,
    keywords: '',
    listInfo: '',
    swiperInfo: '',
    floorstatus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.showLoading({
      title: '加载中...'
    })
    this.loadArticles()
    this.loadRecommends()
    this.towerSwiper('swiperList')
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.setData({
      swiperList: [],
      cardCur: 0,
      articles: [],
      currentPage: 1,
      isLoadingMore: false,
      keywords: '',
      listInfo: '',
      swiperInfo: ''
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.loadArticles()
    this.loadRecommends()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoadingMore===false) { 
      return
    }
    this.data.currentPage++
    wx.showLoading({
      title: '加载中...'
    })
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
    app.login().then(() => {
      var that = this
      wx.request({
        url: `https://kangly.club/api/article/show?page=${that.data.currentPage}&token=${app.globalData.token}&jwt=1`,
        success: (res) => {
          if (res.data.message == 'success') {
            if (res.data.articles.length == 0) {
              that.setData({
                isLoadingMore: false,
                listInfo: '我是有底线的'
              })
            } else {
              that.setData({
                isLoadingMore: true,
                articles: that.data.articles.concat(res.data.articles)
              })
            }
          } else if (res.data.code == 1001) {
            that.loadArticles()
          } else {
            that.setData({
              isLoadingMore: false,
              listInfo: '数据加载失败'
            })
          }
        },
        fail: function () {
          that.setData({
            isLoadingMore: false,
            listInfo: '数据加载失败'
          })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },

  /**
   * 推荐列表
   */
  loadRecommends: function () {
    app.login().then(() => {
      var that = this
      wx.request({
        url: `https://kangly.club/api/article/recommend?token=${app.globalData.token}&jwt=1`,
        success: (res) => {
          if (res.data.message == 'success') {
            that.setData({
              swiperList: res.data.articles
            })
          } else if (res.data.code == 1001) {
            loadRecommends()
          } else {
            that.setData({
              swiperInfo: '数据加载失败'
            })
          }
        },
        fail: function () {
          that.setData({
            swiperInfo: '数据加载失败'
          })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    })
  },

  /**
   * 点击跳转至详情页
   */
  postDetail: function (event) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id
    })
  },

  /**
   * 搜索跳转
   */
  wxSearchInput: function (e) {
    if (this.data.keywords){
      wx.navigateTo({
        url: '/pages/search/search/search?keywords=' + this.data.keywords
      })
    }else{
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
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
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 500) {
      this.setData({
        floorstatus: false
      })
    } else {
      this.setData({
        floorstatus: true
      })
    }
  },
  
  // 回到顶部
  goTop: function (e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新版本后重试。'
      })
    }
  }
})