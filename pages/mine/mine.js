const app = getApp()
let {
    getUserPhone,
    getOperateByCode,
} = require('../../utils/server/sever.js')
Page({

    data: {
        userInfo: null,
        operate : '',
        imageInfo : {
            width : '',
            heigth : ''
        }
    },

    imageLoad (e) {
        let width = e.detail.width
        let height = e.detail.height
        let pi = width / height
        let windowWidth = wx.getSystemInfoSync().windowWidth
        this.setData({
            'imageInfo.width': windowWidth * .95 + 'px',
            'imageInfo.height': windowWidth * .95 / pi + 'px'
        })
    },
    makePhoneCall () {
        if(this.data.userInfo.yyMobile) {
            wx.makePhoneCall({
                phoneNumber: this.data.userInfo.yyMobile,
            })
        }
    },
    getOperateByCode() {
        let yqcode = app.globalData.userInfo.data.yqcode
        yqcode && getOperateByCode({
            data: {
                yycode: app.globalData.userInfo.data.yqcode
            },
            success: (res) => {
                app.globalData.userInfo.data.yyName = res.data.yyName
                app.globalData.userInfo.data.yyMobile = res.data.yyMobile
                this.setData({
                    operate: `${res.data.yyName}:${res.data.yyMobile}`
                })
            }
        })
    },
    onShow() {
        let userInfo = app.globalData.userInfo.data
        if (userInfo) {
            this.setData({
                ['userInfo']: userInfo,
            })
            if (!userInfo.yyName) {
                this.getOperateByCode()
            }else {
                this.setData({
                    operate: `${userInfo.yyName}:${userInfo.yyMobile}`
                })
            }
        }
    },

    onLoad () {
        //可能网络请求  导致获取用户信息 在onLoad 值后
        if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback = (data) => {
                app.globalData.userInfo.data = data
            }
        } 
    },

    goToMyOrder() {
        wx.navigateTo({
            url: '/pages/order/order',
        })
    },
    goToAboutUs() {
        wx.navigateTo({
            url: '/pages/about/about',
        })
    },

    handleLoginOut() {
        wx.showModal({
            title: '提示',
            content: '是否确认退出',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#FD7321',
            confirmText: '确定',
            success: function(res) {
                app.globalData.userInfo.data = null
            },
        })
    },
    bindgetphonenumber(e) {
        let data = e.detail
        if (data.errMsg == 'getPhoneNumber:ok') {
            getUserPhone({
                data: {
                    encrypted: data.encryptedData,
                    sessionKey: app.globalData.userInfo.sessionKey,
                    iv: data.iv
                },
                success: (res) => {
                    wx.navigateTo({
                        url: '/pages/edit/edit?phone=' + res.msg,
                    })
                }
            })
        }
    },

    goToEditPage() {
        let data = this.data.userInfo
        let url = `/pages/edit/edit?phone=${data.mobile || ''}&hzname=${data.hzname || ''}&birthday=${data.bak1 || ''}&sex=${data.sex || 0}&yqcode=${data.yqcode || ''}&type=edit`
        wx.navigateTo({
            url: url,
        })
    },
    onShareAppMessage: function () {
        return {
            title: '天童云课堂'
        }
    }
})