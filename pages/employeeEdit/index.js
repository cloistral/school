// pages/employeeEdit/index.js
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
        if(!this.data.param.yycode) {
            wx.showToast({
                title: '请输入员工码!',
                icon: 'none'
            })
            return;
        }else {
            if (!reg.test(this.data.param.yycode)) {
                wx.showToast({
                    title: '员工码不符合规则!',
                    icon: 'none'
                })
                return
            }
        }
        
        if(!this.data.param.mobile) {
            wx.showToast({
                title: '请输入手机号!',
                icon: 'none'
            })
            return
        }else {
            let phoneReg = /^1\d{10}$/
            if (!phoneReg.test(this.data.param.mobile)) {
                wx.showToast({
                    title: '手机号不符合规则!',
                    icon: 'none'
                })
                return
            }
        }
        
        let type = this.data.type 
        let { yycode , mobile} = this.data.param
        wx.navigateTo({
          url: `/pages/employeeDetail/index?type=${type}&yycode=${yycode}&mobile=${mobile}`,
        })
    
      

    }

})