const request = require('../request.js')

const getClassDetail = function (param) {
  request({
    // url: "/api/ab/kclist",
    url: '/api/ab/kcDetails',
    data: param.data,
    method: 'post',
    success(res) {
      if (param.success) {
        param.success(res)
      }
    }
  })
}

const getClassTypeList = function (param) {
  request({
    url: "/api/ab/kcbaolist",
    method: 'get',
    success(res) {
      if (param.success) {
        param.success(res)
      }
    }
  })
  
}


const selectShiduan = function (param) {
    request({
        url: "/api/ab/selectShiduan",
        data : param.data,
        method: 'post',
        success(res) {
            if (param.success) {
                param.success(res)
            }
        }
    })
}

const yejiAdd = function (param) {
    request({
        url: "/api/abpay/yejiAdd",
        data: param.data,
        method: 'post',
        success(res) {
            if (param.success) {
                param.success(res)
            }
        }
    })
    

}


module.exports = {
  getClassDetail , //获取课程详情
  getClassTypeList , //获取课程分类
  selectShiduan,
  yejiAdd
}