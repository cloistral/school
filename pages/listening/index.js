// pages/listening/index.js

const { listenDetail, listenDetailVideoById, getWatchRecord } = require('../../utils/server/home.js')
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        kcShiluId : '' ,
        classTypeList : [],
        videoList : [],
        selectClassTypeId : 2,
        videoUrl : '',
        isProcessShow : false,
        downPercent : 0,
        typeList : [
            { id: 2, text: '精彩瞬间' },
            { id: 1, text: '视频集锦 ' },
        ],
        mediaObject : {
            imageList : [],
            videoList : []
        },
        swiperInfo: {
            width: '',
            height: ''
        }
    },
    onReady: function (res) {
        this.videoContext = wx.createVideoContext('myVideo')
    },
    selectClassType (e) {

        let id = e.currentTarget.dataset.data.id
        if (id == this.data.selectClassTypeId) return;
        this.setData({
            selectClassTypeId: id
        })

        if(id == 1) {
            this.videoContext.play()
        }else {
            this.videoContext.pause()
        }

       
        
        return;
        listenDetailVideoById({
            data: { shiluTypeId : id},
            success : (res) => {
                this.setData({
                    videoList: res.data.videolist
                })
            }
        }) 
    },
    
    playVideo (e) {
        let videoUrl = e.currentTarget.dataset.data.url
        this.setData({
            videoUrl: videoUrl
        }) 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            kcShiluId : options.id || ''
        })
        this.__initData()
    },


    getImageList () {
        //获取图片
        getWatchRecord({
            data: { shiluTypeId: 2 },
            success: (res) => {
                let list = res.data.jianzhenglist || []
                list.forEach(item => {
                    item.url = app.globalData.baseUrl + item.imgUrl
                })
                this.setData({
                    ['mediaObject.imageList']: list
                })
                console.log(this.data.mediaObject)

            }
        })
    },

    getVideoList () {
        //获取视频
        getWatchRecord({
            data: { shiluTypeId: 1 },
            success: (res) => {
                let list = res.data.jianzhenglist || []
                list && list.forEach(item => {
                    item.url = app.globalData.baseUrl + item.videoUrl
                })
                this.setData({
                    'videoUrl': list[0].url,
                    ['mediaObject.videoList']: res.data.jianzhenglist
                })
            }
        })
    },

    __initData () {
        this.getImageList()
        this.getVideoList()
    },
    imageLoad(e) {
        let width = e.detail.width
        let height = e.detail.height
        let pi = width / height
        let windowWidth = wx.getSystemInfoSync().windowWidth
        this.setData({
            'swiperInfo.width': windowWidth * .95 + 'px',
            'swiperInfo.height': windowWidth * .95 / pi + 'px'
        })
    },
    stopDownload () {
        this.setData({
            isProcessShow: false
        })
        wx.showToast({
            title: '取消了下载!',
        })
        if (this.downloadTask) {
            this.downloadTask.abort()
        }
    },
    saveVideo(e) {
        let videoUrl = e.currentTarget.dataset.data.url
        this.setData({
            isProcessShow : true
        })
        this.downloadTask = wx.downloadFile({
            url: videoUrl,
            success: (res) => {
                wx.hideLoading()
                wx.saveVideoToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: () => {
                        wx.showToast({
                            title: '保存成功',
                            duration : 3000,
                        })
                    },
                    fail: () => {
                        wx.showToast({
                            title: '保存失败',
                            icon: 'none',
                            duration: 3000,
                        })
                    },
                })
            },
            complete : () => {
                
                this.setData({
                    isProcessShow: false
                })
            }
        })
        
        this.downloadTask.onProgressUpdate((res) => {
            this.setData({
                downPercent: res.progress
            })

            console.log('预期需要下载的数据总长度', res)
        })
    },

    saveImage (e) {
        let url = e.currentTarget.dataset.data.url
        wx.showLoading({
            title: '加载中...',
        })
        wx.downloadFile({
            url : url,
            success : (res) => {
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success : () => {
                        wx.showToast({
                            title: '保存成功',
                            duration: 3000,
                        })
                    },
                    fail : () => {
                        wx.showToast({
                            title: '保存失败',
                            icon : 'none',
                            duration: 3000,
                        })
                    },
                    complete : () => {
                        wx.hideLoading()
                    }
                })
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})