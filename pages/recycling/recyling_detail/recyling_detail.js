var app = getApp()
Page( {
  data: {
    cyclingData:{},
  },
  onLoad: function (options) {
    var id = options.id
    var that = this
    app.wxRequest("GET", "/app/getCyclingById/" + id, {}, (res) => {
      var data = res.data.data;
      // var base64 = data.cyclingImg.replace(/[\r\n]/g, "")
      // var img = "data:image/jpeg;base64," + base64;
      // data.cyclingImg = img
      // console.log("--------",data)
      that.setData({
        cyclingData: data
      })
    }, (err) => {
      console.log(err)
    }) 
  },
  getLocation:function(){
    wx.navigateTo({
      url:'../location/location'
    })
  },
  bookTap:function(event){
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone,
    })
  },
 
  bookTap2: function (event) {
    var _this = this;
    // 引入SDK核心类
    var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');

    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
      key: 'M5XBZ-2VUC4-HLNUO-DIDO4-L2SGK-N2FH2' // 必填
    });
    
    // console.log("=============",_this.data.cyclingData)
    //调用地址解析接口
    qqmapsdk.geocoder({
      //获取表单传入地址
      address: _this.data.cyclingData.cyclingAddress, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        // var latitude = _this.data.cyclingData.addressX;
        // var longitude = _this.data.cyclingData.addressY;
        //根据地址解析在地图上标记解析地址位置
        const key = 'M5XBZ-2VUC4-HLNUO-DIDO4-L2SGK-N2FH2'; //使用在腾讯位置服务申请的key
        const referer = 'recyling'; //调用插件的app的名称
        // const location = JSON.stringify({
        //   latitude: latitude,
        //   longitude: longitude
        // });
        // const category = '回收站';
        // wx.navigateTo({
        //   url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
        // });
        //打开定位
        //   wx.getLocation({//获取当前经纬度
        //   type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
        //   success: function (res) {
        //     wx.openLocation({//​使用微信内置地图查看位置。
        //       latitude: latitude,//要去的纬度-地址
        //       longitude: longitude,//要去的经度-地址
        //       // name: "宝安中心A地铁口",
        //       // address: '宝安中心A地铁口'
        //     })
        //   }
        // })
        let plugin = requirePlugin('routePlan');
        let endPoint = JSON.stringify({  //终点
          'name': _this.data.cyclingData.cyclingAddress,
          latitude: latitude,
          longitude: longitude
        });
        wx.navigateTo({
          url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
        });
      },
      
    })





  }
})