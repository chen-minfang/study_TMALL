// JavaScript Document

//animation
$('div.signSwitch > i').click(
	function() {
		$(this).parent().parent().toggle()
			   .siblings().toggle();
	}
);

function focused() {
	$(this).parent().css(
		{
			'border': '1px solid #8BADE4',
			'border-radius': '2px'
		}
	)
	.end().siblings('i.icon-jianpan').show()
}

function blured() {
	$(this).parent().css('border', '1px solid #CBCBCB')
		   .end().siblings('i.icon-jianpan').hide()
}

function keyUp() {
	$(this).val().length > 0 ? $(this).siblings('i.icon-chucuo').show() : $(this).siblings('i.icon-chucuo').hide()
}

function deleted() {
	$(this).hide()
		   .siblings('input').val('').focus()
}

function changed() {
	if($(this).val().length > 0) {
		$(this).parent().siblings('#vSlider').show()	
	}
}
			
var diffO = $('#vSlider').width() - $('#slider').width();
var posD;
var posM;
var posU;
var flag = false;
var flagU = false;
var $slider = $('#slider');
var sliderF = false;

function mouseDown(e) {
	var e = e || window;
	var $target = $(e.target);
	if($target.is($slider)) {
		flag = true;
		flagU = true;
		posD = e.clientX;
	}
}

function mouseMove(e) {
	if(flag) {
		var e = e || window.e;
		var $target = $(e.target);
		posM = e.clientX;
		var left = posM - posD;		
		if(left < 0) {
			$slider.css('left', 0)
		}
		else if(left < diffO) {
			$slider.css('left', left + 'px')
		}
		else {
			$slider.css('left', diffO + 'px')
				   .removeClass('icon-huakuai')
				   .addClass('icon-zhengque')
				   .parent().css(
				   		{
							'background-color': '#7AC23C',
							'color': '#FFF'
						}
					)
				    .children('span.sText').text('验证通过');
			sliderF = true;
		    $(document).unbind('mousedown', mouseDown)
				       .unbind('mousemove', mouseMove)
				       .unbind('mouseup', mouseUp)
		}
	}
}

function mouseUp(e) {
	if(flagU){
		flag = false;
		var e = e || window.e;
		posU = e.clientX;
		var diffU = posU - posD;
		var step = diffU / 5;
		if(diffU < diffO) {
			var timer = setInterval(
				function(){
					diffU = diffU - step;
					$slider.css('left', diffU + 'px');
					if (diffU <= 0) {
						$slider.css('left', '0');
						clearInterval(timer);
					}
				},30)	
		} else {
			$slider.css('left', diffO + 'px');
		}
	}
}

$('input').focus(focused)
		  .blur(blured);
		  
$('#userName input').keyup(keyUp)
					.change(changed);

$('i.delete').click(deleted);

$(document).bind('mousedown', mouseDown)
		    .bind('mousemove', mouseMove)
		    .bind('mouseup', mouseUp);
		

//validate
function validate(e) {
	var e = e || window.e;
	e.preventDefault();
	$('#signIn form h3').hide();
	$('#signIn form div#hint').show();
	var msg = [
		'请输入账户名和密码',
		'请填写账户名',
		'请输入密码',
		'验证失败，请重新拖动滑块完成验证',
		'你输入的密码和账户名不匹配，是否<a href = "">忘记密码</a>或<a href = "">忘记会员名</a>'
	];
	var name = $('#userName input').val();
	var password = $('#userPassw input').val();
	if(name === '') {
		if(password === '') {
			$('#signIn form div#hint span').text(msg[0])	
		}
		else {
			$('#signIn form div#hint span').text(msg[1])	
		}
	}
	else {
		if(password === '') {
			$('#signIn form div#hint span').text(msg[2])
		}
		else if(sliderF){
			if(name === 'min' && password === '123456') {
				$(this).parent().submit()
			}
			else {
				$('#signIn form div#hint span').html(msg[4]);
				$('#signIn form div#hint').css('margin-bottom', '-24px')
			}
		}
		else {
			$('#signIn form div#hint span').text(msg[3])
		}
	}
}

$('button').click(validate);




