// pages/employeeEdit/index.js

const app = getApp()
const {
    getParentList,
    getStatistics
} = require('../../utils/server/home')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '', //入口类型
        param: {
            yycode: '',
            mobile: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            type: options.type
        })
    },

    bindCodeInput(e) {
        this.setData({
            ['param.yycode']: e.detail.value,
        })
    },
    bindPhoneInput(e) {
        this.setData({
            ['param.mobile']: e.detail.value,
        })
    },
    submit() {



        let reg = /^[0-9]{5}$/
        if (!this.data.param.yycode) {
            wx.showToast({
                title: '请输入员工码!',
                icon: 'none'
            })
            return;
        } else {
            if (!reg.test(this.data.param.yycode)) {
                wx.showToast({
                    title: '员工码不符合规则!',
                    icon: 'none'
                })
                return
            }
        }

        if (!this.data.param.mobile) {
            wx.showToast({
                title: '请输入手机号!',
                icon: 'none'
            })
            return
        } else {
            let phoneReg = /^1\d{10}$/
            if (!phoneReg.test(this.data.param.mobile)) {
                wx.showToast({
                    title: '手机号不符合规则!',
                    icon: 'none'
                })
                return
            }
        }
        this.initData()

    },
    initData: function () {
        let type = this.data.type
        let param = this.data.param
        if (type == 'statistics') {
            getStatistics({
                data: param,
                success: (res) => {
                    this.editData(res)
                }
            })
        } else if (type == 'parent') {
            getParentList({
                data: param,
                success: (res) => {
                    this.editData(res)
                }
            })
        }
    },
    editData(res) {
        if (res.code == 0) {
            this.setData({
                data: res.data
            })
            if (!res.data || res.data.length == 0) {
                wx.showToast({
                    title: '暂无数据',
                    icon: 'none'
                })
            }else {
                app.globalData.emlpoyeeData = res.data
                let type = this.data.type
                wx.navigateTo({
                    url: `/pages/employeeDetail/index?type=${type}`,
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