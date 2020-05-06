// pages/productDetail/index.js

let app = getApp()
let {
    getClassDetail,
    getClassTypeList
} = require('../../utils/server/class.js')
let {
    getUserPhone,
    createPayOrder,
    getWxPayInfo
} = require('../../utils/server/sever.js')
var maxTime = 15 * 4 * 60 //倒计时原始时间
var timer = null //定时器
Page({
    data: {
        countDown: "00:00:00", //倒计时信息
        isSelectViewShow: false,
        isRegisterDone: null,
        kcid: '',
        classType : '',
        classTypeList: [],
        baseInfo: {},
        groupList: [{
                nickname: '快乐',
                id: '1',
                img: '/images/head_1.png'
            },
            {
                nickname: '开心',
                id: '2',
                img: '/images/head_2.png'
            },
        ]
    },
    onShow() {
        if (app.globalData.userInfo.data) {
            this.setData({
                isRegisterDone: true
            })
        }
    },

    onLoad: function(options) {

        timer = null
        timer = setInterval(this.countDown, 1000)

        this.setData({
            kcid: options.id,
            classType : options.type
        })
        this.getClassDetail()

        //可能网络请求  导致获取用户信息 在onLoad 值后
        if (app.userInfoReadyCallback) {
            app.userInfoReadyCallback = (data) => {
                app.globalData.userInfo.data = data
                this.setData({
                    isRegisterDone: true
                })
            }
        } 

    },
    //关闭遮盖层
    closeMask() {
        this.setData({
            isSelectViewShow: false
        })
    },

    countDown() {

        if (maxTime >= 0) {
            var minutes = Math.floor(maxTime / 60);
            if (minutes < 10) {
                minutes = '0' + minutes
            }
            var seconds = Math.floor(maxTime % 60);
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            --maxTime;
            this.setData({
                countDown: `00:${minutes}:${seconds}`
            })
        } else {
            clearInterval(timer);
            maxTime = 15 * 60
        }
    },

    //课程点击事件
    bindClassTap(e) {
        this.setData({
            isSelectViewShow: false
        })
        let param = e.currentTarget.dataset.param
        wx.navigateTo({
            url: `/pages/classDetailEdit/index?kcid=${this.data.kcid}&kcBaoid=${param.id}`,
        })

        return;

        createPayOrder({
            data: {
                kcid: this.data.baseInfo.id,
                kcBaoid: param.id,
                jzid: app.globalData.userInfo.data.id,
            },
            success: (res) => {
                if (res.code == 0) {
                    getWxPayInfo({
                        data: {
                            openId: app.globalData.userInfo.openid,
                            payOrderId: res.data.orderId,
                        },
                        success: (payInfo) => {
                            if (payInfo.code == 0) {
                                //发起支付
                                wx.requestPayment({
                                    appId: payInfo.data.appId,
                                    timeStamp: payInfo.data.timeStamp,
                                    nonceStr: payInfo.data.nonceStr,
                                    package: payInfo.data.package,
                                    signType: "MD5",
                                    paySign: payInfo.data.paySign,
                                    success: () => {
                                        wx.navigateTo({
                                            url: `/pages/pay/pay?price=${this.data.baseInfo.kcMailPrice}&name=${res.data.yyName}&phone=${res.data.yyMobile}`,
                                        })
                                    },
                                    fail: (err) => {

                                        wx.showModal({
                                            title: '提示',
                                            // content: JSON.stringify(err),
                                            content: '用户取消了支付',
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    },

    //当此用户已经在后台注册过了
    binNextTap() {
        this.setData({
            isSelectViewShow: true
        })

    },

    //获取用户手机号
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
                    //用户成功授权 需要访问后台接口 获取当前信息
                    wx.navigateTo({
                        url: '/pages/edit/edit?phone=' + res.msg,
                    })
                }
            })

        } else {
            //用户拒绝 或者其他情况
            wx.showToast({
                title: '用户拒绝了获取手机号',
                icon: 'none',
            })
        }
    },


    //获取课程分类
    getClassType() {
        getClassTypeList({
            success: (res) => {
                let resList = res.data
                let cacheList = this.uniqClassType(resList)
                cacheList.forEach(cache => {
                    resList.forEach(item => {
                        if (cache.id === item.agebiaoshi) {
                            cache.sectionTitle = item.ageduan
                            cache.child.push(item)
                        }
                    })
                })
                this.setData({
                    classTypeList: cacheList
                })
            }
        })
    },

    uniqClassType(array) {
        let temp = []
        let cacheList = []
        for (let i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i].agebiaoshi) == -1) {
                temp.push(array[i].agebiaoshi)
                cacheList.push({
                    id: array[i].agebiaoshi,
                    sectionTitle: '',
                    child: []
                })
            }
        }
        return cacheList

    },

    getClassDetail() {
        getClassDetail({
            data: {
                kcid: this.data.kcid
            },
            success: (res) => {
                let data = res.data.abKecheng
                let swiperList = []
                let zhutiList = []
                for (let i = 1; i < 3; i++) {
                    let key = 'bak' + i
                    if (data.hasOwnProperty(key) && data[key]) {
                        let url = app.globalData.baseUrl + data[key]
                        swiperList.push(url)
                    }
                }

                for (let i = 1; i < 6; i++) {
                    let key = `zhuti${i}Img`
                    if (data.hasOwnProperty(key) && data[key]) {
                        zhutiList.push(app.globalData.baseUrl + data[key])
                    }
                }

                if(this.data.classType == 'en') {
                    for(let i = 1 ; i < 5 ; i++ ) {
                        let key = 'waijiaoimg' + i
                        if (data.hasOwnProperty(key) && data[key]) {
                            zhutiList.push(app.globalData.baseUrl + data[key])
                        }
                    }
                }

                data.swiperList = swiperList
                data.zhutiList = zhutiList
                data.videoUrl = app.globalData.baseUrl + data.videoUrl

                this.setData({
                    baseInfo: data
                })


                //课程包
                let resList = res.data.kcBaolist
                let cacheList = this.uniqClassType(resList)
                cacheList.forEach(cache => {
                    resList.forEach(item => {
                        if (cache.id === item.agebiaoshi) {
                            cache.sectionTitle = item.ageduan
                            cache.child.push(item)
                        }
                    })
                })
                this.setData({
                    classTypeList: cacheList
                })

            },
        })

    },

    onShareAppMessage: function () {
        return {
            title: '天童云课堂'
        }
    }
})