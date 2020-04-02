
require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')


App({
  //设置全局请求URL
  globalData: {
    URL: 'http://116.62.162.64:8080/ljfl/app/',
    // URL: 'http://localhost:8080/ljfl/app/',
  },

  /**
  * 封装wx.request请求
  * method： 请求方式
  * url: 请求地址
  * data： 要传递的参数
  * callback： 请求成功回调函数
  * errFun： 请求失败回调函数
  **/
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: "http://116.62.162.64:8080" +url,
      // url: "http://localhost:8080" + url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res);
      },
      fail: function (err) {
        errFun(err);
      }
    })
  },

  imageRequest:function imageRequest(data) {
    var data;
    wx.request({
      url: "http://116.62.162.64:8080/app/imageToBase64",
      // url: "http://localhost:8080/app/imageToBase64",
      method: 'GET',
      data: {image:data},
      header: {
        'content-type': 'application/json' ,
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        data = res.data.msg
      }
    })
    return data;
  }
})