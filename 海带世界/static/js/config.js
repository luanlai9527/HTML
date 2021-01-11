// 配置require基础参数
requirejs.config({
    urlArgs: "r=v.1.2", // 版本號：修復瀏覽器緩存問題
    baseUrl: '/static/js', // 基础目录
    waitSeconds: 0,
    shim: { // 插件依賴：插件-要依賴插件
        'jquery.lazyLoad': ['jquery'],
        'jquery.cookie': ['jquery'],
        'jquery.md5': ['jquery'],
        'jquery.page': ['jquery'],
        'datepicker': ['jquery'],
        'datepicker.zh-CN': ['jquery', 'datepicker'],
        'TWselectAddress': ['jquery', 'TWaddress'],
    },
    paths: { // 基础库和基础组件"key--path"映射
        'jquery': 'lib/jquery',
        'jquery.lazyLoad': 'lib/jquery.lazyload.min',
        'jquery.cookie': 'lib/jquery.cookie',
        'jquery.md5': 'lib/jquery.md5',
        'clipboard.min': 'lib/clipboard.min',
        'swiper.min': 'lib/swiper.min',
        'jquery.page': 'lib/jquery.page',
        'datepicker': 'lib/datepicker',
        'datepicker.zh-CN': 'lib/datepicker.zh-CN',
        'utiljs': 'lib/util',
        'TWaddress': 'lib/TWaddress',
        'TWselectAddress': 'lib/TWselectAddress',
    }
});

// 包装require加载模块函数
window._load = function (modules, callback) {
    // 基础库和基础组件（有输出模块）
    var lib = ['jquery', 'utiljs'];

    // 页面添加自定义组件或者别的组件
    for (var i = 0; i < modules.length; i++) {
        lib.push(modules[i]);
    }

    // 无输出模块
    var noReturn = ['jquery.lazyLoad', 'jquery.cookie'];
    for (var i = 0; i < noReturn.length; i++) {
        lib.push(noReturn[i]);
    }

    require(lib, callback);
}