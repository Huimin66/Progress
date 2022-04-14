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
```
