// pages/location/location.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        polyline:[],
        markers: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        //获取markers

        //获取polyline


        wx.getLocation({
            type: 'gcj02',
            altitude: true,
            success: function (res) {
                that.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                    //设置polyline

                    //设置markers


                })
            }
        });
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

    },

    toPosition:function (e) {
        var that = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                that.setData({
                    latitude: latitude,//纬度
                    longitude: longitude,//经度
                })
            }
        })
    }

})