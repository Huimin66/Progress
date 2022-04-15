```TypeScript
let d;
d= true;
let s: string;
s=d

let u :unkown
s=u; //error
if(typeof string === "string") 
{
  s=u; // no problem
}

//or 
s= u as string
s=<string> u  

let b: {name:string; age?: number}
b={name: ""}  

let c:{name:string, [propName:string]:any}  

let d:(a: number, b:number)=>number  

let e:string[];

let f:Array<number>;  

//tuple
let h:[string, number];  

enum Gender{
  Male=0;
  Female=1;
}  

let j: {name: string}&{age:number};
type myType=1|2|3|4|5;
let k: myType;
let l: myType;  

class Person{
  readonly name:string ='leo';
  static age: numer = 18;
  sayHello(){
    console.log(`Hello，I am ${this.name}`);
  }
  static printName(){
    console.log(`Hello，I am ${this.name}`);
  }
}  

const p = new Person();
console.log(p.name);
console.log(p.age);
console.log(p.sayHello);
console.log(Person.printName);


```

