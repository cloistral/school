//app.js

const {
    getUserInfo,
    judgeIsRegister
} = require('/utils/server/sever.js')

App({
    onLaunch: function() {
        this.getUserInfo()
        console.log(11111)
    },
    //获取用户信息
    getUserInfo() {
        wx.login({
            success: (res) => {
                getUserInfo({
                    data: {
                        wxCode: res.code
                    },
                    success: (userInfo) => {
                        this.globalData.userInfo.openid = userInfo.data.openid
                        this.globalData.userInfo.sessionKey = userInfo.data.sessionKey
                        this.isRegister(userInfo.data.openid)
                    },
                })
            }
        })
    },
    //判断用户是否注册过
    isRegister(openid) {
        judgeIsRegister({
            data: {
                openid: openid || this.globalData.userInfo.openid
            },
            success: (res) => {
                if (res.data.success == 1) {
                    this.globalData.userInfo.data = res.data.abParent
                    if (this.userInfoReadyCallback) {
                        this.userInfoReadyCallback(res.data.abParent)
                    }
                }
            }
        })
    },

    globalData: {
        userInfo: {
            openid: null,
            sessionKey: null,
            data: null
        },
        baseUrl: 'https://www.5itt.top',
    }
})