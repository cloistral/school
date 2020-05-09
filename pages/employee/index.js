// pages/employee/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      type : '',
      param : {
        mobile : '',
        yycode : ''
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
         type : options.type,
         ['param.mobile'] : options.mobile,
         ['param.yycode'] : options.yycode
      })
    },

    goToEdit (e) {
        //statistics 统计  parent 家长
        let type = e.currentTarget.dataset.type
        console.log(type,1111)
        wx.navigateTo({
          url: '/pages/employeeEdit/index?type=' + type,
        })
    }
  
})