var olddistance = 0;  //这个是上一次两个手指的距离  
var newdistance;      //本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
var oldscale = 1;     //这个是上一次动作留下的比例  
var diffdistance;     //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
var baseHeight;       //上一次触摸完之后的高  
var baseWidth;        //上一次触摸完之后的宽  
var windowWidth = 200;  //咱们屏幕的宽  
var windowHeight = 200; //咱们屏幕的高  

Page({
    data: {
        scaleWidth: "",
        scaleHeight: "",
        dataimg: "",
        buttonTop: -20,

    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数  

        // console.log(options.img)
        console.log('在放大图层的id')
        console.log(options.id)
        // var change = decodeURIComponent(options.img)
        // console.log('utf-8转换后的')
        // console.log(change)
        // var res = wx.getSystemInfoSync();  //获取系统信息的同步方法，我用了异步里面提示我this.setData错了  
        // windowWidth = res.windowWidth;
        // windowHeight = res.windowHeight;
        //那就给前面的图片进行赋值，高，宽以及路劲   
        // this.setData({
        //     scaleHeight: windowHeight,
        //     dataimg: change,
        //     scaleWidth: windowWidth
        // }),
        var id = options.id
        var that = this
        wx.request({
            url: 'https://boboxiaochengxu.com/Admin/Linchao/lookimg',
            data: {
                id: id
            },
            success: function (res) {
                console.log(res.data.img)
                that.setData({
                    dataimg: res.data.img
                })
            }
        }),
            wx.setStorage({
                key: "key",
                data: id
            })
    },
    getCharFromUtf8: function (str) {
        var cstr = "";
        var nOffset = 0;
        if (str == "")
            return "";
        str = str.toLowerCase();
        nOffset = str.indexOf("%e");
        if (nOffset == -1)
            return str;
        while (nOffset != -1) {
            cstr += str.substr(0, nOffset);
            str = str.substr(nOffset, str.length - nOffset);
            if (str == "" || str.length < 9)
                return cstr;
            cstr += utf8ToChar(str.substr(0, 9));
            str = str.substr(9, str.length - 9);
            nOffset = str.indexOf("%e");
        }
        return cstr + str;
    },

    //将编码转换成字符  
    utf8ToChar: function (str) {
        var iCode, iCode1, iCode2;
        iCode = parseInt("0x" + str.substr(1, 2));
        iCode1 = parseInt("0x" + str.substr(4, 2));
        iCode2 = parseInt("0x" + str.substr(7, 2));
        return String.fromCharCode(((iCode & 0x0F) << 12) | ((iCode1 & 0x3F) << 6) | (iCode2 & 0x3F));
    },
    //////////////////////
    move: function () {
        var img = this.data.dataimg
        console.log('下面是图片地址')
        console.log(img)
        wx.previewImage({
            urls: [img],
        })
    },
    back: function () {
        wx.navigateBack({
            delta: 3
        })
    },
    onShareAppMessage: function () {
        var img = this.data.dataimg
        return {
            title: '　',
        }

    },
    onShow: function () {
        console.log('页面显示')

        var that = this

        wx.getStorage({
            key: 'key',
            success: function (res) {
                console.log(res.data)
                var id = res.data
                console.log('id')
                wx.request({
                    url: 'https://boboxiaochengxu.com/Admin/Linchao/lookimg',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        console.log(res.data.img)
                        that.setData({
                            dataimg: res.data.img
                        })
                    }
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        console.log('页面隐藏')

        var that = this

        wx.getStorage({
            key: 'key',
            success: function (res) {
                console.log(res.data)
                var id = res.data
                console.log('id')
                wx.request({
                    url: 'https://boboxiaochengxu.com/Admin/Linchao/lookimg',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        console.log(res.data.img)
                        that.setData({
                            dataimg: res.data.img
                        })
                    }
                })
            }
        })

    },
})