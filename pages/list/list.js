const app = getApp();
Page({
  /** 
   * 页面的初始数据 
   */
  data: {
    isActive: null,
    listMain: [],
    listTitles: [],
    // fixedTitle: 'A',
    toView: 'inToView0',
    oHeight: [],
    scroolHeight: 0,
    isRuleTrue:false,
    name: "",
    type: "",
    explain: "",
    contain: "",
    tip: "",
    inputValue: "",
  },
  //点击右侧字母导航定位触发
  scrollToViewFn: function (e) {
    var that = this;
    var _id = e.target.dataset.id;
    for (var i = 0; i < that.data.listMain.length; ++i) {
      if (that.data.listMain[i].id === _id) {
        that.setData({
          isActive: _id,
          toView: 'inToView' + _id
        })
        break
      }
    }
  },
  toBottom: function (e) {
    console.log(e)
  },
  // 页面滑动时触发
  onPageScroll: function (e) {
    this.setData({
      scroolHeight: e.detail.scrollTop
    });
    for (let i in this.data.oHeight) {
      if (e.detail.scrollTop < this.data.oHeight[i].height) {
        this.setData({
          isActive: this.data.oHeight[i].key,
          fixedTitle: this.data.oHeight[i].name
        });
        return false;
      }
    }

  },
  onLoad: function (options) {
    var that = this;
    app.wxRequest('GET', "/app/getRegion",{}, (res) => {
      that.setData({
        listMain: res.data.data
      })
      console.log(that.data.listMain)
    }, (err) => {
      console.log(err)
    })
  },
  show: function (data) {
    var that = this;
   
    var s = that.data.listMain[data.target.dataset.index2].garbageList[data.target.dataset.index];
    this.setData({
      isRuleTrue: true,
      name: s.name,
      type: s.type,
      gExplain: s.gExplain,
      contain: s.contain,
      tip: s.tip
    })
  },
  preventTouchMove: function () {

  },
  hide: function () {
    this.setData({
      isRuleTrue: false
    })
  }
})
