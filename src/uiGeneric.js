/**
 * @author Ρωμανός Μουρίκης
 * @copyright 2015 Shunless Studio.
 */
function addScript(url) {
	$.getScript(url, function () {
		console.log('loaded ' + url);
		return false;
	});
}

function zIndex() {
	uniz += 1;
	return uniz;
}

function arrayRotate(arr, reverse) {
	if (reverse)
		arr.push(arr.shift());
	else
		arr.unshift(arr.pop());
	return arr;
}

function getCoords(tlbr) {
	return [Number(tlbr.split('-')[0]), Number(tlbr.split('-')[1])];
}

function updateUi() {
	//Function recalculates newline size on every beat
	recalcBar();

	if (enemiesBar.rendered) {
		enemiesBar.text(enemy.length);
	}
}

function extractCoords(tl, br) {
	//Craetes an object containing arithmetic values of all four coordinates of an object
	this.top = getCoords(tl)[0]; //Defines the first vertical cell
	this.left = getCoords(tl)[1]; //Defines the first horizontal cell
	this.bottom = getCoords(br)[0]; //Defines the last vertical cell
	this.right = getCoords(br)[1]; //Defines the last horizontal cell
}


function callbackTrigger(obj, callback) {
	disp = obj;
	callback();
}
