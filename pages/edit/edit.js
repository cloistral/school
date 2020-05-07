// pages/editChildInfo/edit.js

const app = getApp()

let {
    registerUser,
    editUser,
} = require('../../utils/server/sever.js')

Page({
    data: {
        param: {
            sex: 0, //1是女孩 0是男孩 
            hzname: '',
            birthday: '',
            mobile: '',
            yqcode: '',
            openid: ''
        },
        type: null,
        schoolList: [{
            name: '吉林长春-自由校区',
            id: '041240402'
        }, ]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
            ['param.mobile']: options.phone,
            ['param.openid']: app.globalData.userInfo.openid,
            ['param.birthday']: options.birthday || '',
            ['param.hzname']: options.hzname || '',
            ['param.yqcode']: options.yqcode || '',
            type: options.type || null
        })
    },
    
    sexBtnclick(e) {
        this.setData({
            ['param.sex']: e.currentTarget.dataset.sex
        })
    },
    bindCodeInput(e) {
        this.setData({
            ['param.yqcode']: e.detail.value
        })
    },
    bindPhoneInput(e) {
        this.setData({
            ['param.mobile']: e.detail.value
        })
    },
    //日期选择
    bindDateChange(e) {
        this.setData({
            ['param.birthday']: e.detail.value
        })
    },
    bindNicknameInput(e) {
        this.setData({
            ['param.hzname']: e.detail.value
        })
    },
    bindSchoolChange(e) {
        let index = e.detail.value
        this.setData({
            ['param.diquId']: this.data.schoolList[index].id,
            ['param.diquId']: this.data.schoolList[index].name
        })
    },
    submit() {
        let param = this.data.param
        if (!param.mobile) {
            wx.showToast({
                title: '请输入手机号码',
                icon: 'none',
            })
            return;
        } else if (!(/^[1][0-9]{10}$/.test(param.mobile))) {
            wx.showToast({
                title: '请输入正确的手机号码',
                icon: 'none',
            })
            return;
        }

        // if(!param.diquId) {
        //   wx.showToast({
        //     title: '请选择所在学校',
        //     icon: 'none',
        //   })
        //   return;
        // }

        if (!param.hzname) {
            wx.showToast({
                title: '请输入宝贝昵称',
                icon: 'none',
            })
            return;
        }else {
            // if (param.hzname.length > 4) {
            //     wx.showToast({
            //         title: '宝贝昵称不能超过4个字',
            //         icon: 'none',
            //     })
            //     return;
            // }
        }

        if (!param.birthday) {
            wx.showToast({
                title: '请选择宝贝生日',
                icon: 'none',
            })
            return;
        }

        wx.showLoading({
            title: '加载中...',
        })

        if (!this.data.type) {
            registerUser({
                data: param,
                success: (res) => {
                    if (res.code == 0) {
                        app.globalData.userInfo.data = res.data
                        // app.isRegister()
                        if (app.userInfoReadyCallback) {
                            app.userInfoReadyCallback(res.data)
                        }
                        wx.hideLoading()
                        wx.showToast({
                            title: '注册成功',
                            success() {
                                wx.navigateBack()
                            }
                        })
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: res.msg,
                            icon: 'none',
                        })
                    }

                }
            })
        }else {
            param.parentId = app.globalData.userInfo.data.id
            editUser({
                data : param,
                success : (res) => {
                    if(res.code == 0) {
                        app.globalData.userInfo.data = res.data
                        wx.showToast({
                            title: '编辑成功',
                            success : () => {
                                wx.navigateBack()
                            }
                        })
                        
                    }else {
                        wx.showToast({
                            title: res.msg,
                            icon : 'none'
                        })
                    }
                }
            })
        }
    },

})