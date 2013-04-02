// JavaScript Document

// 动态加载脚本
 function loadScript(url, callback){
	//var scripts = document.getElementsByTagName("script");
	// TODO:判断页面中是否已经包含这个脚本了
	   
    var script = document.createElement("script");
    script.type = "text/javascript";
	if(callback) {
		if (script.readyState){  //IE  
			script.onreadystatechange = function(){  
				if (script.readyState == "loaded" ||  
						script.readyState == "complete"){  
					script.onreadystatechange = null;  
					callback();  
				}  
			};  
		} else {  //Others  
			script.onload = function(){  
				callback();  
			};  
		}  
	}
    script.src = url;  
    document.getElementsByTagName("head")[0].appendChild(script);  
}

// 动态加载样式表
 function loadCSS(url, callback){
	//var scripts = document.getElementsByTagName("script");
	// TODO:判断页面中是否已经有这个样式了
	   
    var link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	if(callback) {
		if (link.readyState){  //IE  
			link.onreadystatechange = function(){  
				if (link.readyState == "loaded" ||  
						link.readyState == "complete"){  
					link.onreadystatechange = null;  
					callback();  
				}  
			};  
		} else {  //Others  
			link.onload = function(){  
				callback();  
			};  
		}  
	}
    link.href = url;  
    document.getElementsByTagName("head")[0].appendChild(link);  
}