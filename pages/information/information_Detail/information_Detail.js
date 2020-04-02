// pages/posts/posts_Detali/posts_Detali.js
// var postsData = require("../../../data/posts_data.js")
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    informationData:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取新闻详情的ID
    var id = options.id;
    // //获取每个ID的书记
    // var postsData1 = postsData.contetn[postsId]
    // //保存ID
    that.setData({
      id: id
    })
    app.wxRequest('GET', '/app/informationById/' + id, {}, (res) => {
      var data = res.data.data;
      // 图片转base64
      // var base64 = data.infoImg.replace(/[\r\n]/g, "")
      // var img = "data:image/jpeg;base64," + base64;
      // data.infoImg = img
      that.setData({
        informationData: data
      })
    }, (err) => {
      console.log(err)
    })
    // 增加點擊量
    app.wxRequest('GET', '/app/addVeiwCountById/' + id, {}, (res) => {
      var data = res.data.data; 
    }, (err) => {
      console.log(err)
    })
  },
  onCollctedTap: function (event) {
    //获得是否收藏数据
    var postsCollected = wx.getStorageSync("postsCollected");
    //找到当前的收藏书记
    var postsCollectedSelect = postsCollected[this.data.postsId];
    //收藏与为收藏切换数据
    postsCollectedSelect = !postsCollectedSelect;
    postsCollected[this.data.postsId] = postsCollectedSelect;
    //缓存是否收藏数据
    wx.setStorageSync("postsCollected", postsCollected);
    //保存是否输出数据 界面展示数据
    this.setData({ collected: postsCollectedSelect });
    // 收藏取消显示弹出框
    wx.showToast({
      title: postsCollectedSelect ? '收藏成功' : "取消收藏",
      icon: postsCollectedSelect ? 'success' : "none",
      duration: 1000
    })
  },
  // onShareTop: function (event) {
  //   var itemList = ['分享到微信好友', '分享到朋友圈']
    // wx.showActionSheet({
    //   itemList: itemList,
    //   success: function (res) {
    //     wx.showModal({
    //       title: '提示',
    //       content: itemList[res.tapIndex],
    //       confirmColor: "#405f80",
    //       success: function (res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定')
    //         } else if (res.cancel) {
    //           console.log('用户点击取消')
    //         }
    //       }
    //     })
    //   },
    //   fail: function (res) {
    //   }
    // })
  // },
  onShareAppMessage:function(res){

    if (res.from === 'button') {

    }
    return {
      title:this.data.informationData.title,
      path: '/pages/infomation/information_Detail/information_Detail?id=' + this.data.id,
      imageUrl:this.data.informationData.infoImg,
      success: function (res) {
        console.log('成功', res)
      }
  }
  },

})