/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Search
4. Init Menu
5. Init Quantity


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

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
	initQuantity();
	initCart();
	initClear();

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

	5. Init Quantity

	*/

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
			});

			decButton.on('click', function()
			{
				originalVal = input.val();
				if(originalVal > 0)
				{
					endVal = parseFloat(originalVal) - 1;
					input.val(endVal);
				}
			});
		}
	}
	function initClear(){
		$("#clear_cart").on('click', function(){
			$.removeCookie('amount');
			$.removeCookie('arrCart');
			alert("Xoa San pham ra khoi gio hang thanh cong ");
		});
		$("#btn_checkout").on('click', function(){
			$.removeCookie('amount');
			$.removeCookie('arrCart');
			alert("Thanh Toan Thanh Cong");
		});
	}

	function initCart()
	{	
		
		var total = 0
		var subTotal = 0;
		var ship = 0;
		var x = 1;
		if(typeof($.cookie("amount") !== "undefined")){
			$('#amount').text($.cookie("amount"));
		}
		$('input:radio').change(function(){
			
			ship = parseInt(this.value);
			console.log(ship);
			total = [ship+subTotal];
			console.log(total);
			$("#total").text(total+",000 VND");
		}); 
		
		if(typeof($.cookie("arrCart")) !== 'undefined'){

			$("#items").remove();
			var items = JSON.parse($.cookie("arrCart"));
			console.log(items)
			items.forEach(e => {
				subTotal += parseInt(e.pPrice) * e.pQuan;
				x++;
				console.log(subTotal);
				var eleName = `<div class="cart_item_product d-flex flex-row align-items-center justify-content-start">
			<div class="cart_item_image">
				<div><img cl='img${x}' class="details_image_url" src="images/xsm1.jpg" alt=""></div>
			</div>
			<div class="cart_item_name_container">
				<div class="cart_item_name"><a id="details_name" cl="name${x}" href="#">iPhone 11 Pro </a></div>
				
			</div>
		</div>`;
			var elePrice = `<div id="details_price" cl="price${x}" class="cart_item_price">30.990.000₫</div>`;
			var eleQuan =`<div class="cart_item_quantity">
			<div class="product_quantity_container">
				<div class="product_quantity clearfix">
					<span>Qty</span>
					<input id="quantity_input" type="text" cl="quan${x}" pattern="[0-9]*" value="1">
					<div class="quantity_buttons">
						<div id="quantity_inc_button" class="quantity_inc quantity_control"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>
						<div id="quantity_dec_button" class="quantity_dec quantity_control"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>
					</div>
				</div>
			</div>
		</div>`;

				$("#item-col").append(`<div id='items${x}' class="cart_item d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start"></div<`);
				$("#items"+x).append(eleName);
				$("#items"+x).append(elePrice);
				$("#items"+x).append(eleQuan);
				$("img[cl='img"+x+"']").attr("src", e.pImg);
				$("a[cl='name"+x+"']").text(e.pName);
				$("div[cl='price"+x+"']").text(e.pPrice);
				$("input[cl='quan"+x+"']").val(e.pQuan);
				
			});
				//$("details_image_url").attr("src","")
			$("#sub_total").text(subTotal+",000 VND");
			
			var total = ship + subTotal;
			$("#total").text(total+",000 VND");
		}
		else{
			$("#item-col").remove();
			$("#card_items").append("<p style='text-align:center'>Gio Hang Trong rong,</p>")
		}

	}

});