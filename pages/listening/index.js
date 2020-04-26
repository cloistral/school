// pages/listening/index.js

const { listenDetail, listenDetailVideoById } = require('../../utils/server/home.js')
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        kcShiluId : '' ,
        classTypeList : [],
        videoList : [],
        selectClassTypeId : 0,
        videoUrl : '',
    },
    selectClassType (e) {
        let id = e.currentTarget.dataset.data.id
        if (id == this.data.selectClassTypeId) return;
        this.setData({
            selectClassTypeId : id
        })
        listenDetailVideoById({
            data: { shiluTypeId : id},
            success : (res) => {
                this.setData({
                    videoList: res.data.videolist
                })
            }
        }) 
    },
    downloadVideo () {
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
        let videoUrl = e.currentTarget.dataset.data.videoUrl
        this.setData({
            videoUrl: app.globalData.baseUrl + videoUrl
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
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})