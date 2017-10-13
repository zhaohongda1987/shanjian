// create an array with nodes
var nodes = new vis.DataSet([ {
	id : 1,
	label : 'J162325',
	title : 'J162325'
}, {
	id : 2,
	label : 'J162322',
	title : 'J162322'
}, {
	id : 3,
	label : 'J162321',
	title : 'J162321'
}, {
	id : 4,
	label : 'J162320',
	title : 'J162320'
}, {
	id : 5,
	label : 'J162329',
	title : 'J162329'
} ]);

// create an array with edges
var edges = new vis.DataSet([ {
	from : 1,
	to : 3
}, {
	from : 1,
	to : 2
}, {
	from : 2,
	to : 4
}, {
	from : 2,
	to : 5
} ]);
// create a network
var container = document.getElementById('mynetwork');
var data = {
	nodes : nodes,
	edges : edges
};
var locales = {
	cn : {
		edit : '修改',
		del : '删除',
		back : '返回',
		addNode : '添加节点',
		addEdge : '添加连线',
		editNode : '修改节点',
		editEdge : '修改连线',
		addDescription : '节点描述',
		edgeDescription : '连线描述',
		editEdgeDescription : '修改连线描述',
		createEdgeError : '连线创建失败',
		deleteClusterError : '删除节点失败',
		editClusterError : '修改节点失败'
	}
};
var options = {
	locale : 'cn',
	locales : locales,
	interaction : {
		hover : true
	},
	manipulation : {
		enabled : true,
		addNode : function(data, callback) {
			// filling in the popup DOM elements
			document.getElementById('node-operation').innerHTML = "Add Node";
			editNode(data, clearNodePopUp, callback);
		},
		editNode : function(data, callback) {
			// filling in the popup DOM elements
			document.getElementById('node-operation').innerHTML = "Edit Node";
			editNode(data, cancelNodeEdit, callback);
		},
		addEdge : function(data, callback) {
			if (data.from == data.to) {
				var r = confirm("Do you want to connect the node to itself?");
				if (r != true) {
					callback(null);
					return;
				}
			}
			document.getElementById('edge-operation').innerHTML = "Add Edge";
			editEdgeWithoutDrag(data, callback);
		},
		editEdge : {
			editWithoutDrag : function(data, callback) {
				document.getElementById('edge-operation').innerHTML = "Edit Edge";
				editEdgeWithoutDrag(data, callback);
			}
		}
	}
};

var network = new vis.Network(container, data, options);

network.on("click", function(params) {
	params.event = "[original event]";
	document.getElementById('eventSpan').innerHTML = '<h2>Click event:</h2>'
			+ JSON.stringify(params, null, 4);
	console.log('click event, getNodeAt returns: '
			+ this.getNodeAt(params.pointer.DOM));
});
network
		.on(
				"doubleClick",
				function(params) {
					params.event = "[original event]";
					document.getElementById('eventSpan').innerHTML = '<h2>doubleClick event:</h2>'
							+ JSON.stringify(params, null, 4);
				});
network
		.on(
				"oncontext",
				function(params) {
					params.event = "[original event]";
					document.getElementById('eventSpan').innerHTML = '<h2>oncontext (right click) event:</h2>'
							+ JSON.stringify(params, null, 4);
				});
network.on("dragStart", function(params) {
	// There's no point in displaying this event on screen, it gets
	// immediately
	// overwritten
	params.event = "[original event]";
	console.log('dragStart Event:', params);
	console.log('dragStart event, getNodeAt returns: '
			+ this.getNodeAt(params.pointer.DOM));
});
network.on("dragging", function(params) {
	params.event = "[original event]";
	document.getElementById('eventSpan').innerHTML = '<h2>dragging event:</h2>'
			+ JSON.stringify(params, null, 4);
});
network.on("dragEnd", function(params) {
	params.event = "[original event]";
	document.getElementById('eventSpan').innerHTML = '<h2>dragEnd event:</h2>'
			+ JSON.stringify(params, null, 4);
	console.log('dragEnd Event:', params);
	console.log('dragEnd event, getNodeAt returns: '
			+ this.getNodeAt(params.pointer.DOM));
});
network.on("zoom", function(params) {
	document.getElementById('eventSpan').innerHTML = '<h2>zoom event:</h2>'
			+ JSON.stringify(params, null, 4);
});
network
		.on(
				"showPopup",
				function(params) {
					document.getElementById('eventSpan').innerHTML = '<h2>showPopup event: </h2>'
							+ JSON.stringify(params, null, 4);
				});
