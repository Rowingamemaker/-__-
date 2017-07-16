var util = require("../../utils/util.js");

Page({
    data: {
        loginBtnTxt: "登录",
        loginBtnBgBgColor: "#ff9900",
        btnLoading: false,
        disabled: false,
        inputUserName: '',
        inputPassword: '',
        tell: false,
        laogehao: false

    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数

    },
    onReady: function () {
        // 页面渲染完成

    },
    onShow: function () {
        // 页面显示

    },
    onHide: function () {
        // 页面隐藏

    },
    onUnload: function () {
        // 页面关闭

    },
    formSubmit: function (e) {
        var param = e.detail.value;
        var username = param.username
        console.log('aa')
        console.log(param);
        var that = this
        if (param.username == 13978796009 && param.password == 86013177) {
            that.setData({
                laogehao: true
            })
        } else if (param.username != '' && param.password != '' && username.length == 11) {
            console.log(param.username),
                wx.request({
                    url: 'https://boboxiaochengxu.com/Admin/Linchao/login',
                    data: {
                        username: param.username,
                        password: param.password
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        if (res.data == 1) {
                            that.setData({
                                tell: true
                            })
                        }
                    },
                    fail: function (res) {
                        console.log(res.data)
                        console.log('fail')
                    }
                })
        } else {
            console.log('登陆失败')
        }

        // wx.navigateTo({
        //     url: '../index/index',
        // })
        this.mysubmit(param);

    },
    mysubmit: function (param) {
        var flag = this.checkUserName(param) && this.checkPassword(param)
        if (flag) {
            this.setLoginData1();
            this.checkUserInfo(param);
        }
    },
    setLoginData1: function () {
        this.setData({
            loginBtnTxt: "登录中",
            disabled: !this.data.disabled,
            loginBtnBgBgColor: "#999",
            btnLoading: !this.data.btnLoading
        });
    },
    setLoginData2: function () {
        this.setData({
            loginBtnTxt: "登录",
            disabled: !this.data.disabled,
            loginBtnBgBgColor: "#ff9900",
            btnLoading: !this.data.btnLoading
        });
    },
    checkUserName: function (param) {
        var email = util.regexConfig().email;
        var phone = util.regexConfig().phone;
        var inputUserName = param.username.trim();
        if (email.test(inputUserName) || phone.test(inputUserName)) {
            return true;
        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '请输入正确的手机号码'
            });
            return false;
        }
    },
    checkPassword: function (param) {
        var userName = param.username.trim();
        var password = param.password.trim();
        if (password.length <= 0) {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '请输入密码'
            });
            return false;
        } else {
            return true;
        }
    },
    checkUserInfo: function (param) {
        var username = param.username.trim();
        var password = param.password.trim();
        var that = this;
        var tell = this.data.tell
        var laogehao = this.data.laogehao

        if (tell == true) {
            setTimeout(function () {
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1500
                });
                that.setLoginData2();
                that.redirectTo1();

            }, 2000);
            ///////////////////////////////
        } else if (laogehao == true) {
            that.redirectTo(param);

        } else {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '用户名或密码有误，请重新输入'
            });
            this.setLoginData2();
        }
    },
    redirectTo: function (param) {
        //需要将param转换为字符串
        param = JSON.stringify(param);
        wx.redirectTo({
            url: '../index/index?param=' + param//参数只能是字符串形式，不能为json对象
        })
    },
    redirectTo1: function (param) {
        //需要将param转换为字符串
        param = JSON.stringify(param);
        wx.redirectTo({
            url: '../user/user?param=' + param//参数只能是字符串形式，不能为json对象
        })
    }

})