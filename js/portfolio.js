(function($){
	$(".image-link").each(function(){
	    var $this = $(this);

	    var href = $this.attr("href");
	    var text = $this.text();
	    $this.parent().attr("data-featherlight", href);

	    var img = document.createElement("img");
	    img.src = href;
	    img.alt = text;

	    $this.replaceWith(img);
	});
    //
    //
	// $(".slideshow").slick({
	//     infinite: false
	// });

	$(".post img").each(function(){
		$(this).attr("title", "Click to expand");

		$(this).on("click", function(){
			$(this).toggleClass("expanded");
		});
	});
})(jQuery);
