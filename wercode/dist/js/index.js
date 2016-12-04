/*require(["swiperAnimate"],function(swiperAnimate){

}); */
////////////////////////swiper
var mySwiper;
require(["swiper"],function(Swiper){
    mySwiper = new Swiper('.swiper-container', {
		autoplay: 5000,//可选选项，自动滑动
		initialSlide :0,//初始索引
		direction : 'horizontal',//滑动方向水平|垂直vertical
		speed:300,//滑动速度，滑动开始到结束的时间
		autoplayDisableOnInteraction : false,//手滑后自动播放不停止
		autoplayStopOnLast : false,//如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
		grabCursor : true,//设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
		parallax : true,//视差效果，随着banner滑动，而位移
		hashnav:true,//当你的swiper切换时你的页面url就会加上这个属性的值了，你也可以通过进入页面时修改页面url让swiper在初始化时切换到指定的slide。
		hashnavWatchState:true,
		setWrapperSize :true,//开启这个设定会在Wrapper上添加等于slides相加的宽高，在对flexbox布局的支持不是很好的浏览器中可能需要用到
		virtualTranslate : false,//true：Swiper不会移动
		roundLengths : true,//true将slide的宽和高取整(四舍五入)以防止某些分辨率的屏幕上文字或边界(border)模糊。
		autoHeight: true,//true时，wrapper和container会随着当前slide的高度而发生变化
		a11y: true,//无障碍阅读
		prevSlideMessage: 'Previous slide',
		nextSlideMessage: 'Next slide',
		firstSlideMessage: 'This is the first slide',
		lastSlideMessage: 'This is the last slide',
	    paginationBulletMessage:'Go to slide {{index}}',
		nextButton: '.swiper-button-next',//前进按钮
		prevButton: '.swiper-button-prev',//后退按钮
	    pagination : '.swiper-pagination',//分页
	    //pagination : '#swiper-pagination1',
	    paginationHide :false,//true隐藏分页器
	    paginationType : 'bullets',//分页器样式类型:‘bullets’  圆点（默认）‘fraction’  分式 ‘progress’  进度条‘custom’ 自定义
	    paginationClickable :true,//true时，点击分页器的指示点分页器会控制Swiper切换
	    //paginationElement : 'li',//设定分页器指示器（小点）的HTML标签。
	   /* paginationBulletRender: function (swiper, index, className) {
  return '<span class="' + className + '">' + (index + 1) + '</span>';
},*///这个参数允许完全自定义分页器的指示点。接受指示点索引和指示点类名作为参数。fraction/progress/custom也都有一个，详情见API
			//uniqueNavElements :false,//默认为true时，仅本swiper的container内的分页器有效，设置为false后，container以外的分页器也生效了。
			//scrollbar:'.swiper-scrollbar',//滚动条
			//scrollbarHide:false,//true：隐藏滚动条
			//scrollbarDraggable : true ,//为true时允许拖动滚动条。
			//scrollbarSnapOnRelease : true ,//释放滚动条自动贴合，不会半屏卡主

		effect: 'cube',//slide的切换效果，默认为"slide"（位移切换），可设置为"fade"（淡入）"cube"（方块）"coverflow"（3d流）"flip"（3d翻转）
		cube: {
		  slideShadows: true,//slideShadows：开启slide阴影。默认 true。
		  shadow: true,//shadow： 开启投影。默认 true。
		  shadowOffset: 100,//shadowOffset：投影距离。默认 20，单位px。
		  shadowScale: 0.6//shadowScale： 投影缩放比例。默认0.94。
		},


		//mousewheelControl : true,//鼠标滚轮控制
		lazyLoading : true,//true开启图片延迟加载
		lazyLoadingInPrevNext : true,//将延迟加载应用到最接近的slide的图片（前一个和后一个slide）。
		lazyLoadingInPrevNextAmount : 2,//默认为1，提前1个slide加载图片，例如切换到第三个slide时加载第四个slide里面的图片。
		loop : true,//循环
		freeMode : false
	});//mySwiper end
});//require end

