function genericOnClick(info, tab) {
	//alert(info.linkUrl);
	chrome.tabs.create({
		url: info.linkUrl
	});
}

//当未选中时再修改为选中菜单
function selectionOnUpdateClick(info, tab){
	selection = Chrome.contextMenus.update({
		"type": "checkbox",
		"checked": false,
		"title": "百度一下",
		"contexts": ["selection"],
		"onclick": selectionOnClick
	});
}

//点击之后再修改为未选中菜单
function selectionOnClick(info, tab) {
	//alert(info.selectionText);
	//	chrome.tabs.create({
	//		url: "https://www.baidu.com/s?wd=" + info.selectionText
	//	});

	selection = Chrome.contextMenus.update({
		"type": "checkbox",
		"checked": false,
		"title": "百度一下",
		"contexts": ["selection"],
		"onclick": selectionOnUpdateClick
	});
}
var link = chrome.contextMenus.create({
	"title": "在新窗口打开链接地址",
	"contexts": ["link","image"],
	"onclick": genericOnClick
});


//contexts:["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]
//第一次选中
var selection = chrome.contextMenus.create({
	"type": "checkbox",
	"checked": true,
	"title": "百度一下",
	"contexts": ["selection"],
	"onclick": selectionOnClick
});