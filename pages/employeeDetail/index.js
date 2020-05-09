// pages/employeeDetail/index.js

const {
    getParentList,
    getStatistics
} = require('../../utils/server/home')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [],
        type: '',
        param: {
            yycode: '',
            yymobile: '',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            type: options.type,
            ['param.yycode']: options.yycode,
            'param.yymobile': options.mobile
        })

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

    onShow: function () {
        let type = this.data.type
        let param = this.data.param
        if (type == 'statistics') {
            getStatistics({
                data: param,
                success: (res) => {
                    if (res.code == 0) {
                        this.setData({
                            data: res.data
                        })
                        if (!res.data || res.data.length == 0) {
                            wx.showToast({
                                title: '暂无数据',
                                icon: 'none'
                            })
                        }
                    } else {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none'
                        })
                    }
                }
            })
        } else if (type == 'parent') {
            getParentList({
                data: param,
                success: (res) => {
                    if (res.code == 0) {
                        this.setData({
                            data: res.data
                        })
                        if (!res.data || res.data.length == 0) {
                            wx.showToast({
                                title: '暂无数据',
                                icon: 'none'
                            })
                        }
                    } else {
                        wx.showToast({
                            title: res.msg,
                            icon: 'none'
                        })
                    }
                }
            })
        }
    },
})