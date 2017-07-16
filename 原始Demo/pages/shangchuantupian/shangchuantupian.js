// pages/shangchuantupian/shangchuantupian.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: '',
        upload: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        this.setData({
            uid: options.id
        })
    },
    bindFormSubmit: function (e) {
        console.log('now')
        console.log(e)
        self = this
        var uid = this.data.uid
        //图片
        var imglist = self.data.imglist

        wx.showLoading({
            title: '正在提交...',
            mask: true
        })

        //上传至服务器
        wx.uploadFile({
            url: 'https://boboxiaochengxu.com/Admin/Linchao/upload1',
            filePath: imglist[0],
            name: 'files',
            formData: {
                uid: uid
            },
            success: function (res) {
                console.log(res)
                self.setData({
                    imglist: []
                })
                wx.hideLoading();
                wx.showToast({
                    title: '更新成功',
                    icon: 'success',
                    duration: 2000,
                    mask: true
                })
                wx.navigateBack({
                    delta: 1
                })
                wx.request({
                    url: 'https://boboxiaochengxu.com/Admin/Linchao/imgtotal',
                    data: {
                        uid: uid
                    },
                    success: function (res) {
                        console.log(res);

                    },
                    fail: function (res) {

                    }
                })
            }

        })
    },
    //点击选择图片
    checkimg: function () {
        console.log('点击选择图片');
        self = this
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log('aaaaa')
                console.log(res)
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                self.setData({
                    imglist: tempFilePaths
                })
            }
        }),
            this.setData({
                upload: false
            })
    },
    //点击预览图片
    ylimg: function (e) {
        wx.previewImage({
            current: e.target.dataset.src,
            urls: this.data.imglist // 需要预览的图片http链接列表
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