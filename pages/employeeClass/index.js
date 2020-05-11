// pages/employeeClass/index.js

const { getBxToYeji } = require('../../utils/server/home')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        shiduanId : '', 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            shiduanId : options.shiduanId
        })
        getBxToYeji({
            data : {shiduanId : this.data.shiduanId},
            success : (res) => {
                if(res.code == 0) {
                    this.setData({
                        data : res.data
                    })
                    if(res.data && res.data.length == 0) {
                        wx.showToast({
                          title: '暂无数据!',
                          icon : 'none'
                        })
                    }
                }else {

                }
                
            }
        })
    },
    makePhone(e) {
        console.log(111, e)
        let phone = e.currentTarget.dataset.mobile
        if (phone) {
            wx.makePhoneCall({
                phoneNumber: phone
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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