define(['jquery', 'TWaddress'], function ($, _TWaddress) {
    "use strict";

    // 构造函数
    function SelectAddress(city, area) {
        this.city = $(city);
        this.area = $(area);

        this.init();
        this.bindEvent();
    }

    // 初始化 city:市县 为元素标记，即id、class  area：区 为元素标记，即id、class
    SelectAddress.prototype.init = function (cityIndex, areaIndex) {
        // 選擇市縣
        var len = _TWaddress.length;
        var cityStr = '<option value="-1">請選擇縣市</option>';
        for (var i = 0; i < len; i++) {
            var cityItemStr = '';
            if (cityIndex == i) {
                cityItemStr += '<option value="' + _TWaddress[i].value + '" selected data-index=' + i + '>' + _TWaddress[i].value + '</option>';
            } else {
                cityItemStr += '<option value="' + _TWaddress[i].value + '" data-index=' + i + '>' + _TWaddress[i].value + '</option>';
            }

            cityStr += cityItemStr;
        }
        this.city.html(cityStr);

        this.renderArea(cityIndex, areaIndex);
    }

    // 添加选择市事件
    SelectAddress.prototype.bindEvent = function () {
        var that = this;

        this.city.on('change', function () {
            var index = $(this).find('option:selected').data('index');
            that.renderArea(index, -1);
        });
    }

    // 重置选项  cityIndex 设置市序  areaIndex 设置区序
    SelectAddress.prototype.set = function (cityIndex, areaIndex) {
        this.city.find('option').eq(cityIndex + 1).prop('selected', true);
        this.renderArea(cityIndex, areaIndex);
    }

    SelectAddress.prototype.renderArea = function (cityIndex,areaIndex) {
        // 選擇區
        var areaStr = '<option value="-1">請選擇區</option>';
        if ((cityIndex && cityIndex != -1) || cityIndex == 0) {
            var areaArr = _TWaddress[cityIndex].children;
            var lenz = areaArr.length;
            for (var z = 0; z < lenz; z++) {
                var areaItemStr = '';
                if (areaIndex == z) {
                    areaItemStr += '<option value="' + areaArr[z].value + '" selected data-index=' + z + '>' + areaArr[z].value + '</option>';
                } else {
                    areaItemStr += '<option value="' + areaArr[z].value + '"data-index=' + z + '>' + areaArr[z].value + '</option>';
                }

                areaStr += areaItemStr;
            }
        }
        this.area.html(areaStr);
    }

    return SelectAddress;
});