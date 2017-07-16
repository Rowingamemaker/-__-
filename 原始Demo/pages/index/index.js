//index.js
//获取应用实例
var app = getApp()
var common = require('../../utils/common.js');

Page({
    data: {
        wenjianjia: '../../images/wenjianjia.png',
        album: [],
        wenjian: false,
        showModalStatus: false,
        search: true,
        id: ''///全局操作的id  供删除文件 管理文件
    },
    onLoad: function () {
        var that = this;
        wx.request({
            url: 'https://boboxiaochengxu.com/Admin/Linchao/wenjianselect',
            success: function (res) {
                // console.log(res.data[0].wenjianjia);
                that.setData({
                    album: res.data
                })
            }
        })
    },
    ///搜索按钮
    formSubmit: function (res) {
        W
        var that = this
        console.log(res.detail.value.input)
        var wenjianname = res.detail.value.input
        if (!wenjianname) {
            common.showTip("搜索不能为空", "loading");
        }
        wx.request({
            url: 'https://boboxiaochengxu.com/Admin/Linchao/sousuo', //仅为示例，并非真实的接口地址
            data: {
                wenjianname: wenjianname
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res);
                // wx.showToast({
                //     title: '添加成功',
                // }),
                // that.setData({
                //     album: res.data
                // })
            },
            fail: function (res) {


            }
        })
    },
    //添加文件夹按钮
    addwenjian: function () {
        this.setData({
            wenjian: true
        })
    },
    //添加文件夹取消按钮
    noneWindows: function () {
        this.setData({
            wenjian: false
        })
    },
    //添加文件夹
    addwenjianjianame: function (event) {
        // var wenjianname = event.detail.value.wenjianname;
        var wenjianname = event.detail.value.wenjianname;

        console.log(event.detail.value.wenjianname);
        var that = this;
        if (!wenjianname) {
            common.showTip("标题不能为空", "loading");
        } else {
            wx.request({
                url: 'https://boboxiaochengxu.com/Admin/Linchao/addwenjian', //仅为示例，并非真实的接口地址
                data: {
                    wenjianjia: event.detail.value.wenjianname
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    console.log(res.data);
                    wx.showToast({
                        title: '添加成功',
                    }),
                        that.setData({
                            wenjian: false,
                            album: res.data
                        })
                },
                fail: function (res) {
                    console.log(res.data)
                    console.log('fail')

                }
            })

        }


    },
    ///进入添加图片的页面
    inaddimg: function (res) {
        console.log('下面是添加页面的id')
        console.log(res.target.dataset.id)
        var id = res.target.dataset.id
        console.log(id)
        wx.navigateTo({
            url: '../imgcontroller/imgcontroller?id=' + id,
        })
    },
    del: function (res) {
        var id = res.target.dataset.id
        console.log('del的id'.id)
        console.log(id)
        var that = this
        wx.showModal({
            title: '提示',
            content: '确定要删除文件夹',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: 'https://boboxiaochengxu.com/Admin/Linchao/delwenjianjia',
                        data: {
                            id: id
                        },
                        success: function (res) {
                            console.log(res);
                            console.log(id)
                            that.setData({
                                showModalStatus: false,
                                album: res.data
                            })
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
    showModal: function (res) {
        //获取时间
        var id = res.target.dataset.id;
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
            id: id
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
        }.bind(this), 200)
    },
    onShareAppMessage: function () {

    }
})
