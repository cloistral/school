// pages/employeeDetail/index.js

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [],
        type: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            type: options.type,
            data : app.globalData.emlpoyeeData 
        })

    },
    goToOther (e) {
        let shiduanId = e.currentTarget.dataset.data.shiduanid
        wx.navigateTo({
          url: '/pages/employeeClass/index?shiduanId=' + shiduanId,
        })
    },
    onUnload () {
        app.globalData.emlpoyeeData  = []
    },
    /** 
     * 生命周期函数--监听页面显示
     */

    makePhone(e) {
        console.log(111, e)
        let phone = e.currentTarget.dataset.mobile
        if (phone) {
            wx.makePhoneCall({
                phoneNumber: phone
            })
        }
    },
})