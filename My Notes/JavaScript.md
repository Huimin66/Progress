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
Destrukturierungsausdrücke können nicht nur im Zusammenhang mit der Zuweisung von Eigenschaftswerten an Variablen oder Konstanten verwendet werden. Es können auch Objekte destrukturiert werden, die einer Funktion als Argument übergeben werden. Dabei wird der Destrukturierungsausdruck an der Stelle des Parameters der Funktion notiert, an der ein Objekt erwartet wird.*/
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
buildDate({ year: 2017, month: 1, day: 1 });
//oder
buildDate({ year: 2017, month: 1, day: 1, hour: 20, minute: 15 });

```








