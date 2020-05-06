const app = getApp()
const {
    getHomeInfo,
    tuijianKclist
} = require('../../utils/server/home.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSaleShow: false,
        adSwiperList: [], // 轮播
        menuList: [], //课程类别
        recommendClassList : [],
        swiperInfo : {
            width : '',
            height : ''
        }
    },

    handleListen(e) {
        let id = e.currentTarget.dataset.data.id
        wx.navigateTo({
            url: '/pages/listening/index?id=' + id,
        })
    },

    showSaleMask() {
        this.setData({
            isSaleShow: true
        })
    },

    imageLoad (e) {
        let width = e.detail.width
        let height = e.detail.height
        let pi  = width/height
        let windowWidth = wx.getSystemInfoSync().windowWidth
        this.setData({
            'swiperInfo.width': windowWidth * .95 + 'px',
            'swiperInfo.height': windowWidth * .95 / pi + 'px'
        })
    },

    goToPage (e) {
        let data = e.currentTarget.dataset.param
        if(data.path) {
            wx.navigateTo({
                url: data.path,
            })
        }
    },

    closeSaleMask() {
        this.setData({
            isSaleShow: false,
        })
        // wx.showTabBar({})
    },

    goToClassDetail(e) {
        let id = e.currentTarget.dataset.data.id
        let type = e.currentTarget.dataset.data.kcTypeName == '中教课' ? 'zh' : 'en'
        wx.navigateTo({
            url: `/pages/classDetail/index?id=${id}&type=${type}`,
        })
    },
    initData() {
       
        getHomeInfo({
            success : (res) => {
                //轮播图片
                let tempList = []
                res.data.lunbolist.forEach(item => {
                    let param = {
                        id : item.id,
                        imgPath: app.globalData.baseUrl + item.lunboImg
                    }
                    tempList.push(param)
                })
                this.setData({
                    adSwiperList : tempList
                })

                //课程类别
                let tempClassList = []
                res.data.kctypelist.forEach(item => {
                    let param = {
                        imagePath: app.globalData.baseUrl + item.kcTypeImg,
                        text: item.kcTypeName,
                        path: '/pages/classList/index?id=' + item.id
                    }
                    tempClassList.push(param)
                })
                tempClassList.push({
                    imagePath: '/images/real.png',
                    text: '见证实录',
                    path: '/pages/listening/index'
                })
                this.setData({
                    menuList: tempClassList
                })

            }
        })

        tuijianKclist ({
            success : (res) => {
                let list = res.data
                list.forEach(item => {
                    item.topImg = app.globalData.baseUrl + item.topImg
                })
                console.log(list)
                this.setData({
                    recommendClassList: list
                })
            }
        })
    },
    onLoad() {
        this.initData()
        // this.showSaleMask()
    },

    onShareAppMessage: function() {
        return {
            title: '天童云课堂'
        }
    }
})