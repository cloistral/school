// pages/classDetailEdit/index.js

const {
    selectShiduan,
    yejiAdd
} = require('../../utils/server/class.js')
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        param: {
            kcid: '',
            kcBaoid: '',
            jzid: '',
            yycode: '',
            shiduan: ''
        },
        timeList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            'param.kcid': options.kcid,
            'param.kcBaoid': options.kcBaoid,
            'param.jzid': app.globalData.userInfo.data.id
        })
    },
    getClassTime () {
        if(!this.data.param.yycode) {
            wx.showToast({
                title: '请填写员工码!',
                icon:'none'
            })
            return
        }
        selectShiduan({
            data: {
                kcid: this.data.param.kcid,
                yycode: this.data.param.yycode
            },
            success: (res) => {
                let tempList = []
                if(res.code == 0) {
                    res.data.forEach(item => {
                        let param = {
                            name: item.xingqi + '　' + item.shiduan,
                            id: item.id,
                        }
                        tempList.push(param)
                    })
                    this.setData({
                        timeList: tempList
                    })
                }else {
                    wx.showToast({
                        title: res.msg,
                        icon : 'none'
                    })
                }
                
            }
        })
    },
    submit() {
       
        if (!this.data.param.yycode) {
            wx.showToast({
                title: '请填写邀请码',
                icon: 'none'
            })
            return;
        }

        if (!this.data.param.shiduan) {
            wx.showToast({
                title: '请选择上课时段',
                icon: 'none'
            })
            return;
        }

        yejiAdd({
            data: this.data.param,
            success: (res) => {
                if (res.code == 0) {
                    app.globalData.userInfo.data.yqcode = this.data.param.yycode
                    app.globalData.userInfo.data.yyName = res.data.yyName
                    app.globalData.userInfo.data.yyMobile = res.data.yyMobile
                    wx.navigateTo({
                        url: `/pages/pay/pay?&name=${res.data.yyName}&phone=${res.data.yyMobile}`,
                    })
                } else {
                    wx.showToast({
                        title: res.msg,
                        icon : 'none',
                    })
                }

            }
        })


    },
    bindTimeChange(e) {
        let index = e.detail.value
        this.setData({
            ['param.shiduan']: this.data.timeList[index].name
        })
    },
    bindCodeInput(e) {
        this.setData({
            ['param.yycode']: e.detail.value,
            ['param.shiduan'] : '',
            ['timeList'] : []
        })
    },
})