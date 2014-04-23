//消息提示框
function msgBox(str,fn){
	var boxId = "boxId"+parseInt(Math.random()*999999);
    var msgBox = $('<div class="popBox popTipsBox"><h4 class="popTitle">提示</h4><div class="popMain"><p class="popTips">'+str+'</p><div class="popOpt"><a href="javascript:void(0);"class="btn cancel" id="'+boxId+'">确定</a></div></div></div>');
    $("body").append(msgBox);
    $("#"+boxId).click(function(){
    	if(fn){
    		fn();
    	}
        msgBox.fadeOut(200);
        setTimeout(function(){
    		if(msgBox){
    			msgBox.remove();
    		}
        },3000);
        return false;
    });
    msgBox.fadeIn(200);
    
}

function promptBox(str,fn){
	var boxId = "boxId"+parseInt(Math.random()*999999);
	var cancelId = "cancelId"+parseInt(Math.random()*999999);
    var msgBox = $('<div class="popBox popTipsBox"><h4 class="popTitle">提示</h4><div class="popMain"><p class="popTips">'+str+'</p><div class="popOpt"><a href="javascript:void(0);"class="btn cancel" id="'+boxId+'">确定</a><a href="javascript:void(0);"class="btn cancel" id="'+cancelId+'">取消</a></div></div></div>');
    $("body").append(msgBox);
//    确定返回true
    $("#"+boxId).click(function(){
    	if(fn){
    		fn(true);
    	}
        msgBox.fadeOut(200);
	    setTimeout(function(){
			if(msgBox){
				msgBox.remove();
			}
	    },3000);
        return true;
    });
//    取消返回false
    $("#"+cancelId).click(function(){
    	if(fn){
    		fn(false);
    	}
        msgBox.fadeOut(200);
	    setTimeout(function(){
			if(msgBox){
				msgBox.remove();
			}
	    },3000);
        return false;
    });
    msgBox.fadeIn(200);
}
