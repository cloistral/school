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
        selectClassTypeId : 1,
        videoUrl : '',
        typeList : [
            { id : 1 , text : '视频' },
            { id: 2, text: '图片' },
        ],
        mediaObject : {
            imageList : [],
            videoList : []
        }
    },
    selectClassType (e) {

        let id = e.currentTarget.dataset.data.id
        if (id == this.data.selectClassTypeId) return;
        this.setData({
            selectClassTypeId : id
        })

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
    saveVideo () {
        const downloadTask = wx.downloadFile({
            url: data.videoUrl,
            success: (res) => {
                wx.saveVideoToPhotosAlbum({
                    filePath: res.tempFilePath,
                })
            }
        })
        downloadTask.onProgressUpdate((res) => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
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
    __initData () {
        //获取视频
        getWatchRecord({
            data: { shiluTypeId: 1},
            success : (res) => {
                let list = res.data.jianzhenglist || []
                list && list.forEach( item => {
                    item.url = app.globalData.baseUrl + item.videoUrl
                })
                this.setData({
                    'videoUrl' : list[0].url,
                    ['mediaObject.videoList']: res.data.jianzhenglist
                })
            }
        })
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

        return
        listenDetail({
            data: { kcShiluId: this.data.kcShiluId },
            success : (res) => {
                this.setData({
                    classTypeList: res.data.kcshilutypelist,
                    videoList: res.data.videolist,
                    videoUrl: app.globalData.baseUrl + res.data.videolist[0].videoUrl
                })
            }
        })  
    },

    saveVideo(e) {
        let videoUrl = e.currentTarget.dataset.data.url
        wx.showLoading({
            title: '下载中...',
        })
        const downloadTask = wx.downloadFile({
            url: videoUrl,
            success: (res) => {
                wx.saveVideoToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: () => {
                        wx.showToast({
                            title: '保存成功',
                        })
                    },
                    fail: () => {
                        wx.showToast({
                            title: '保存失败',
                            icon: 'none'
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })
            }
        })
        downloadTask.onProgressUpdate((res) => {
            console.log('下载进度', res.progress)
            console.log('已经下载的数据长度', res.totalBytesWritten)
            console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
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
                        })
                    },
                    fail : () => {
                        wx.showToast({
                            title: '保存失败',
                            icon : 'none'
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