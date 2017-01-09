//插件打开的时候
//当browser action 图标被点击的时候触发，当browser action是一个popup的时候，这个事件将不会被触发。
//chrome.browserAction.onClicked.addListener(function(Tab tab) {
//	alert("打开插件");
//		chrome.tabs.executeScript({
//			code: 'document.body.style.backgroundColor="green"'
//		});
//});

//打开popup完成事件
document.addEventListener('DOMContentLoaded', function() {
	//获取按钮
	var checkPageButton = document.getElementById('btn_Check');
	//按钮事件
	checkPageButton.addEventListener('click', function() {
		//当前的窗口执行脚本
		chrome.tabs.executeScript(null, {
			code: "document.body.style.backgroundColor='green'"
		});

		//当前的窗口创建一个窗口
		chrome.tabs.getSelected(null, function(tab) {
			d = document;
			var f = d.createElement('form');
			f.action = 'http://gtmetrix.com/analyze.html?bm';
			f.method = 'post';
			var i = d.createElement('input');
			i.type = 'hidden';
			i.name = 'url';
			i.value = tab.url;
			f.appendChild(i);
			d.body.appendChild(f);
			f.submit();
		});

		//创建通知
		//		var notification = webkitNotifications.createNotification(
		//			'icon-48.png', // icon url - can be relative
		//			'Hello!', // notification title
		//			'Lorem ipsum...' // notification body text
		//		);
		//		notification.show();

		//		var notification = webkitNotifications.createHTMLNotification(
		//			'popup.html' // html url - can be relative
		//		);

		//当前的插件窗口关闭
		//window.close();
	}, false);

	//查询多个元素
	//	var divs = document.querySelectorAll('div');
	//	for(var i = 0; i < divs.length; i++) {
	//		divs[i].addEventListener('click', click);
	//	}
});

function show() {
	var time = /(..)(:..)/.exec(new Date()); // The prettyprinted time.
	var hour = time[1] % 12 || 12; // The prettyprinted hour.
	var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
	new Notification(hour + time[2] + ' ' + period, {
		icon: 'access-time-48.png',
		body: '蔓曼家居'
	});
}

// Conditionally initialize the options.
if(!localStorage.isInitialized) {
	localStorage.isActivated = true; // The display activation.
	localStorage.frequency = 1; // The display frequency, in minutes.
	localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if(window.Notification) {
	// While activated, show notifications at the display frequency.
	if(JSON.parse(localStorage.isActivated)) {
		show();
	}

	var interval = 0; // The display interval, in minutes.

	setInterval(function() {
		interval++;

		if(
			JSON.parse(localStorage.isActivated) &&
			localStorage.frequency <= interval
		) {
			show();
			interval = 0;
		}
	}, 60000);
}