// mouse move event
// network.on("hidePopup", function() {
// console.log('hidePopup Event');
// });
network.on("select", function(params) {
	console.log('select Event:', params);
});
network.on("selectNode", function(params) {
	console.log('selectNode Event:', params);
});
network.on("selectEdge", function(params) {
	console.log('selectEdge Event:', params);
});
network.on("deselectNode", function(params) {
	console.log('deselectNode Event:', params);
});
network.on("deselectEdge", function(params) {
	console.log('deselectEdge Event:', params);
});
// mouse put on node event
// network.on("hoverNode", function(params) {
// console.log('hoverNode Event:', params);
// });
// mouse put on edge event
// network.on("hoverEdge", function(params) {
// console.log('hoverEdge Event:', params);
// });
// mouse left node event
// network.on("blurNode", function(params) {
// console.log('blurNode Event:', params);
// });
// mouse left edge event
// network.on("blurEdge", function(params) {
// console.log('blurEdge Event:', params);
// });

// edit node
function editNode(data, cancelAction, callback) {
	document.getElementById('node-name-en').value = data.nameEn;
	document.getElementById('node-name-cn').value = data.nameCn || "";
	document.getElementById('node-kb').value = data.kb || "";
	document.getElementById('node-aishen').value = data.aishen || "";
	document.getElementById('node-corp').value = data.corp || "";
	document.getElementById('node-hunter').value = data.hunter || "";

	document.getElementById('node-saveButton').onclick = saveNodeData.bind(
			this, data, callback);
	document.getElementById('node-cancelButton').onclick = cancelAction.bind(
			this, callback);
	document.getElementById('node-popUp').style.display = 'block';
}

// Callback passed as parameter is ignored
function clearNodePopUp() {
	document.getElementById('node-saveButton').onclick = null;
	document.getElementById('node-cancelButton').onclick = null;
	document.getElementById('node-popUp').style.display = 'none';
}

function cancelNodeEdit(callback) {
	clearNodePopUp();
	callback(null);
}

function saveNodeData(data, callback) {
	var nameEn = document.getElementById('node-name-en').value;
	var nameCn = document.getElementById('node-name-cn').value;
	var kb = document.getElementById('node-kb').value;
	var aishen = document.getElementById('node-aishen').value;
	var corp = document.getElementById('node-corp').value;
	var hunter = document.getElementById('node-hunter').value;
	var data = {
		nameEn : nameEn,
		nameCn : nameCn,
		kb : kb,
		aishen : aishen,
		corp : corp,
		hunter : hunter
	}
	editNodeAjax(data);
	clearNodePopUp();
	callback(data);
}

function editEdgeWithoutDrag(data, callback) {
	// filling in the popup DOM elements
	document.getElementById('edge-label').value = data.label;
	document.getElementById('edge-saveButton').onclick = saveEdgeData.bind(
			this, data, callback);
	document.getElementById('edge-cancelButton').onclick = cancelEdgeEdit.bind(
			this, callback);
	document.getElementById('edge-popUp').style.display = 'block';
}

function clearEdgePopUp() {
	document.getElementById('edge-saveButton').onclick = null;
	document.getElementById('edge-cancelButton').onclick = null;
	document.getElementById('edge-popUp').style.display = 'none';
}

function cancelEdgeEdit(callback) {
	clearEdgePopUp();
	callback(null);
}

function saveEdgeData(data, callback) {
	if (typeof data.to === 'object')
		data.to = data.to.id
	if (typeof data.from === 'object')
		data.from = data.from.id
	data.label = document.getElementById('edge-label').value;
	clearEdgePopUp();
	callback(data);
}

// node ajax
function editNodeAjax(data) {
	$.ajax({
		url : "/iplocation/markerclusterajax",
		type : "POST",
		data : JSON.stringify(data),
		dataType : 'json',
		contentType : 'application/json;charset=UTF-8',
		success : function(result) {

		}
	});
};