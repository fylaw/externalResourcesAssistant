var resources;

$(document).ready(function(e) {
	resources = localStorage.getItem("resources") || "[]";
	resources = JSON.parse(resources);
	
	$("#btnAdd").click(function(e) {
        addResource();
    });
	
	for(var p in resources) {
		showResource(resources[p]);
	}
});

function addResource() {
	
	var tid = format(new Date());
	var res = {
		id:tid,
		type:$("#resourcetype").val(),
		name:$("#resourcename").val(),
		url:$("#resourcelocation").val()
	};
	
	showResource(res);
	
	resources.push(res);
	localStorage.setItem("resources", JSON.stringify(resources));
	
	$("#form")[0].reset();
}

function format(d) {
	var z = {
		M:d.getMonth()+1,
		d:d.getDate(),
		h:d.getHours(),
		m:d.getMinutes(),
		s:d.getSeconds()
	};
	
	for(var i in z) {
		if(z[i].length == 1) z[i] = '0' + z[i];
	}
	
	return d.getFullYear() + '' + z['M'] + z['d'] + z['h'] + z['m'] + z['s'];
}

function showResource(res) {
	var table = $("#rList");
	var newRow = $("<tr></tr>");
	
	$("<td></td>").appendTo(newRow);
	$("<td></td>").text(res['type']).appendTo(newRow);
	$("<td></td>").text(res['name']).appendTo(newRow);
	$("<td></td>").text(res['url']).appendTo(newRow);
	
	var op = $("<a href='javascript:void(0)'>delete</a>");
	op.click(function(e) {removeResource();});;
	$("<td></td>").append(op).appendTo(newRow);
	
	newRow.attr("rid",res['id']).appendTo(table);
}

function removeResource() {
	var row = event.target.parentNode.parentNode;
	var rid = $(row).attr("rid");
	
	for(var i in resources) {
		if(resources[i]['id'] == rid) {
			resources.splice(i,1);
			localStorage.setItem("resources", JSON.stringify(resources));
			break;
		}
	}	
		
	$(row).remove();
}