///////////////////////////////iscroll
var myScroll;
require(["iscroll","jquery"],function(IScroll,$){
	myScroll = new IScroll('#iscrollWrapper',{
		scrollX: false, //不允许 左右滑动 
		//scrollbars: true,   //开启滚动条样式
		mouseWheel : true   //开启鼠标滚轮
	});

	myScroll.on("scrollStart",function(){
		//console.log("开始");
		
	});


	var n=0;
	var flag = true;
	var flagTop = true;
	(function ajaxIscroll(){
		$.ajax({
			url: '../data/iscroll.json',
			type: 'GET',
			data: {},
			dataType: 'json',
			success:function(res){
				//console.log(res);
				//console.log(res.length)
				var html = "";
				var len=2;
				for(var i=0;i<len;i++){
					if(i<res.length){
						html += '<li><img src="'+res[i].src+'"/>';
						html += '<h3>'+res[i].title+'</h3>';
						html += '<p>'+res[i].info+'</p>';
						html += '</li>';
					}else{
						html += '<li class="tips">没有更多了</li>';
					}
					
				};
				//将需要添加的元素添加到 dom 节点
				$("ul","#iscrollWrapper").append(html);

			}//callback end
		})//$.ajax end
	})();//ajaxIscroll Fn end
	myScroll.on("scrollEnd",function(){
		//将一个整数转为正数
		//当前可滑动的最大区域高度
		var maxScrollY = Math.abs(myScroll.maxScrollY);
		// 当前定位的高度（滚动条高度）
		var y = Math.abs(myScroll.y); 
		// 当前滑动的距离 （上拉Y 轴 高度）
		var distY = parseInt(Math.abs(myScroll.distY));
		

		if(y == 0 && distY > 50){
			var html = "";
			if(flagTop){
				new Array(1).fill("").forEach(function(item,i){
					html += "<li>请等待程序猿完善</li>";  
				});
				//将需要添加的元素添加到 dom 节点
				$("ul","#iscrollWrapper").prepend(html);
				flagTop = false;
			}
			
			//更新 组件，从新计算元素各项信息 比如元素高度
			myScroll.refresh();
		}
		
		//提前 100 个像素判断是否到底部
		if(maxScrollY <= y + 100){			
			if(flag){
				$.ajax({
					url: '../data/iscroll.json',
					type: 'GET',
					data: {},
					dataType: 'json',
					success:function(res){
						//console.log(res);
						//console.log(res.length)
						var html = "";
						var len=2;
						var pageNum = Math.ceil(res.length/len);
						n++;
						if(n >= pageNum-1){
							flag = false;
						}

						for(var i=n*len;i<len*(n+1);i++){
							if(i<res.length){
								html += '<li><img src="'+res[i].src+'"/>';
								html += '<h3>'+res[i].title+'</h3>';
								html += '<p>'+res[i].info+'</p>';
								html += '</li>';
							}else{
								html += '<li class="tips">没有更多了</li>';
							}
							
						};
						
						/*new Array(2).fill(res).forEach(function(item,i){
							html += '<li><img src="'+item[i].src+'"/>';
							html += '<h3>"'+item[i].title+'"</h3>';
							html += '<p>"'+item[i].info+'"</p>';
							html += '</li>';  
						});*/
						//将需要添加的元素添加到 dom 节点
						$("ul","#iscrollWrapper").append(html);

					}//callback end
				})//$.ajax end

			}//if end	
			

			//更新 组件，从新计算元素各项信息 比如元素高度
			myScroll.refresh();
			//从新定位到刷新前的位置
			myScroll.scrollTo(0,y * -1,1000);
		}
	});
});//require end
//手动定位滚动显示位置
// 第一个参数是 X 轴
// 第二个参数是 Y 轴
// 第三个参数是 时间 （动画时间）
//			myScroll.scrollTo(0,-300,1000)


require(["jquery"],function($){
	/*$("body").get[0].addEventListener('ontouchstart', function(){ });*/
	$("footer").on("click","div",function(){
		$(this).css("color","#6DDB4F").siblings().css("color","#333")
	});

	$("#demo").on("click","div",function(){
		window.location.href = "../book/dist/html/demo.html";
	});
	$("#blog").on("click","div",function(){
		window.location.href = "blog.html";
	});
	$("#scrawl").on("click","div",function(){
		window.location.href = "scrawl.html";
	});
	
});

