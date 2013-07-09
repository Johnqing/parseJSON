(function(window){
  window.JSON = window.JSON || {};
	// JSON RegExp
	var rvalidchars = /^[\],:{}\s]*$/,
		rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
		rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
		rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
		Apply = Object.prototype.toString.apply,
		trim = function(str){
			return str.replace(/(^\s*)|(\s*$)/g, "");
		}
	/**
	 * 字符串解析为JSON
	 * @param {String} data sJSON字符串
	 * @return {Object} JSON 对象
	 */
	window.JSON.parse = window.JSON.parse ? (return window.JSON.parse(data)) : function(data){

		if (data === null) {
			return data;
		}

		if (typeof data === "string") {
		//ie左右有空格会解析失败
			data = trim(data);
			if (data) {
				if (rvalidchars.test( data.replace( rvalidescape, "@" )
				.replace( rvalidtokens, "]" )
				.replace( rvalidbraces, "")) ) {
					return ( new Function( "return " + data ) )();
				}
			}
		}
		throw new Error( "Invalid JSON: " + data );
	};
	/**
	 * [ description]
	 * @param  {Object} data JSON对象
	 * @return {String} JSON字符串
	 */
	window.JSON.stringify = window.JSON.stringify ? (return window.JSON.stringify(data)) : function(data){
		var tArr = [];
		//数组使用递归
		if(Apply(data) === "[object Array]"){
			for (var i = 0; i < data.length; i++) {
				tArr.push(JSON.stringify(data[i]));
			};
			return "[" + tArr.join(',') + "]";
		}
		//日期直接返回时间戳
		if (Apply(data) === "[object Date]") {
			return "new Date("+ data.getTime() +")";
		};
		//正则或函数直接使用toString
		if (Apply(data) === "[object RegExp]" || Apply(data) === "[object Function]") {
			return data.toString();
		};
		//对象使用for in递归
		if (Apply(data) === "[object Object]") {
			for(var i in data){
				if (typeof data[i] === "string") {
					data[i] = "'" + data[i] + "'";
				}else{
					if(typeof data[i] === "object"){
						data[i] = JSON.stringify(data[i]);
					}else{
						data[i] = "'" + data[i] + "'";
					}
				}
				tArr.push(i + ": " + data[i]);
			}
			return "{" + tArr.join(",") + "}";			
		};
	}
}(this));
