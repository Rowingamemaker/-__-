// pages/imgcontroller/imgcontroller.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uid: '',
        imglist: [],
        elements: [],
        img: '',
        upload: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options.id);
        var uid = options.id;
        this.setData({
            uid: options.id
        })
        var that = this
        wx.request({
            url: 'https://boboxiaochengxu.com/Admin/Linchao/imgtotal',
            data: {
                uid: uid
            },
            success: function (res) {
                console.log(res);
                that.setData({
                    elements: res.data
                })

            },
            fail: function (res) {

            }
        })
    },
    ////////点击图片放大
    imgmax: function (res) {
        console.log(res.target.dataset);
        var img = this.data.img;
        var id = this.data.id;
        console.log('放大的图片地址')
        console.log(img);
        console.log('图片的id')
        console.log(id)
        wx.reLaunch({
            url: '../imgmax/imgmaxs?id=' + id,
        })
    },
    bindFormSubmit: function (e) {
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
            url: 'https://boboxiaochengxu.com/Admin/Linchao/upload',
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
                    title: '上传成功',
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
        });
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
    showModal: function (res) {
        //获取时间
        var id = res.target.dataset.id;
        var img = res.target.dataset.img;

        console.log('showModal')
        var d = new Date();
        var year = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var now = year + " " + hour;
        var time1 = year + " " + "12:00:00";
        var time2 = year + " " + "18:00:00";
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true,
            id: id,
            img: img
        })
        //比较现在时间和设定时间，设置是否可点击状态
        if (now < time1) {                              //两个都可点击
            setTimeout(function () {
                animation.translateY(0).step()
                this.setData({
                    animationData: animation.export()
                })
            }.bind(this), 200)
        }
        else if (now < time2) {                          //下午可点击
            setTimeout(function () {
                animation.translateY(0).step()
                this.setData({
                    animationData: animation.export(),
                    appointment_button1: "class3"
                })
            }.bind(this), 200)
        }
        else {                                            //都不可点击
            setTimeout(function () {
                animation.translateY(0).step()
                this.setData({
                    animationData: animation.export(),
                    appointment_button1: "class3",
                    appointment_button2: "class3"
                })
            }.bind(this), 200)
        }
    },

    hideModal: function () {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200),
            wx.navigateBack({
                delta: 0
            })

    },
    //更新图片
    inaddimg: function () {
        console.log('下面是更新图片的id')
        var id = this.data.id
        console.log(id)
        var that = this
        wx.navigateTo({
            url: '../shangchuantupian/shangchuantupian?id=' + id,
        })

    },
    del: function () {
        console.log('下面是删除图片的id')
        var id = this.data.id;
        console.log(id)
        var that = this
        wx.showModal({
            title: '祝大哥发财',
            content: '老哥你想删除图片吗',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.request({
                        url: 'https://boboxiaochengxu.com/Admin/Linchao/delimg',
                        data: {
                            id: id
                        },
                        success: function (res) {
                            console.log('del')
                            console.log(res);
                            wx.showToast({
                                title: '删除成功',
                            })

                        },
                        fail: function (res) {
                            console.log(res)
                            wx.showToast({
                                title: '删除失败',
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    onShareAppMessage: function () {

    }

})