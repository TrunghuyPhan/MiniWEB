/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Image
6. Init Quantity
7. Init Isotope


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/
	var arr = [];
	var header = $('.header');
	var hambActive = false;
	var menuActive = false;

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});
	initSearch();
	initMenu();
	initImage();
	initQuantity();
	initIsotope();
	initAddToCart();

	
	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 100)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Search

	*/

	function initSearch()
	{
		if($('.search').length && $('.search_panel').length)
		{
			var search = $('.search');
			var panel = $('.search_panel');

			search.on('click', function()
			{
				panel.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Menu

	*/

	function initMenu()
	{
		if($('.hamburger').length)
		{
			var hamb = $('.hamburger');

			hamb.on('click', function(event)
			{
				event.stopPropagation();

				if(!menuActive)
				{
					openMenu();
					
					$(document).one('click', function cls(e)
					{
						if($(e.target).hasClass('menu_mm'))
						{
							$(document).one('click', cls);
						}
						else
						{
							closeMenu();
						}
					});
				}
				else
				{
					$('.menu').removeClass('active');
					menuActive = false;
				}
			});

			//Handle page menu
			if($('.page_menu_item').length)
			{
				var items = $('.page_menu_item');
				items.each(function()
				{
					var item = $(this);

					item.on('click', function(evt)
					{
						if(item.hasClass('has-children'))
						{
							evt.preventDefault();
							evt.stopPropagation();
							var subItem = item.find('> ul');
						    if(subItem.hasClass('active'))
						    {
						    	subItem.toggleClass('active');
								TweenMax.to(subItem, 0.3, {height:0});
						    }
						    else
						    {
						    	subItem.toggleClass('active');
						    	TweenMax.set(subItem, {height:"auto"});
								TweenMax.from(subItem, 0.3, {height:0});
						    }
						}
						else
						{
							evt.stopPropagation();
						}
					});
				});
			}
		}
	}

	function openMenu()
	{
		var fs = $('.menu');
		fs.addClass('active');
		hambActive = true;
		menuActive = true;
	}

	function closeMenu()
	{
		var fs = $('.menu');
		fs.removeClass('active');
		hambActive = false;
		menuActive = false;
	}

	/* 

	5. Init Image

	*/

	function initImage()
	{
		var images = $('.details_image_thumbnail');
		var selected = $('.details_image_large img');

		images.each(function()
		{
			var image = $(this);
			image.on('click', function()
			{
				var imagePath = new String(image.data('image'));
				selected.attr('src', imagePath);
				images.removeClass('active');
				image.addClass('active');
			});
		});
	}

	/* 

	6. Init Quantity

	*/
	var count = 1;
	function initQuantity()
	{
		// Handle product quantity input
		if($('.product_quantity').length)
		{
			var input = $('#quantity_input');
			var incButton = $('#quantity_inc_button');
			var decButton = $('#quantity_dec_button');

			var originalVal;
			var endVal;

			incButton.on('click', function()
			{
				originalVal = input.val();
				endVal = parseFloat(originalVal) + 1;
				input.val(endVal);
				count = input.val(endVal);
			});

			decButton.on('click', function()
			{
				originalVal = input.val();
				if(originalVal > 0)
				{
					endVal = parseFloat(originalVal) - 1;
					input.val(endVal);
				}
				count = input.val(endVal);
			
			});
			
		}
	}

	/* 

	7. Init Isotope

	*/

	function initIsotope()
	{
		var sortingButtons = $('.product_sorting_btn');
		var sortNums = $('.num_sorting_btn');

		if($('.product_grid').length)
		{
			var grid = $('.product_grid').isotope({
				itemSelector: '.product',
				layoutMode: 'fitRows',
				fitRows:
				{
					gutter: 30
				},
	            getSortData:
	            {
	            	price: function(itemElement)
	            	{
	            		var priceEle = $(itemElement).find('.product_price').text().replace( '$', '' );
	            		return parseFloat(priceEle);
	            	},
	            	name: '.product_name',
	            	stars: function(itemElement)
	            	{
	            		var starsEle = $(itemElement).find('.rating');
	            		var stars = starsEle.attr("data-rating");
	            		return stars;
	            	}
	            },
	            animationOptions:
	            {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	        });
		}
	}

	
	

	function initAddToCart()
	{
		if(typeof($.cookie("amount") !== "undefined")){
			$('#amount').text($.cookie("amount"));
		}
		var pName = $(".details_name");
		var pPrice = $(".details_price");
		var pImg = $(".details_image_url");
		var pQuan;
	
		var addCart = $("#btn_card");
		
		addCart.on('click', function(){
			if(count === 1){
				pQuan = 1;
			}
			else{
				pQuan = parseInt(count.val());
			}
			var item = parseInt($("#amount").text());
			var arrCart = [];
			var arrCarte = [];
			if(typeof($.cookie("arrCart")) === 'undefined'){
				
				$.cookie("arrCart", JSON.stringify(arrCarte));
			}
			
				var objPhone = {
					pName: pName.text(),
					pPrice: pPrice.text(),
					pImg: pImg.attr("src"),
					pQuan: pQuan
				}; 
				arrCarte = JSON.parse($.cookie("arrCart"));
				arrCarte.push(objPhone);
				console.log(objPhone);
				console.log("objPhone");
				arrCart = JSON.parse($.cookie("arrCart"));
				var checkItem = arrCart.find(function(e){
					return e.pName === pName.text();
				});
				if(typeof(checkItem) !== "undefined"){
					alert("This item is already in your cart!");
					return;
				}

				$.cookie("arrCart", JSON.stringify(arrCarte));
				if(item === 0){
					console.log("hackonehit");
					$.cookie("amount","1");
				
				}
				else {
					var x = parseInt($.cookie("amount")) + 1;
					$.cookie("amount",x);
					console.log(x);
				}
				$('#amount').text($.cookie("amount"));
				alert("ADDED successful");
				//var x = "hack";
			
			
		});
		
	}
	
	


});