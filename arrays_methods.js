let forEach = (array, callback, thisArg) => {
	if (typeof callback !== 'function') {
      throw new Error('В качестве второго аргумента необходимо передать функцию!');
    }
    for (let i = 0; i < array.length; i++){
		if (i in array) {
			callback.call(thisArg,array[i],i,array)
		}
    }
};

let filter = (array, callback, thisArg) => {
	if (typeof callback !== 'function') {
      throw new Error('В качестве второго аргумента необходимо передать функцию!');
    }
	let newArr = [];
	for (let i = 0; i < array.length; i++){
		if (i in array) {
			if (callback.call(thisArg,array[i],i,array)) newArr[newArr.length] = array[i];
		}
    }
	return newArr;
};

let map = (array, callback, thisArg) => {
	if (typeof callback !== 'function') {
      throw new Error('В качестве второго аргумента необходимо передать функцию!');
    }
	let newArr = [];
	for (let i = 0; i < array.length; i++){
		if (i in array) {
			newArr[newArr.length] = callback.call(thisArg,array[i],i,array);
		}
    }
	return newArr;
};

let slice = (array, begin, end) => {
	let newArr = [],
		beginNum = Number(begin),
		endNum = Number(end);
	if (beginNum < 0 && (array.length + beginNum >= 0)){
		beginNum += array.length;
	} else if (!beginNum || (array.length + beginNum < 0) || typeof beginNum !== 'number'){
		beginNum = 0;
	}
	if (endNum < 0){
		endNum += array.length;
	} else if (!endNum && endNum !== 0 && !isNaN(endNum)){
		endNum = array.length;
	} else if (isNaN(endNum)){
		endNum = 0;
	}
	for (var i = beginNum; i < endNum; i++){
		newArr[newArr.length] = array[i];
	}
	return newArr;
};

let reduce = (array, callback, initialValue) => {
	function checkingArray(arr){
		let count = 0;

		for (let i = 0; i < arr.length; i++){
			if (i in arr) {
				count++;
			}
		}

		return {
			isArrEmpty: (count > 0)? false : true,
			hasOneElem: (count == 1)? true : false
		}
	}

	function firstNotEmptyElem(arr) {
		for (let i = 0; i < arr.length; i++){
			if (i in arr) return {
				index: i,
				value: arr[i]
			}
		}
	}

	let checkArr = checkingArray(array);

	if (initialValue != undefined) {
		if (checkArr.isArrEmpty) return initialValue;

		let previousValue = initialValue;
		for (let i = 0; i < array.length; i++){
			if (i in array) {
				previousValue = callback(previousValue,array[i],i,array);
			}
		}

		return previousValue;
	} else {
		if (checkArr.isArrEmpty) throw new Error('Массив не должен быть пустым, либо должно быть указано «начальное значение»');

		let firstElem = firstNotEmptyElem(array),
			previousValue = firstElem.value,
			index = ++firstElem.index;

		if (checkArr.hasOneElem) return firstElem.value;

		for (let i = index; i < array.length; i++){
			if (i in array) {
				previousValue = callback(previousValue,array[i],i,array);
			}
		}
		return previousValue;
	}
};

function splice(array, start, deleteCount) {
	let delArr = [],
		newArr = [],
		startNum = Number(start),
		delCount = Number(deleteCount),
		argIndex = 3,
		argLen = arguments.length - argIndex,
		delUpTo;

	function makeNewArr(oldAr, newAr) {
		for (let i in oldAr){
			newAr[newAr.length] = oldAr[i];
		}
	}
	function swap(a,b) {
		let temp = a;
		//console.log(a,b);
		a = b;
		b = temp;
		//console.log(a,b);
	}

	if (startNum < 0 && array.length + startNum >= 0) {
		startNum += array.length;
	}
	else if (isNaN(startNum) || startNum == 0 || array.length + startNum < 0)
		startNum = 0;
	else if (startNum > array.length){
		startNum = array.length;
	}

	if (deleteCount == undefined) {
		delCount = array.length;
	} else {
		if (isNaN(delCount) || delCount <= 0) {
			delCount = 0;
		}
		else if (delCount > array.length) {
			delCount = array.length;
		}
	}

	delUpTo = startNum + delCount;

	for (let i = startNum; i < delUpTo; i++){
		delArr[delArr.length] = array[i];
		delete array[i];
	}

	if (argLen > 0){
		let putUpTo = startNum + argLen;
		for (let i = startNum; i < putUpTo; i++) {
			if (i in array) {
				array[array.length] = array[i];
				array[i] = arguments[argIndex];
				argIndex++;
			}
			else {
				array[i] = arguments[argIndex];
				argIndex++;
			}
		}
		if (array.length - putUpTo > 1){
			for (let i = putUpTo, len = array.length - 1; i < len; i++){
				let temp = array[len];
				array[len] = array[i];
				array[i] = temp;
				//swap(array[len],array[i]); здесь имеется вопрос: почему функция swap не меняет элементы?
			}
		}
	}

	makeNewArr(array, newArr);
	array.length = 0;
	makeNewArr(newArr, array);

	return delArr;
};

module.exports = {
	forEach: forEach,
	filter: filter,
	map: map,
	slice: slice,
	reduce: reduce,
	splice: splice
}