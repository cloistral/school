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
        isHidePicker : true,
        timeValue : [0],
        timeList: [],
    },
    showPicker () {
        this.setData({
            isHidePicker : false
        })
        // console.log(1111, this.data.isHidePicker)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            'param.kcid': options.kcid,
            'param.kcBaoid': options.kcBaoid,
            'param.jzid': app.globalData.userInfo.data.id,
        })
    },
    getClassTime () {
        if(!this.data.param.yycode) {
            wx.showToast({
                title: '请填写员工码!',
                icon:'none'
            })
            return
        }else {
            let reg = /^[0-9]{5}$/
            if(!reg.test(this.data.param.yycode)) {
                wx.showToast({
                    title: '员工码不符合规则!',
                    icon: 'none'
                })
                return
            }
        }

        selectShiduan({
            data: {
                kcid: this.data.param.kcid,
                yycode: this.data.param.yycode,
                kcBaoid: this.data.param.kcBaoid,
                jzid: app.globalData.userInfo.data.id

            },
            success: (res) => {
                let tempList = []
                if(res.code == 0) {

                    res.data.forEach(item => {
                        
                        tempList.push({ 
                            label: `${item.xingqi} ${item.shiduan} / ${item.xingqi2} ${item.shiduan2}`, 
                            value: item.id
                        })
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
                title: '请填写员工码',
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
    customPickerChange (e) {
        this.setData({
            timeValue: e.detail.value
        })
    },
    handleTap(e) {
        let type = e.currentTarget.dataset.type 
       
        this.setData({
            isHidePicker : true
        })
        if(type == 'confirm') {
            let index = this.data.timeValue[0]
            this.setData({
                ['param.shiduan']: this.data.timeList[index].label,
                ['param.shiduanId']: this.data.timeList[index].value
            })
        }
    },
    
    bindCodeInput(e) {
        this.setData({
            ['param.yycode']: e.detail.value,
            ['param.shiduan'] : '',
            ['timeList'] : []
        })
    },
})