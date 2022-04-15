**How do you make an object?** 
```JavaScript
Creating Objects
Declaration: Using object literal
const person = { 
    name: 'John',
    age: 20,
}
```
Instantiation: Create an Object using Instance of Object Directly
```JavaScript
const person = new Object ({ 
    name: 'John',
    age: 20,
})
```

Initialization: Create an object using Constructor Function
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

