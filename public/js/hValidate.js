/*    表单验证方法开始       */
function formValidate(formId,url,fn,beFn,list){
	var form = $("#"+formId);
	var InputList = [];	//表单里需要验证的文本框
	var len = list ? list.length : 0;
	for(var i = 0 ; i < len; i++){
		InputList.push(new InputBox(list[i]));
	}
	form.unbind('submit');
	form.bind('submit',function(){
		this.stop = false;
		for(var i = 0 ; i < len; i++){//表单里需要验证的文本框是否通过验证
			if(InputList[i](true) == false){
				return false;
			}
		}
		//提交前事件
		if(beFn){beFn(this);}
		if(this.stop){return false;}
		$.ajax({
			url:url,
			type:"POST",
			data:form.serialize(),
			success:function(k){
				//提交后事件
				if(fn){fn(k);}
			}
		});
		return false;
	});
	function InputBox(args){
		var input = $("#"+args.inputId),	//输入框
			output = $("#"+args.outputId),	//提示容器
			pattern = new RegExp(args.pattern),	//正则表达式
			showMsg = args.showMsg,			//提示信息
			input2;
		if(args.input2Id){
			input2 = $("#"+args.input2Id);
		}
		var goCheck = function(k){
			var flag = pattern.test(input.val());	//验证结果
			if(input2 && !flag){
				flag = pattern.test(input.val());
			}
			if(output && showMsg){
				if(flag){
					output.html(showMsg.success);
				}else{
					if(k){
					input.focus();
					}
					output.html(showMsg.error);
				}
			}
			//ajax验证（信息是否已被占用
			if(args.ajax){
				$.ajax({
					url:ajax.url,
					dataType:"html",
					async:false,
					data:arg+"="+input.val(),
					success:function(data){
						if(output){
							output.html(data);
						}else{
							output.html(data);
						}
						flag = data.isOk;
					}
				});
			}
			return flag;
		}
		//失去焦点事件，即时验证
		input.blur(function(){
			if(args.delay){
				setTimeout(function(){
					goCheck();
				},200);
			}else{
				goCheck();
			}
		});
		return goCheck;
	}
}
/*    表单验证方法结束      */


/* 常用正则表达式 */
var regCommon = {
	email:/\w+([-+.]\w+)*@\w+([-.]\w+)*.\w+([-.]\w+)*/,//邮箱
	userName:/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,//用户名 4～15位
	qq:/^\s*$|[1-9][0-9]{4,}/,//QQ，可以为空
	notNullQQ:/[1-9][0-9]{4,}/,//QQ
	post:/[1-9]d{5}(?!\d)/,//邮编
	phone:/(\d{3}-\d{8}|\d{4}-\d{7})|(^((\+86)|(86)|\(86\)|(\+86\)))?((1[3|4|5|8])\d{9}$))/,//手机，电话
	idCard:/\d{15}|\d{18}|\d{17}[xX]/,//身份证
	url:/(^\s*$)|(^http:\/\/([\w-]+.)+[\w-]+(\/[\w-.\/?%&=]*)?$)|(^([\w-]+.)+[\w-]+(\/[\w-.\/?%&=]*)?$)/,//URL，可以为空
	notNullUrl:/^(http:\/\/){0,1}([\w-]+.)+[\w-]+(\/[\w-.\/?%&=]*)?$/,//URL
	notNull:/\S/,//不可为空
	date:/^\s*\d{4}[-]\d{1,2}-\d{1,2}\s*$|^\s*\d{4}[-]\d{1,2}\s*$/,//日期 YYYY-MM-DD 或 YYYY-MM
	number:/^\d+([.]{1}\d+){0,1}$/,//数字
	baseNumber:/^[1-9][0-9]*$/,//整数
	baseNumber10:/^[1-9][0-9]{1,9}$/,//整数
	str12:/^\S{1,12}$/,//1～12个字符
	str50:/^\S{1,50}$/
}
/* 常用正则表达式 结束*/