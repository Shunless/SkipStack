function addScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
	
	$('head').append(script);
}