// pages/pay/pay.js

const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        param: {
            name: '', //预约人员姓名
            phone: '', //预约人员电话
            className : '',//预约课程名称
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            ['param.name']: options.name,
            ['param.phone']: options.phone,
            ['param.className']: app.globalData.currentClass && app.globalData.currentClass.kcName || ''
        })
        //清空当前记录
        app.globalData.currentClass = null
    },
    goTohome ()  {
        wx.switchTab({
            url: '/pages/home/home',
        })
    },
    goToMyOrder () {
        wx.navigateTo({
            url: '/pages/order/order',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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
})