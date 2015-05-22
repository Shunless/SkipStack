function addScript(url) {
    $.getScript(url, function() {
		console.log('loaded ' + url);
		return false;
    })
}