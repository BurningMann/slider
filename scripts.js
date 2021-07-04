(function($) {
	$.fn.Slide = function(object) {
		$(this).map(function(index, element) {
                object.slidesToShow ? slidesToShow = object.slidesToShow : slidesToShow = 1
                object.slidesToSkroll ? slidesToSkroll = object.slidesToSkroll : slidesToSkroll = 1
                object.slideSpeed ? slideSpeed = object.slideSpeed : slideSpeed = 500
				current_pos = 0,
				slide_count = $(element).children().length,
				current_slide = 1,
                track = false,
                slide_animation = true
                
            $(element).addClass("slider_initialized");
            
            $(element).children().addClass("slider_slide").wrapAll('<div class="slider_track">');
            
            $(".slider_track").css("transform", "translateX(0)");
            
            let slider_track = $(element).find(".slider_track");
            
            $(element).append("<div class='slide_arrow prew'>").append("<div class='slide_arrow next'>");
            
			if (slidesToShow) {
				var slider_width = parseInt($(element).css("width")),
					slide_width = slider_width / slidesToShow
				$(slider_track).children().css("width", slide_width + "px")
            }
            
			let slide_movement = slide_width * slidesToSkroll

			function sliderMove(pos,cur_slide) {
                    if (cur_slide > slide_count) {
                        $(slider_track).css({
                            'transition': 'transform 1s ease 0s',
                            'transform': 'translateX(0px)',
                        });
                        current_pos = 0;
                        current_slide = 1;
                        setTimeout(function(){slide_animation = true},slideSpeed)
                        return false;
                    }
                    if (cur_slide <= 0) {
                        let max_pos = parseInt($(slider_track).css("width")) - slide_movement
                        $(slider_track).css({
                            'transition': 'transform 1s ease 0s',
                            'transform': 'translateX(-' + max_pos + 'px)',
                        });
                        current_pos = parseInt("-" + max_pos);
                        current_slide = slide_count;
                        setTimeout(function(){slide_animation = true},slideSpeed)
                        return false;
                    }
                    $(slider_track).css({
                        'transition': 'transform ' + slideSpeed + 'ms ease 0s',
                        'transform': 'translateX(' + pos + 'px)',
                    });
                    setTimeout(function(){slide_animation = true},slideSpeed)
                  
            }
            function SlideCounting(slide){
                if(slide_animation){
                    slide_animation = false
                    if(slide == "next"){
                        current_pos = current_pos - slide_movement
                        current_slide = current_slide + slidesToSkroll
                        sliderMove(current_pos,current_slide)
                    }
                    if(slide == "prev"){
                        current_pos = current_pos + slide_movement
                        current_slide = current_slide - slidesToSkroll 
                        sliderMove(current_pos,current_slide)
                    }
                } 
            }
            function MouseDown(EO){
                if(slide_animation){
                track = true
				x = 0, y = 0;
				point_cord_x = EO.clientX;
                cur_translate = parseInt($(slider_track).css('transform').replace(/[^0-9\-.,]/g, '').split(',')[4]);
                
                    $(slider_track).css({
                        'transition': '',
                    });
                }   
            }
            function MouseUp(EO){
                let slide_width = parseInt(slider_width / 6)
                
				if (x <= point_cord_x - slide_width && x != 0) {
                    SlideCounting("next");
				} else if (x >= point_cord_x + slide_width && x != 0) {
                    SlideCounting("prev");
				} else if(slide_animation) {
					$(slider_track).css({
						'transition': 'transform ' + slideSpeed + 'ms ease 0s',
						'transform': 'translateX(' + cur_translate + 'px)',
					});
				}
				track = false
            }
            function MouseLeave(EO){
                if(track){
                    MouseUp()
                } 
            }
            function MouseMove (EO){
                if (track) {
					var c_x = EO.clientX;
					if (x < c_x) {
						x = c_x;
						track_x = cur_translate + (c_x - point_cord_x)
						$(slider_track).css({
							'transform': 'translateX(' + track_x + 'px)',
						});
					} else if (x > c_x) {
						x = c_x;
						track_x = cur_translate - (point_cord_x - c_x)
						$(slider_track).css({
							'transform': 'translateX(' + track_x + 'px)',
						});
					}
				}
            }
			$(element).find(".slide_arrow").click(function(EO) {
                EO.stopPropagation()

                    if ($(this).hasClass("next")) {
                        SlideCounting("next")
                    } else{
                        SlideCounting("prev")
                    }
				
            })
            $(element).mousedown(MouseDown) ;
            $(element).mouseup(MouseUp) ;
            $(element).mouseout(MouseLeave) ;
            $(element).mousemove(MouseMove) ;
        })
        
    };
    
})(jQuery);
/* $("body").mousedown(function(EO){console.log(EO)}) */
window.onload = function() {
	$(".slider").Slide({
		slidesToShow: 1,
        /* slideSpeed: 1000, */
        slidesToSkroll: 1,
	})
}