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

function arrayRotate(arr, reverse){
  if(reverse)
    arr.push(arr.shift());
  else
    arr.unshift(arr.pop());
  return arr;
}

function getCoords(tlbr) {
	return tlbr.split('-');	
}