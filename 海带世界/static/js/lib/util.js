define(['jquery'], function($) {
    "use strict";
    var _public = {};

    // ajax加载数据动画
    _public._loading = (function(){
    	var _loading = {};
    	var loadingDom = null;

    	_loading.show = function(txt){
    		var loadingStr = '';

    		loadingStr += '<div class="htt-loading-mask">';
			loadingStr += '	<div class="htt-loading-spinner">';
			loadingStr += '	  <svg viewBox="25 25 50 50" class="circular">';
			loadingStr += '		<circle cx="50" cy="50" r="20" fill="none" class="path"></circle>';
			loadingStr += '	  </svg>';
            loadingStr += '   <div class="htt-loading-text">' + (txt?txt:'加载中') + '</div>'
			loadingStr += '	</div>';
			loadingStr += '</div>';

			loadingDom = $(loadingStr);
			$('body').append(loadingDom);
            // $('body').css({'overflow': 'hidden'});
    	}

    	_loading.hide = function(){
            // $('body').css({'overflow': 'auto'});
    		loadingDom.remove();
    		loadingDom = null;
    	}

    	return _loading;
    })();

    // alert提示信息
    _public._alert = function(options){
    	var _alertDom = null;
    	var defaultOption = {
    		msg: '',
    		type: 'info', // success/warning/info/error
    		duration: 3000, // 默认3000秒
    		callback: function(){},  // 回调函数
    	};

    	$.extend(defaultOption, options); // 合并参数

    	render();
    	close();

    	// 渲染
    	function render(){
    		var alertStr = '';
    		var alertIcon = '';
    		var aType = defaultOption.type;
    		var aMsg = defaultOption.msg;

    		if(aType === 'info'){
    			alertIcon = 'information-circle';
    		} else if (aType === 'success'){
    			alertIcon = 'checkmark-circle';
    		} else if (aType === 'error'){
    			alertIcon = 'close-circle';
    		} else if (aType === 'warning'){
    			alertIcon = 'information-circle';
    		} else {}

			alertStr +=  '<div class="htt-message htt-message--' + aType + '">';
			alertStr +=  '	<i class="ion-md-' + alertIcon + ' htt-message__icon htt-icon-' + aType + '"></i>';
			alertStr +=  '	<span class="htt-message__content">' + aMsg + '</span>';
			alertStr +=  '</div>';

			_alertDom = $(alertStr);

			$('body').append(_alertDom);

			// 动画显示
			_alertDom.animate(
				{
					top: '20px',
					opacity: '1',
				},
				'slow',
				function(){}
			);
    	}

    	// 关闭
    	function close(){
    		var aCallback = defaultOption.callback;
    		setTimeout(function(){
    			_alertDom.animate(
    				{
						top: '-100px',
						opacity: '0',
					},
					'slow',
					function(){
						_alertDom.remove();
    					_alertDom = null;
    					aCallback();
					}
				);
    		}, defaultOption.duration);
    	}

    };

    // alert提示信息-簡潔版
    _public._alertSimple = function (msg, type) {
        _public._alert({
            msg: msg,
            type: type
        });
    }
    // message 提示框
    _public._message = function(options){
    	var defaultOption = {
    		title: '',
    		msg: '',
    		type: 'info', // prompt info confirm
    		isShowCancel: true,
    		cancelTxt: '取消',
    		sureTxt: '確定',
    		callback: function(){},  // 回调函数
    	};
    	var _messageDom = null;

    	$.extend(defaultOption, options); // 合并参数

    	render();
    	bindEvent();

    	// 渲染
    	function render(){
    		var _messageStr = '';
    		var mType = defaultOption.type;
    		var cancelTxt = defaultOption.cancelTxt;
    		var sureTxt = defaultOption.sureTxt;
    		var msgTxt = defaultOption.msg;
    		var titleTxt = defaultOption.title;
    		var isShowCancel = defaultOption.isShowCancel;

    		_messageStr += '<div class="htt-message-box__wrapper">';
			_messageStr += '	<div class="htt-message-box">';
			_messageStr += '		<div class="htt-message-box__header">';
			_messageStr += '    		<div class="htt-message-box__title">';
			_messageStr += '    			<span>' + titleTxt + '</span>';
			_messageStr += '			</div>';
			_messageStr += '			<button type="button" class="htt-message-box__headerbtn htt-close-btn">';
			_messageStr += '				<i class="ion-md-close htt-message-box__close"></i>';
			_messageStr += '			</button>';
			_messageStr += '		</div>';
			_messageStr += '		<div class="htt-message-box__content">';
			_messageStr += '			<div class="htt-message-box__message">';
			_messageStr += '				<p>' + msgTxt + '</p>';
			_messageStr += '			</div>';
			_messageStr += '			<div class="htt-message-box__input" style="display:' + (mType=='prompt'?'':'none') + '">';
			_messageStr += '				<div >';
			_messageStr += '					<input type="text" autocomplete="off" placeholder="" class="htt-input__inner">';
			_messageStr += '				</div>';
			_messageStr += '			</div>';
			_messageStr += '		</div>';
			_messageStr += '		<div class="htt-message-box__btns">';
			_messageStr += '			<button type="button" class="htt-button htt-button--default htt-button--small htt-cancel-btn" style="display:' + (isShowCancel?'':'none') + '">';
			_messageStr += '				<span>' + cancelTxt + '</span>';
			_messageStr += '			</button>';
			_messageStr += '			<button type="button" class="htt-button htt-button--default htt-button--small htt-button--primary htt-sure-btn">';
			_messageStr += '				<span>' + sureTxt + '</span>';
			_messageStr += '			</button>';
			_messageStr += '		</div>';
			_messageStr += '	</div>';
			_messageStr += '    <div class="mask"></div>';
			_messageStr += '</div>';

			_messageDom = $(_messageStr);
			$('body').append(_messageDom);

			// 动画显示
			_messageDom.find('.htt-message-box').animate(
				{
					marginTop: '0',
					opacity: '1',
				},
				function(){}
			);
    	}

    	// 绑定事件
    	function bindEvent(){
    		// 点击关闭按钮
    		_messageDom.find('.htt-close-btn').on('click', function(event){
    			close(true);
    		});

    		// 点击关闭
    		_messageDom.find('.htt-cancel-btn').on('click', function(event){
    			close(true);
    		});

    		// 点击确定按钮
    		_messageDom.find('.htt-sure-btn').on('click', function (event) {
    		    var mType = defaultOption.type;
    		    if (mType == 'prompt' && !_messageDom.find('input').val()) {
    		        _public._alert({
    		            msg: '不能為空！',
    		            type: 'warning',
    		            callback: function () {
    		                _dialogDom.find('input').focus();
    		            }
    		        });

    		        return;
    		    }
    			close();
    		});
    	}

    	// 关闭
    	function close(flag){
    		var mCallback = defaultOption.callback;
    		// 动画显示
			_messageDom.find('.htt-message-box').animate(
				{
					marginTop: '-150px',
					opacity: '0',
				},
				function(){
					// 点击确认按钮
					if(!flag){
						mCallback(_messageDom);
					}

					_messageDom.remove();
	    			_messageDom = null;
				}
			);
    	}
    }

    // dialog 对话框
    _public._dialog = function(options){
    	var defaultOption = {
    		title: '',
    		msg: '',
    		width: '50%',
    		isShowCancel: true,
    		cancelTxt: '取消',
    		sureTxt: '確定',
    		callback: function(){},  // 回调函数
    	};
    	var _dialogDom = null;

    	$.extend(defaultOption, options); // 合并参数

    	render();
    	bindEvent();

    	// 渲染
    	function render(){
    		var _dialogStr = '';
    		var cancelTxt = defaultOption.cancelTxt;
    		var sureTxt = defaultOption.sureTxt;
    		var msgTxt = defaultOption.msg;
    		var titleTxt = defaultOption.title;
    		var isShowCancel = defaultOption.isShowCancel;
    		var widthTxt = defaultOption.width;

    		_dialogStr  +=  '<div class="htt-dialog__wrapper">';
			_dialogStr  +=  '  <div style="height:100%;overflow:auto;position:relative;z-index:2;">';
			_dialogStr  +=  '	<div class="htt-dialog" style="width:' + widthTxt + '">';
			_dialogStr  +=  '		<div class="htt-dialog__header">';
			_dialogStr += '			<span class="htt-dialog__title">' + titleTxt + '</span>';
			_dialogStr  +=  '			<button type="button"  class="htt-dialog__headerbtn htt-close-btn">';
			_dialogStr  +=  '				<i class="ion-md-close htt-dialog__close"></i>';
			_dialogStr  +=  '			</button>';
			_dialogStr  +=  '		</div>';
			_dialogStr  +=  '		<div class="htt-dialog__body">';
			_dialogStr += '			<span style="display:block;height:1200px;">' + msgTxt + '</span>';
			_dialogStr  +=  '		</div>';
			_dialogStr  +=  '		<div class="htt-dialog__footer">';
			_dialogStr  +=  '			<span class="dialog-footer">';
			_dialogStr  +=  '				<button type="button" class="htt-button htt-button--default htt-cancel-btn">';
			_dialogStr  +=  '					<span>取 消</span>';
			_dialogStr  +=  '				</button>';
			_dialogStr  +=  '				<button type="button" class="htt-button htt-button--primary htt-sure-btn">';
			_dialogStr  +=  '					<span>确 定</span>';
			_dialogStr  +=  '				</button>';
			_dialogStr  +=  '			</span>';
			_dialogStr  +=  '		</div>';
			_dialogStr  +=  '	</div>';
			_dialogStr  +=  '  </div>';
			_dialogStr  +=  '   <div class="mask"></div>';
			_dialogStr  +=  '</div>';

			_dialogDom = $(_dialogStr);
			$('body').append(_dialogDom);

			// 动画显示
			_dialogDom.find('.htt-dialog').animate(
				{
					marginTop: '15vh',
					opacity: '1',
				},
				function(){}
			);
    	}

    	// 绑定事件
    	function bindEvent(){
    		// 点击关闭按钮
    		_dialogDom.find('.htt-close-btn').on('click', function(event){
    			close(true);
    		});

    		// 点击关闭
    		_dialogDom.find('.htt-cancel-btn').on('click', function(event){
    			close(true);
    		});

    		// 点击确定按钮
    		_dialogDom.find('.htt-sure-btn').on('click', function(event){
    			close();
    		});
    	}

    	// 关闭
    	function close(flag){
    		var dCallback = defaultOption.callback;
    		// 动画显示
			_dialogDom.find('.htt-dialog').animate(
				{
					marginTop: '-150px',
					opacity: '0',
				},
				function(){
					// 点击确认按钮
					if(!flag){
						mCallback(_dialogDom);
					}

					_dialogDom.remove();
	    			_dialogDom = null;
				}
			);
    	}
    }

    // 移動判斷 return 1 為PC  0 為移動端
    _public.isPc = function() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        var isPc = true;

        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            isPc = false;
        }

        return isPc;
    }


    // ajax包裝
    _public._ajaxFn = function (options) {
        var defaultOption = {
            isShowLoading: true, // 是否顯示加載動畫 默認顯示
            url: '',
            type: 'POST',
            data: '',
            async: true,
            dataType: 'json',
            success: function () {
                // 成功回調
            },
            complete: function () {
                // 完成回調
            }
        };

        $.extend(defaultOption, options); // 合并参数

        // ajax動畫隱藏
        if (defaultOption.isShowLoading) {
            _public._loading.show();
        }

        $.ajax({
            url: defaultOption.url,
            type: defaultOption.type,
            async: defaultOption.async,
            data: defaultOption.data,
            dataType: 'json',
            error: function () {
                _public._alert({
                    msg: '親，提交出錯了，請稍後再試！',
                    type: 'error', // success/warning/info/error 默認 info
                });
            },
            success: function (data) {
                defaultOption.success(data);
            },
            complete: function () {
                // ajax動畫隱藏
                if (defaultOption.isShowLoading) {
                    _public._loading.hide();
                }

                // 完成回調
                defaultOption.complete();
            }
        });
    }

    // 获取指定的URL参数值
    _public.getParam = function (paramName) {
        var paramValue = "",
            isFound = !1,
            arrSource = null,
            i = 0;

        if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
            arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&");
            while ( i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue == "" && (paramValue = null), paramValue
    }

    _public.calc = {
        /*
        函数，加法函数，用来得到精确的加法结果  
        说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
        参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
        调用：Calc.Add(arg1,arg2,d)  
        返回值：两数相加的结果
        */
        Add: function (arg1, arg2) {
            arg1 = arg1.toString(), arg2 = arg2.toString();
            var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "", d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
            var maxLen = Math.max(d1.length, d2.length);
            var m = Math.pow(10, maxLen);
            var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
            var d = arguments[2];
            return typeof d === "number" ? Number((result).toFixed(d)) : result;
        },
        /*
        函数：减法函数，用来得到精确的减法结果  
        说明：函数返回较为精确的减法结果。 
        参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
        调用：Calc.Sub(arg1,arg2)  
        返回值：两数相减的结果
        */
        Sub: function (arg1, arg2) {
            return _public.calc.Add(arg1, -Number(arg2), arguments[2]);
        },
        /*
        函数：乘法函数，用来得到精确的乘法结果  
        说明：函数返回较为精确的乘法结果。 
        参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
        调用：Calc.Mul(arg1,arg2)  
        返回值：两数相乘的结果
        */
        Mul: function (arg1, arg2) {
            var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
            m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
            resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
        },
        /*
        函数：除法函数，用来得到精确的除法结果  
        说明：函数返回较为精确的除法结果。 
        参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
        调用：Calc.Div(arg1,arg2)  
        返回值：arg1除于arg2的结果
        */
        Div: function (arg1, arg2) {
            var r1 = arg1.toString(), r2 = arg2.toString(), m, resultVal, d = arguments[2];
            m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
            resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
            return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
        }
    };

    // 设置缓存信息到localStarage
    // mins 时间长度，单位为分钟
    _public.localStorage = {
        set: function (key, data, mins) {
            var date = new Date();
            var now = date.getTime();
            var expireDate = now + 1 * 24 * 60 * 1000;
            var jsonData = {};

            if (mins) {
                mins = now + (mins * 60 * 1000);
            }

            jsonData.data = data;
            jsonData.expireDate = expireDate;

            localStorage.setItem(key, JSON.stringify(jsonData));
        },
        get: function (key) {
            var jsonData = localStorage.getItem(key);
            var data = null;

            if (jsonData) {
                var date = new Date();
                var now = date.getTime();
                jsonData = JSON.parse(jsonData);

                // 判断是否过期
                if (now < jsonData.expireDate) {
                    data = jsonData.data;
                } else {
                    // 过期清空缓存数据
                    localStorage.removeItem(key);
                }
            }

            return data;
        },
        clear: function (key) {
            localStorage.removeItem(key);
        }
    };

    return _public;
});