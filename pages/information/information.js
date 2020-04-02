// pages/posts/posts.js
// var postsData = require("../../data/posts_data.js")
const app = getApp()
Page({
  data: {
    infoList:[],
    imgList:[],
    pageNum:1,
    pageSize:3,
    total:0,
  },
  onPosts: function (event) {
    var id = event.currentTarget.dataset.postsid;
    wx.navigateTo({
      url: '/pages/information/information_Detail/information_Detail?id='+id,
    })
  },
  onLoad: function (options) {
    var that = this;
    app.wxRequest('GET', '/app/imgOfInfo', {}, (res) => {
      var list = res.data.data;
      // 图片转base64
      // for (var i in list) {
      //   var base64 = list[i].imgPath.replace(/[\r\n]/g, "")
      //   var img = "data:image/jpeg;base64," + base64;
      //   list[i].imgPath = img
      // }
      that.setData({
        imgList: list
      })
    }, (err) => {
      console.log(err)
    })
    // 页面初始化 options为页面跳转所带来的参数
    app.wxRequest("GET", "/app/informationList", {pageSize: that.data.pageSize, pageNum: that.data.pageNum},(res) => {
      var list = res.data.data;
      // 图片转base64
      // for (var i in list) {
      //   var base64 = list[i].infoImg.replace(/[\r\n]/g, "")
      //   var img = "data:image/jpeg;base64," + base64;
      //   list[i].infoImg = img
      // }
      that.setData({
        pageNum:that.data.pageNum+1,
        total:list.length,
        infoList: list
      })
      wx.hideLoading();
    }, (err) => {
      console.log(err)
    })
  },
  //下拉刷新
  onPullDownRefresh: function onPullDownRefresh() {
    this.setData({
      pageNum:1,
      total:0
    });
    this.onLoad();
    //模拟加载
    setTimeout(function () {
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);
  },
  // 上拉加载
  onReachBottom: function onReachBottom(){
    var that = this;
    if (that.data.total == that.data.pageSize) {
      // 显示加载图标
      wx.showLoading({
        title: '玩命加载中',
      })
      app.wxRequest("GET", "/app/informationList", { pageSize: that.data.pageSize, pageNum: that.data.pageNum }, (res) => {
        var list = res.data.data;
        var all = that.data.infoList;
        for(var i = 0;i<list.length;i++){
          all.push(list[i]);
        }
        that.setData({
          pageNum: that.data.pageNum + 1,
          total: list.length,
          infoList: all
        })
        wx.hideLoading();
      }, (err) => {
        console.log(err)
      })
    } else {
      wx.showToast({
        title: '暂无更多',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  methods:{
    getImgInfo:function getImgInfo() {
      app.wxRequest('GET', '/app/imgOfInfo', {}, (res) => {
        var list = res.data.data;
        // 图片转base64
        // for (var i in list) {
        //   var base64 = list[i].imgPath.replace(/[\r\n]/g, "")
        //   var img = "data:image/jpeg;base64," + base64;
        //   list[i].imgPath = img
        // }
        that.setData({
          imgList: list
        })

      }, (err) => {
        console.log(err)
      })
    },
    getInfoList: function getInfoList(){
      app.wxRequest("GET", "/app/informationList", { pageNum: this.data.pageNum, pageSize: this.data.pageSize}, (res) => {
        var list = res.data.data;
        // 图片转base64
        // for (var i in list) {
        //   var base64 = list[i].infoImg.replace(/[\r\n]/g, "")
        //   var img = "data:image/jpeg;base64," + base64;
        //   list[i].infoImg = img
        // }
        that.setData({
          pageNum: this.data.pageNum + 1,
          total: list.length,
          infoList: list
        })
      }, (err) => {
        console.log(err)
      })
    }
  }
})