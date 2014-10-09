// JavaScript Document


(function($,w){
	$.fn.cjlImageViewer = function(){
		var el = this,selector = this.selector,cIndex=0,slideShowTimer,maxHeight=100,maxWidth=100,
		
		img_resize = function(){
			maxHeight = window.innerHeight*.9;
			maxWidth = window.innerWidth*.9;
			$('.cjl-img-container img').css({'max-height':maxHeight,'max-width':maxWidth});
			/*
			$('.cjl-img-container img').each(function(i,obj){
				obj.style.maxHeight = maxHeight+'px';
				obj.style.maxWidth = maxWidth+'px';
			});
			*/
			//console.log('MH '+maxHeight+' MW '+ maxWidth);
			
			//adjust left & top in order to position the container to the middle
			/*
			var mWidth = $('.cjl-img-container img').outerWidth()/2,
				mHeight =  $('.cjl-img-container img').outerHeight()/2;
			$('.cjl-img-container').css({left:(window.innerWidth/2)-mWidth,
				top:(window.innerHeight/2)-mHeight});
				console.log('img');
				*/
		},
		img_reposition = function(i){
			var mWidth = $('.cjl-img-container img').eq(i).outerWidth()/2,
				mHeight =  $('.cjl-img-container img').eq(i).outerHeight()/2;
			$('.cjl-img-container').css({left:(window.innerWidth/2)-mWidth,
				top:(window.innerHeight/2)-mHeight});
		},
		
		init = function(){
			document.body.style.overflow = 'hidden';
			$('body').append('<div class="cjl-viewer-overlay"><div class="back-drop"></div><div class="cjl-img-container"><div class="cjl-img-nav"><div class="img-close"></div></div><div class="img-loading"></div></div></div>');
			/*var img = new Image();
			var content = (typeof $(selector).eq(cIndex).attr('data-content')==='undefined')?'':'<div class="img-content"><div>'+$(selector).eq(cIndex).attr('data-content')+'</div></div>';
			img.src = $(selector).eq(cIndex).attr('src');
		*/
		},
		init_nav = function(){
			$('.cjl-viewer-overlay .cjl-img-nav').append('<div class="img-prev"><span></span></div><div class="img-next"><span></span></div>');
			$('.cjl-img-container .img-next').click(function(e){next();});
			$('.cjl-img-container .img-prev').click(function(e){prev();});
						
		},
		init_img = function(){
			var img = new Image(),
			content = (typeof $(selector).eq(cIndex).attr('data-content')==='undefined')?'':'<div class="img-content"><div>'+$(selector).eq(cIndex).attr('data-content')+'</div></div>';
			img.src = $(selector).eq(cIndex).attr('src');

			$('.cjl-img-container .img-loading').css('display','block');
			var chkImg = setInterval(function(){
			if(img.complete){
				clearInterval(chkImg);
				$('.cjl-img-container').append('<div class="cjl-img-inner">'+content+'</div>');
				$('.cjl-img-container .cjl-img-inner').eq(0).append(img);
				$('.cjl-img-container .img-loading').css('display','none');
				img_resize();
				img_reposition(0);
						
					}
				},10);
		},
		prev = function(){
			cIndex = cIndex-1<0?$(selector).length-1:cIndex-1;
			motion(-200);
		},
		next = function(){
			cIndex = cIndex+1<$(selector).length?cIndex+1:0;
			motion(200);
		},
		close = function(){
			document.body.style.overflow = 'auto';
			$('.cjl-viewer-overlay').animate({opacity:0},200,function(){this.remove()});
			
		},
		motion = function(d){
			$('.cjl-img-nav').hide();
			var img = new Image();
			var content = (typeof $(selector).eq(cIndex).attr('data-content')==='undefined')?'':'<div class="img-content"><div>'+$(selector).eq(cIndex).attr('data-content')+'</div></div>';
			img.src = $(selector).eq(cIndex).attr('src');
			$('.cjl-img-container .img-loading').show();
			var chkImg = setInterval(function(){
			if(img.complete){
				clearInterval(chkImg);
				$('.cjl-img-container').append('<div class="cjl-img-inner">'+content+'</div>');
				$('.cjl-img-container .cjl-img-inner').eq(1).append(img);
				$('.cjl-img-container .cjl-img-inner').eq(1).css({position:'absolute',opacity:0,top:0,left:d});
				$('.cjl-img-container .cjl-img-inner').eq(0).animate({left:-d,opacity:0},300,function(){$(this).remove();});
				$('.cjl-img-container .cjl-img-inner').eq(1).animate({left:0,opacity:1},300,function(){$(this).css({position:'relative'});$('.cjl-img-nav').show();});
				$('.cjl-img-container .img-loading').hide();
				img_resize();
				img_reposition(1);
					}
				},10);
			/*
			cIndex +=inc;
			*/
		};
		
		
		this.click(function(e){
			cIndex = $(selector).index(this);
			/*
			document.body.style.overflow = 'hidden';
			var img = new Image(), 
			content = (typeof $(selector).eq(cIndex).attr('data-content')==='undefined')?'':'<div class="img-content"><div>'+$(selector).eq(cIndex).attr('data-content')+'</div></div>';
			img.src = $(this).attr('src');
			$('body').append('<div class="cjl-viewer-overlay"><div class="back-drop"></div><div class="cjl-img-container"><div class="cjl-img-inner">'+content+'</div><div class="cjl-img-nav"><div class="img-close"></div><div class="img-prev"><span></span></div><div class="img-next"><span></span></div></div><div class="img-loading"></div></div></div>');
			$('.cjl-img-container .img-loading').css('display','block');
			var chkImg = setInterval(function(){
				if(img.complete){
					clearInterval(chkImg);
					$('.cjl-img-container .cjl-img-inner').append(img);
					$('.cjl-img-container .img-loading').css('display','none');
					img_position();
				}
				
			},10);
			*/
			init();
			init_nav();
			init_img();
			//add event listener
			$('.cjl-viewer-overlay .img-close,.cjl-viewer-overlay .back-drop').click(function(e){
				close();
			});	
			
		});
		
		this.slideShow = function(index,interval){
		//console.log('selector '+$(selector).eq(cIndex).attr('src'));
		
			cIndex = (index>=0&&index<$(selector).length)?index:0;
			interval = typeof interval !=='number'?3000:interval+200;
			init();
			init_img();
			/*
			$('.cjl-img-container .img-loading').css('display','block');
			var chkImg = setInterval(function(){
			if(img.complete){
				clearInterval(chkImg);
				$('.cjl-img-container').append('<div class="cjl-img-inner">'+content+'</div>');
				$('.cjl-img-container .cjl-img-inner').eq(0).append(img);
				$('.cjl-img-container .img-loading').css('display','none');
				img_position();
						
					}
				},10);
				*/
			$('.cjl-viewer-overlay .img-close,.cjl-viewer-overlay .back-drop').click(function(e){
				clearInterval(slideShowTimer);
				close();
			});	
			slideShowTimer=setInterval(next,interval);
			return this;
		};
		window.reposition = function(){img_position();};
		
		window.addEventListener('resize',function(e){img_resize();img_reposition(0);});
		return this;	
	};	
	
})(jQuery,this);
