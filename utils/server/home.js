const request = require('../request.js')

const getHomeInfo = function (param) {
    request({
        url: "/api/ab/lunboAndkcType",
        method: 'post',
        success(res) {
            if (param.success) {
                param.success(res)
            }
        }
    })
}

const getRecommendClassList = function (param) {
    request({
        url: "/api/ab/tuijianVideolist",
        method: 'post',
        success(res) {
            if (param.success) {
                param.success(res)
            }
        }
    })
}

const getClassListById  = function (param) {
    request({
        url: "/api/ab/kclist",
        data: param.data,
        method: 'post',
        success(res) {
            if (param.success) {
                param.success(res)
            }
        }
    })
}

const listenDetail = function (param) {
    request({
        url: "/api/ab/shiluDetails",
        data: param.data,
        method: 'post',
        success(res) {
            if (param.success) {
                param.success(res)
            }
        }
    })
    
}

const listenDetailVideoById = function (param) {
    request({
        url: "/api/ab/videolist",
        data: param.data,
        method: 'post',
        success(res) {
            if (param.success) {
                param.success(res)
            }
        }
    })
}


const tuijianKclist = function (param) {
    request({
        url: "/api/ab/tuijianKclist",
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
    getHomeInfo,
    getRecommendClassList, //获取首页推荐视频
    getClassListById, //根据课程类别id 获取相应的课程
    listenDetail, //
    listenDetailVideoById ,
    tuijianKclist , //首页推荐的视频
}