//app.js
App({
    openid: null,
    onLaunch: function (res) {
        var that = this
        wx.login({
            success: function (res) {

            }
        })
    }

})