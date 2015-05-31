/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */
function addScript(url) {
    $.getScript(url, function() {
		console.log('loaded ' + url);
		return false;
    })
}

function zIndex() {
	uniz +=1;
	return uniz;
}