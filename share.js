/*
 * 调用微信JS-SDK
 * 引入微信Js-SDK，后，需要在公共帐号上配置与appid对应的域名，二级域名匹配即可
 *  */

__inline("../jweixin-1.0.0.js");
share = {};
share = function(opt){

    var ua = window.navigator.userAgent.toLowerCase();
    //微信分享JS-SDK,如果微信则调用以下接口
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        var opt = opt || {};
        var title = opt.title || '默认分享文案！';
        var desc = opt.desc || '默认分享描述';
        var link = opt.link || window.location.href;  //分享链接
        var imgUrl = opt.imgUrl || defaultImg;
        var onSuccess = opt.onSuccess || {};
        var onFail = opt.onFail || {};
        var params = {};
        params.url = window.location.href;
        PJS.http.piaoajax({
            url: "/weixin/config",
            type: 'get',
            data: params,
            dataType: 'json',
            success: function (res) {
                if (!res.errorNo && res.data) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: 'wx165901fd5dfa359b', // 必填，公众号的唯一标识
                        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: res.data.noncestr,  // 必填，生成签名的随机串
                        signature: res.data.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            title: title, // 分享标题
                            link: link,
                            imgUrl: imgUrl, // 分享图标
                            success: onSuccess,
                            cancel: onFail
                        });

                        wx.onMenuShareAppMessage({
                            title: title, // 分享标题
                            desc: desc, // 分享描述
                            link: link,
                            imgUrl: imgUrl, // 分享图标
                            success: onSuccess,
                            cancel: onFail
                        });
                    });
                }
            },
            error: function () {

            }
        });
    }
};
