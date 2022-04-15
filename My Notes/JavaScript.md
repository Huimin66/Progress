**How do you make an object?** 
```JavaScript
1, Creating Objects
Declaration: Using object literal
const person = { 
    name: 'John',
    age: 20,
}
```
2, Instantiation: Create an Object using Instance of Object Directly
```JavaScript
const person = new Object ({ 
    name: 'John',
    age: 20,
})
```

3, Initialization: Create an object using Constructor Function
```JavaScript
function Person(name, age) {
    this.name = name,
    this.age = age,
}
const person = new Person('John', 20);
```

**Objekt Destrukturierung:**  
```JavaScript
{x, y} = { name: 'leo', x: 100, y: 200};
// Error: Uncaught SyntaxError: Unexpected token =
```
Ein weiterer Unterschied ist, dass in diesem Fall der gesamte Zuweisungsausdruck in runde Klammern gefasst werden muss. Der Grund dafür ist, dass die geschweiften Klammern sonst als Anweisungsblock interpretiert würden.
```JavaScript
({x, y} = { name: '小明', x: 100, y: 200});
```
Szenen zu verwenden
```JavaScript
//variable tauschen
var x=1, y=2;
[x, y] = [y, x]
//get info 
var {hostname:domain, pathname:path} = location;
/*Zuweisungsausdrücke für Funktionsparameter 
Destrukturierungsausdrücke können nicht nur im Zusammenhang mit der Zuweisung von Eigenschaftswerten an Variablen oder Konstanten verwendet werden. 
Es können auch Objekte destrukturiert werden, die einer Funktion als Argument übergeben werden. 
Dabei wird der Destrukturierungsausdruck an der Stelle des Parameters der Funktion notiert, an der ein Objekt erwartet wird.*/

function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
buildDate({ year: 2017, month: 1, day: 1 });
//oder
buildDate({ year: 2017, month: 1, day: 1, hour: 20, minute: 15 });
```

**sort() ändert den Inhalt des Arrays**  
```JavaScript
var a1 = ['B', 'A', 'C'];
var a2 = a1.sort();
a1; // ['A', 'B', 'C']
a2; // ['A', 'B', 'C']
a1 === a2; // true
```

**Array every**  
```JavaScript
//array.map(callback[, thisObject]);
//every() gibt false zurück, wenn nicht jedes Element true zurück gibt.

var arr = ['Apple', 'pear', 'orange'];
console.log(arr.every(function (s) {
    return s.length > 0;
})); // true, bei jedes Element ist s.length>0

console.log(arr.every(function (s) {
    return s.toLowerCase() === s;
})); // false, nicht all Elemente kleingeschrieben

["a", "b", "c"].every(function(item, index, arr) {
    console.log(this);
}); // window

["a", "b", "c"].every(function(item, index, arr) {
    console.log(this);
}, "Apfelkuchen"); 
//[LOG] String {0: "A", 1: "p", 2: "f", 3: "e", 4: "l", 5: "k", 6: "u", 7: "c", 8: "h", 9: "e", …}

console.log(null == undefined); // true
```

JavaScript with Mosh：
```JavaScript
//Strict Equality(Type + Value)
console.log(x===1);
console.log(x !== 1);

//Lose Equality(Value)
console.log(1==1);  //true
console.log('1' == 1); //true
console.log((true == 1); //true

//Logical False：
//Falsy(False)
//undefined
//null
//0
//false
//''
//NaN
//Anything that is not Falsy -> Truthy

let userColor = "red"
let defaultColor = "blue"
let currentColor = userColor || defaultColor

//return instance members
console.log(Object.keys(c1))

//return all members(instance + prototype)
for(let index in c1){
    console.log(index)
}
```
**Object.defineProperty()**  
value
writable
enumrable
configurable

**Funktion definieren**  
```JavaScript
function fn(){}

let fn = function(){}

let fn = new Function("a", "b", "console.log(a+b)") 
f(1,2)
```

**apply**  
```JavaScript
let arr = [1,2,34,56,89]
let max = Math.max.apply(Math.arr)
```

JavaScript arguments
https://zhuanlan.zhihu.com/p/23007032
