// pages/classList/index.js

const { getClassListById } = require('../../utils/server/home.js')
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        classTypeId : '',
        classList : [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            classTypeId: options.id
        })
        this._initData()
    },

    _initData () {
        let param = {
            kctypeId : this.data.classTypeId
        }
        getClassListById({
            data : param,
            success : (res) => {
                let list = res.data.kclist
                list.forEach(item => {
                    item.topImg = app.globalData.baseUrl + item.topImg
                })
                this.setData({
                    classList: list
                })
            }
        })
    },
    handleToClassDetail(e) {
        
        let id = e.currentTarget.dataset.data.id
        wx.navigateTo({
            url: '/pages/classDetail/index?id=' + id,
        })
    },
    
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})