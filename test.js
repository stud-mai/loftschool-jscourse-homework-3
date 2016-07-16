let methods = require('./arrays_methods.js');

let array = [1, 2, 3, 4, 5, 6];

methods.forEach(array, item => console.log(item));
let greaterThan4 = methods.filter(array, item => item > 4);
let square = methods.map(array, item => item*item);
console.log(greaterThan4);
console.log(square);

var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

// removes 0 elements from index 2, and inserts 'drum'
var removed = methods.splice(myFish,2, 0, 'drum');
console.log(myFish);
console.log(removed);
// myFish is ['angel', 'clown', 'drum', 'mandarin', 'surgeon']
// removed is [], no elements removed

// myFish is ['angel', 'clown', 'drum', 'mandarin', 'surgeon']
// removes 1 element from index 3
removed = methods.splice(myFish,3, 1);
console.log(myFish);
console.log(removed);
// myFish is ['angel', 'clown', 'drum', 'surgeon']
// removed is ['mandarin']

// myFish is ['angel', 'clown', 'drum', 'surgeon']
// removes 1 element from index 2, and inserts 'trumpet'
removed = methods.splice(myFish,2, 1, 'trumpet');
console.log(myFish);
console.log(removed);
// myFish is ['angel', 'clown', 'trumpet', 'surgeon']
// removed is ['drum']

// myFish is ['angel', 'clown', 'trumpet', 'surgeon']
// removes 2 elements from index 0, and inserts 'parrot', 'anemone' and 'blue'
removed = methods.splice(myFish,0, 2, 'parrot', 'anemone', 'blue');
console.log(myFish);
console.log(removed);
// myFish is ['parrot', 'anemone', 'blue', 'trumpet', 'surgeon']
// removed is ['angel', 'clown']

// myFish is ['parrot', 'anemone', 'blue', 'trumpet', 'surgeon']
// removes 2 elements from index 2
removed = methods.splice(myFish,myFish.length -3, 2);
console.log(myFish);
console.log(removed);
// myFish is ['parrot', 'anemone', 'surgeon']
// removed is ['blue', 'trumpet']
