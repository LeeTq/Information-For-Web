$(function() {

	// 获取参数
	var imgSlider = $('.imageSlider'),                                         // 图片轮换容器
		imageBox = imgSlider.children(".imageBox"),                            // 图片容器
		titleBox = imgSlider.children(".titleBox"),                            // 标题容器
		titleArr = titleBox.children('p'),                                     // 所有标题（数组）
		icoBox = imgSlider.children(".icoBox"),                                // 图标容器
		icoArr = icoBox.children('span'),                                      // 所有图标（数组）
		imageWidth = imgSlider.width(),                                        // 图片宽度
		imageNum = imageBox.children('a').length,                              // 图片数量
		imageReelWidth = imageWidth * imageNum,                                // 图片容器宽度
		activeID = parseInt(icoBox.children(".active").attr("rel")),           // 当前图片ID
		nextID = 0,                                                            // 下张图片ID
		setIntervalID,                                                         // setInterval() 函数ID
		intervalTime = 4000,                                                   // 间隔时间
		imageSpeed = 500,                                                      // 图片动画执行速度
		titleSpeed = 250;                                                      // 标题动画执行速度
		
	// 设置 图片容器 的宽度
	imageBox.css({ 'width' : imageReelWidth + "px" });
	
	// 图片轮换函数
	// 传入的参数是点击的图片id
	var rotate = function(clickID) {
		// 判断是否点击了图片id（即是否点击了轮播右下方的小圆点）
		// nextID 是下张需要显示的图片id
		if (clickID) {
			nextID = clickID;
		} else {
			// 自动轮播的情况下
			// 判断是否为最后一张图片
			// 是则切换到第一张
			nextID = activeID <= imageNum - 1 ? activeID + 1 : 1;
		}
		
		// 切换 active 的小圆点
		// 把当前 active 的小圆点置为默认样式
		// 把下一个需要显示为红色的小圆点添加 active 这个 class
		$(icoArr[activeID - 1]).removeClass("active");
		$(icoArr[nextID - 1]).addClass("active");
		
		// 切换图片标题
		// 使用 jQuery 的 animate 方法实现动画效果
		$(titleArr[activeID-1]).animate(
			{ bottom: "-40px" },
			titleSpeed,
			function() {
				$(titleArr[nextID - 1]).animate({ bottom: "0px" } , titleSpeed);
			}
		);
		
		// 切换图片
		imageBox.animate({ left: "-" + (nextID - 1) * imageWidth + "px"} , imageSpeed);
		
		// 切换当前图片 id
		activeID = nextID;
	};
	
	// 启动图片自动轮播
	setIntervalID = setInterval(rotate, intervalTime);

	// 鼠标移动到图片上时停止图片切换
	// 鼠标移开后继续切换
	imageBox.hover(function() {
		// 停止自动切换
		clearInterval(setIntervalID);
	}, function() {
		// 启动自动切换
		setIntervalID = setInterval(rotate, intervalTime);
	});

	// 点击右下方小圆点切换图片
	icoArr.on('click', function() {
		// 停止自动切换
		clearInterval(setIntervalID);
		
		var clickID = parseInt($(this).attr("rel"));
		rotate(clickID);
		
		// 启动自动切换
		setIntervalID = setInterval(rotate, intervalTime);
	});
});
