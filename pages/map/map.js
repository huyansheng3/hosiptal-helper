// pages/map.js
const hospitals = require('./hospitals');

const typesHospitals = hospitals.reduce((prev, curr) => {
  if (prev[curr.type]) {
    prev[curr.type].push(curr)
  } else {
    prev[curr.type] = [curr]
  }
  return prev
}, {})

const types = Object.keys(typesHospitals)

const items = types.map(type => {
  return {
    name: type,
    value: type
  }
})

const markers = hospitals.map(h => {
  return {
    ...h,
    iconPath: "/resources/marker.svg",
    width: 50,
    height: 50,
    label: h.name,
    callout: {
      content: h.name,
      display: 'BYCLICK'
    }
  }
})

Page({
  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    scale: 16,
    items,
    markers,
  },

  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  regionchange(e) {
    console.log(e.type)
  },

  markertap(e) {
    console.log(e.markerId)
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