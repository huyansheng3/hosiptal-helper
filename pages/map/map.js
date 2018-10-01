// pages/map.js
const hospitals = require('./hospitals');

const markers = hospitals.map(h => {
  return {
    ...h,
    iconPath: "/resources/marker.svg",
    width: 50,
    height: 50,
    label: h.name,
    callout: {
      content: `医院编号：${h.id}\n${h.name}`,
      padding: 10,
      textAlign: 'center',
      borderRadius: 4,
      fontSize: 15,
      display: 'BYCLICK',
    }
  }
})

const typesMarkers = markers.reduce((prev, curr) => {
  if (prev[curr.type]) {
    prev[curr.type].push(curr)
  } else {
    prev[curr.type] = [curr]
  }
  return prev
}, {})

const types = Object.keys(typesMarkers)

const items = types.map(type => {
  return {
    name: type,
    value: type,
    checked: type === '对外综合'
  }
})

const initMarkers = typesMarkers['对外综合']

Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    scale: 16,
    items,
    markers: initMarkers,
  },

  checkboxChange: function(e) {

    console.time('filter')
    const selectedItems = e.detail.value || []

    const showMarkers = selectedItems.reduce((prev, curr) => {
      return prev.concat(typesMarkers[curr])
    }, [])

    console.timeEnd('filter')

    this.setData({
      markers: showMarkers
    })
  },

  regionchange(e) {
    console.log(e)
  },

  markertap(e) {
    console.log(e.markerId)
  },

  bindtapMinus() {
    this.setData({
      scale: this.data.scale - 1
    })
  },

  bindtapPlus() {
    this.setData({
      scale: this.data.scale + 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        const {
          longitude,
          latitude
        } = res
        this.setData({
          longitude,
          latitude
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.mapCtx = wx.createMapContext('hospitalMap')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})