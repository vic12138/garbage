/*recying.js*/
const app = getApp();
Page({
  // 页面初始数据
  data: {
      // nav 初始化
      casIndex:0,
      addrIndex:0,
      cyclingData: [],
      curNavId: 1,
		  curIndex: 0,
      city:"佛山",
      pageNum: 1,
      pageSize: 6,
      total: 0,
  },
   
  onShow: function (data){
    const pages = getCurrentPages();
    const currPage = pages[pages.length - 1];  // 当前页
    var that = this;
    that.setData({
      pageNum: 1,
      total: 0,
      cyclingData: []
    })
    that.city = currPage.data.city;
    that.getCyclingList(currPage.data.city);
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.setData({
      pageNum:1,
      total:0,
      cyclingData:[]
    })
    this.onShow();
    //模拟加载
    setTimeout(function () {
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    var that = this;
    if (that.data.total == that.data.pageSize) {
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
      that.getCyclingList()
    } else {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  }, 
  // 跳转至详情页
  navigateDetail: function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'recyling_detail/recyling_detail?id='+id 
    })
  },
  // 跳转城市选择页面
  navigateCity: function (e) {
    wx.navigateTo({
      url: '../allcity/allcity'
    })
  },
    getCyclingList:function(city){
      app.wxRequest("GET", "/app/cyclingList", {pageNum:this.data.pageNum,pageSize:this.data.pageSize,cyclingAddress:this.data.city}, (res) => {
        var that = this;
        var list = res.data.data;
        var list1 = this.data.cyclingData;
        // for(var i in list){
        //   var base64 = list[i].cyclingImg.replace(/[\r\n]/g, "")
        //   var img = "data:image/jpeg;base64," + base64;
        //   list[i].cyclingImg = img
        // }
        for (var i = 0; i < list.length; i++) {
          list1.push(list[i])
        }
        wx.hideLoading();
        that.setData({
          pageNum: that.data.pageNum+1,
          total: list.length,
          cyclingData: list1
        })
        console.log(that.data.total)
      }, (err) => {
        console.log(err)
      })
    }
  
})
