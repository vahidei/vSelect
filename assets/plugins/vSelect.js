
	(function($) {
 
		$.fn.vSelect = function(options){
	 
			var sets = $.extend({
				
				theme: "light",
				search: false,
				searchTitle: 'Search ...',
				effect: "none",
				dir:	"ltr"
			
			}, options );
			
			
			var $name = $(this).attr("name");
			
			var $title = '';
			
			var $options = '';
			
			var $value = '';
			
			var $selected = '';
			
			var $counter = 0;
			
			var $search = '';
			
			var $multiple = ($(this).attr('multiple')) ? true : false;
			
			$(this).find("option").each(function() {
				
				if($(this).attr("selected")){
				
					$title = $(this).text();
				
					$value = $(this).attr('value');
					
					$selected = $counter;
				}
				
				if(!$multiple)
					$options += '<li data-value="' + $(this).attr('value') + '">' + $(this).text() + '</li>';
				else
					$options += '<li data-value="' + $(this).attr('value') + '"><input type="checkbox">' + $(this).text() + '</li>';
				
				$counter++;
			});

			if($title == ''){
				
				$value = $(this).find('option:first').attr('value');
				
				$title = $(this).find('option:first').text();
			
			}
			
			if(sets.search){
				$search = '<div class="search"><input type="text" placeholder="' + sets.searchTitle + '" data-name="' + $name + '"></div>';
			}
			
			$(this).before('<div data-id="vSelect" data-eff="' + sets.effect + '" data-search="' + sets.search + '" data-name="' + $name + '" class="vSelect ' + sets.dir + ' ' + sets.theme + '"><div class="bgTitle"><div class="title">' + $title + '</div></div>' + $search + '<ul>' + $options + '</ul></div>');
			
			// $(this).before('<input type="hidden" name="' + $name + '" value="' + $value + '">');
			
			
			if($selected != ''){
				
				 $('div [data-name="' + $name + '"]').find('ul li:eq(' + $selected + ')').addClass('selected');
				
			}
			
			if(sets.search){
				$('div [data-name="' + $name + '"]').find('.search input').keyup(function () {
					var filter = $(this).val();
					$('div [data-name="' + $name + '"]').find('ul li').each(function () {
						if ($(this).text().search(new RegExp(filter, "i")) < 0) {
							$(this).hide();
						} else {
							$(this).show()
						}
					});
				});
			}

			 $('div [data-name="' + $name + '"]').click(function(event){

				if($('div [data-name="' + $name + '"]').attr('data-active') != 'true'){
					$('div[data-id=vSelect]').not(this).each(function(){
						if($(this).attr("data-eff") == "none"){
							$(this).find("ul").removeAttr("style");
							if($(this).attr("data-search") == "true"){
								$(this).find(".search").removeAttr("style");
							}
						}else if($(this).attr("data-eff") == "slide1"){
							if($(this).attr("data-search") == "true"){
								$(this).find(".search").slideUp(200);
								$(this).find("ul").delay(200).slideUp(200);
							}else{
								$(this).find("ul").slideUp(200);
							}
						}else if($(this).attr("data-eff") == "slide2"){
							if($(this).attr("data-search") == "true"){
								$(this).find(".search").slideUp(200);
							}
							$(this).find("ul").slideUp(200);
						}
						$(this).removeAttr("data-active");
						$(this).removeClass("bottom-radius-clear");
					});

					if(sets.effect == "none"){
						$(this).find("ul").attr("style","display:block");
						if($(this).attr("data-search") == "true"){
							$(this).find(".search").attr("style","display:block");
						}
					}else if(sets.effect == "slide1"){
						if($(this).attr("data-search") == "true"){
							$(this).find(".search").delay(200).slideDown(200);
						}
						$(this).find("ul").slideDown(200);
					}else if(sets.effect == "slide2"){
						$(this).find("ul").slideDown(200);
						if($(this).attr("data-search") == "true"){
							$(this).find(".search").slideDown(200);
						}
					}

					$(this).attr("data-active","true");
					$(this).addClass("bottom-radius-clear");
					
				}else{
					if(event.target.tagName != 'INPUT' && (event.target.tagName != 'LI' || !$multiple)){
						if(sets.effect == "none"){
							$(this).find("ul").removeAttr("style");
							if($(this).attr("data-search") == "true"){
								$(this).find(".search").removeAttr("style");
							}
						}else if(sets.effect == "slide1"){
							if($(this).attr("data-search") == "true"){
								$(this).find(".search").slideUp(200);
								$(this).find("ul").delay(200).slideUp(200);
							}else{
								$(this).find("ul").slideUp(200);
							}
						}else if(sets.effect == "slide2"){
							if($(this).attr("data-search") == "true"){
								$(this).find(".search").slideUp(200);
							}
							$(this).find("ul").slideUp(200);
						}
						$(this).removeAttr("data-active");
						
						$(this).removeClass("bottom-radius-clear");
					}
				}
				
			});
			 
			$('div [data-name="' + $name + '"]').find('ul li').click(function(){
				if(!$multiple){
					$("select[name='" + $name + "']").val($(this).attr('data-value'));
					$('div [data-name="' + $name + '"]').find('ul li').removeClass('selected');
					$(this).addClass('selected');
					$('div [data-name="' + $name + '"]').find(".bgTitle .title").text($(this).text());
				}else{
					if($(this).find("input[type=checkbox]").is(':checked')){
						$("select[name='" + $name + "']").find("option:eq("+$(this).index()+")").removeAttr('selected');
						$(this).find("input[type=checkbox]").prop('checked',false);
						$(this).removeClass('selected');
					}else{
						$("select[name='" + $name + "']").find("option:eq("+$(this).index()+")").attr('selected',true);
						$(this).find("input[type=checkbox]").prop("checked",true);
						$(this).addClass('selected');
					}
				}
			});
			 
			$(document).click(function(event){
				
				if(!$(event.target).closest('div[data-id=vSelect]').length) {
					$("div[data-id=vSelect]").each(function(){
						if($(this).find('ul').is(":visible")) {
							if($(this).attr("data-eff") == "none"){
								$(this).find("ul").removeAttr("style");
								if($(this).attr("data-search") == "true"){
									$(this).find(".search").removeAttr("style");
								}
							}else if($(this).attr("data-eff") == "slide1"){
								if($(this).attr("data-search") == "true"){
									$(this).find(".search").slideUp(200);
									$(this).find("ul").delay(200).slideUp(200);
								}else{
									$(this).find("ul").slideUp(200);
								}
							}else if($(this).attr("data-eff") == "slide2"){
								if($(this).attr("data-search") == "true"){
									$(this).find(".search").slideUp(200);
								}
								$(this).find("ul").slideUp(200);
							}
							
							$(this).removeAttr("data-active");
							$(this).removeClass("bottom-radius-clear");
						
						}
					});
				} 
			});

			$(this).hide();
		
		};
	 
	}(jQuery));