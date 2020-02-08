var point = [];
var that2;

function drawline() {
    that2.setData({
        polyline: [{
            points: point,
            color: '#99FF00',
            width: 4,
            dottedLine: false
        }]
    });
}

//获取经纬度
function getlocation() {
    var lat, lng;
    altitude: true
    wx.getLocation({
        type: 'gcj02',
        success: function (res) {
            lat = res.latitude;
            lng = res.longitude;
            point.push({latitude: lat, longitude: lng});
            wx.getStorage({
                key: 'points',
                success: function (res) {
                    console.log(res)
                    res.data.push({latitude: lat, longitude: lng})
                    wx.setStorage({
                        key: 'points',
                        data: res.data,
                    })
                },
            })
        }
    });
}

Page({
    data: {
        polyline: [],
        day: "2019-11-4",
        markers: [],
        startDisable: false,
        endDisable: true
    },

    onLoad: function () {
        that2 = this;
        // that2.data.startDisable = false;
        // that2.data.endDisable = true;
        wx.getStorage({
            key: 'points',
            success: function (res) {

            },
            fail: function (res) {
                wx.setStorage({
                    key: 'points',
                    data: [],
                })
            }
        })
        wx.getLocation({
            type: 'gcj02',
            altitude: true,
            success: function (res) {
                that2.setData({
                    longitude: res.longitude,
                    latitude: res.latitude,
                    markers: [
                        {
                            id: 1,
                            latitude: res.latitude,
                            longitude: res.longitude,
                            iconPath: '../../image/location.png',
                            width: 30,
                            height: 30,
                            callout: {
                                content: "服务:失物招领事务所",
                                bgColor: "#fff",
                                padding: "5px",
                                borderRadius: "2px",
                                borderWidth: "1px",
                                borderColor: "#07c160"
                            },
                        }
                    ]
                })
            }
        });
    },

    start: function () {
        var that = this;

        that.setData({
            startDisable: true,
            endDisable: false
        })

        wx.showModal({
            title: '开始记录',
            content: '记录开始啦',
        })
        this.timer = setInterval(repeat, 1000);

        function repeat() {
            console.log('re');
            getlocation();
            drawline();
        }
    },

    end: function () {
        var that = this;

        that.setData({
            startDisable: false,
            endDisable: true
        })

        console.log('end');
        clearInterval(this.timer);
        wx.showModal({
            title: '结束记录',
            content: '记录结束啦',
        })
    },

    controlTap(e) {
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

});
