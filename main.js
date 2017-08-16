// JavaScript Document

//login
var loginF = false;


//hearderDown
function down() {
	var $this = $(this);
	$this.children('div').show();
	$this.children('a, p').css(
		{
			"background-color": "#FFF",
			"border-bottom": "1px solid #FFF"
		}
	)
}

function up() {
	var $this = $(this);
	$this.children('div').hide();
	$this.children('a, p').css(
		{
			"background-color": "#F2F2F2",
			"border-bottom": "0px"
		}
	)
}

$('li.mine').hover(down, up);
$('li.favorites').hover(down, up);
$('li.support').hover(down, up);
$('li.siteNav').hover(down, up);

//searchInput
function focused() {
	var $this = $(this);
	$this.css("color", "#CCC");
	$this.parent().find('label').css('opacity', 0.5)
}
function keydownHandler(){
	var $this = $(this);
	$this.parent().find('label').css('display', 'none')
}
function blured() {
	var $this = $(this);
	var len = $this.val().length;
	if(len == 0) {
		$this.parent().find('label').css(
			{
				'display': 'inline-block',
				'opacity': '1'
			}
		)
	}
}
$('#search').focus(focused)
			.keydown(keydownHandler)
			.blur(blured);
$('#jxRight form label').click(function() {
	$('#search').focus()
});

//lunbo
function lun(number, ele1, ele2) {
	var leftPos = [];
	var j = 0;
	var timerR;
	function order() {
		if(j == number) {
			j = 0;
			ele1.animate(
			{left: leftPos[j]}, 
			300,
			function() {
				ele2.children().removeClass('current')
						   .end()
						   .children().eq(j).addClass('current');
				j++
			})	
		}
		else{
			ele1.animate(
			{left: leftPos[j]}, 
			300, 
			function() {
				ele2.children().removeClass('current')
						   .end()
						   .children().eq(j).addClass('current');
				j++
			});
		}
	}
	for(var i = 0; i < 6; i++) {
		leftPos.push(-720 * i + "px")
	}
	var timer = setInterval(order, 2000);
	ele1.hover(
		function() {
			clearInterval(timer);
			clearInterval(timerR)
		},
		function() {
			timer = setInterval(order, 2000)
		}
	)
	ele2.children().each(
		function(index, element){
			$(element).click(
				function() {
					clearInterval(timerR);
					clearInterval(timer);
					var $this = $(this);
					$this.parent().children().removeClass('current')
						 .end()
						 .end()
						 .addClass('current');
					ele1.animate(
						{left: leftPos[index]}, 
						300, 
						function(){
							j = index;
							timerR = setInterval(order, 2000)
						}
					);						
				}
			)
		}
	)
}
lun(6, $('#topPicIn'), $('#count'));
lun(2, $('#bottomPicIn'), $('#countBottom'))

//hotBrand
$('#hBHeadL ul li a').click(
	function(event) {
		event.preventDefault();
		var $this = $(this);
		var dataType = $this.attr('data-type');
		$this.parent().parent().find('a').removeClass('choosed')
			   .end().end().end().addClass('choosed');
		$('#hBContent div').each(
			function() {
				$(this).attr('data-type') == dataType ? $(this).show() : $(this).hide()
			}
		)
	}
)

function chooseType(className, ele1, ele2, dataType) {	
	ele1.parent().find('a').removeClass(className)
		 .end().end().addClass(className);
	ele2.each(
		function() {
			$(this).attr('data-type') == dataType ? $(this).show() : $(this).hide()
		}
	)
}

$('#mFHead div a').click(
	function(event) {
		event.preventDefault();
		var $this = $(this);
		var dataType = $this.attr('data-type');
		chooseType('mChoosed', $this, $('#mFContent div'), dataType)
	}
)

$('#sHead div a').click(
	function(event) {
		event.preventDefault();
		var $this = $(this);
		var dataType = $this.attr('data-type');
		chooseType('sChoosed', $this, $('#sContent div'), dataType)
	}
)