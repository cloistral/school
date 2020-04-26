const request = require('../request.js')
const getUserInfo = function (param) {
  request({
    url: '/api/abpay/getUserInfo',
    data : param.data,
    method : 'post',
    success (res) {
      if(param.success) {
        param.success(res)
      }
    }
  })
}

const judgeIsRegister = function (param) {
  request({
    url: '/api/abpay/isRegist',
    data: param.data,
    method: 'post',
    success(res) {
      param.success(res)
    }
  })
}

const getUserPhone = function (param) {
  request({
    url: '/api/abpay/getUserPhone',
    data: param.data,
    method: 'post',
    success(res) {
      param.success(res)
    }
  })
}

const createPayOrder = function (param) {
  request({
    url: '/api/abpay/orderAdd',
    data: param.data,
    method: 'post',
    success(res) {
      param.success(res)
    }
  })
}

const getWxPayInfo = function (param) {
  request({
    url: '/api/abpay/toxcxpay',
    data: param.data,
    method: 'post',
    success(res) {
      param.success(res)
    }
  })
}


const registerUser = function (param) {
  request({
    url: '/api/ab/parentAdd',
    data: param.data,
    method: 'post',
    success(res) {
      param.success(res)
    }
  })
}


const getOperateByCode = function (param) {
    request({
        url: '/api/ab/checkYyInfo',
        data: param.data,
        method: 'post',
        success(res) {
            param.success(res)
        }
    })
}

const getMyService = function (param) {
    request({
        url: '/api/abpay/mykclist',
        data: param.data,
        method: 'post',
        success(res) {
            param.success(res)
        }
    })
}




module.exports = {
  getUserInfo, //获取用户信息
  judgeIsRegister, //判断用户是否已经注册过
  getUserPhone , // 获取用户手机号
  createPayOrder, //生成订单
  getWxPayInfo, // 获取位置支付相关参数
  registerUser, //注册用户
  getMyService, //获取我的预约课程
  getOperateByCode //获取我的服务人员
}