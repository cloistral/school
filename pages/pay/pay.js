// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        param: {
            name: '',
            phone: '',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            ['param.name']: options.name,
            ['param.phone']: options.phone
        })
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