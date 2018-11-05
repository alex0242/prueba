baguetteBox.run('.tz-gallery');
wow = new WOW( { animateClass: 'animated',offset:100,callback:function(box) {} });
wow.init();
$( document ).ready(function() {

	$('.menu-item').addClass('menu-trigger');
	$('.menu-trigger').click(function(){
		$('#menu-trigger').toggleClass('clicked');
		$('.containerMain').toggleClass('push');
		$('.menu-type').toggleClass('open');
	});

	$('a[rel="relativeanchor"]').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top - 145
		}, 500);
		if ( typeof $(this).attr("mobile") != "undefined")
		{
			$('#menu-trigger').toggleClass('clicked');
			$('.containerMain').toggleClass('push');
			$('.menu-type').toggleClass('open');
		}
		
		return false;
	});

	$("#send-message").click(function(event) {
		event.preventDefault();
		$.ajax({
			url: "ajax/mail.php",
			type: "POST",
			data: $("#contact-form").serialize(),
			dataType: "json",
			beforeSend: function (xhr) {
				$( "#send-message" ).html("ENVIANDO...");
				$( "#send-message" ).prop("disabled",true);
			},
			success: function (response) {
				if (response.success){
					swal("Bien!", "Tu mensaje ha sido enviado con exito!", "success")
					$(".contact-input").val("");
					$( "#send-message" ).html("ENVIAR MENSAJE");
					$( "#send-message" ).prop("disabled",false);
				} 
				else
				{
					$( "#send-message" ).html("ENVIAR MENSAJE");
					$( "#send-message" ).prop("disabled",false);
					sweetAlert("Oops...", response.msg, "error");
				}
				grecaptcha.reset();   
			},
			error: function (response) {
				$( "#send-message" ).html("ENVIAR MENSAJE");
				$( "#send-message" ).prop("disabled",false);
				sweetAlert("Oops...", "Ocurrió un error al enviar el mensaje!", "error");
				grecaptcha.reset();   
			},
		});
	});
});

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("anchor").style.display = "block";
	} else {
		document.getElementById("anchor").style.display = "none";
	}
}

function topFunction() {
	$('html, body').animate({
	scrollTop: $('body').offset().top
	}, 900,'swing');
	return false;
}