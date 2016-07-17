let deepEqual = (param1,param2) => {
	let types = [Function,Array,Date,Object],
		workWithType, equal;
	
	if (typeof param1 == typeof param2) {
		workWithType = typeof param1;
		for (let i in types){
			if (param1 instanceof types[i] && param2 instanceof types[i]) {
				workWithType = types[i];
				break;
			}			
		}
		switch (workWithType){
			case Function:
				equal = deepEqual(param1.toString(),param2.toString());
				break;
			case Array:
				if (param1.length == param2.length) {
					let len = param1.length;
					for (let i = 0; i < len; i++){
						if (!deepEqual(param1[i],param2[i])) return false;
					}
					equal = true;
				} else {
					equal = false
				}
				break;
			case Date:				
				equal = deepEqual(param1.valueOf(),param2.valueOf());
				break;
			case Object:
				if (param1 == param2) {
					equal = true
				} else {
					let propNames1 = Object.getOwnPropertyNames(param1),
						propNames2 = Object.getOwnPropertyNames(param2);
					if (deepEqual(propNames1.sort(),propNames2.sort())) {
						for (let key in param1){
							if (!deepEqual(param1[key],param2[key])) return false;
						}
						equal = true;
					} else {
						equal = false
					}
				}
				break;
			default:
				/*if (isNaN(param1) && isNaN(param2)){
					equal = true
				} else {
				}*/
				if (param1 === param2 ){
					equal = true
				} else {
					equal = false
				}					
		}
	} else {
		equal = false;
	}
	return equal;
};

module.exports = deepEqual;