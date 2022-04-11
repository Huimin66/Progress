 ***Chapter 1***  
 create a new component  
`ng g component components/news`

execute   
`ng serve --open`

ts class: 
```TypeScript
export class NewsComponent implements OnInit {
    public title = "i am news component"
    private username:string = 'abc'
    public student:object={
        username:'zhang'
    }
    public content="<h2>I am a html label</h2>"
    arr=['111','222','333']
    arr2:Array<any>=['abc', 123]
    list:any[]=['def', 456]
    userList:any[]=[
        {
            username:'Joe',
            age:20
        },
        {
            username:'Sam',
            age:30
        }
    ]

    cars:any[]=[
        {
            brand:'bmw',
            list:[
                {
                    seriel:'bmw x1',
                    price:10000
                },
                {
                    seriel:'bmw x2',
                    price:20000
                },
                {
                    seriel:'bmw x3',
                    price:30000
                }
            ]
        }
    ]
  constructor() { 
      this.username='wang'
  }

  ngOnInit(): void {
  }
}
```  

use variables in html  
```HTML
 <div [title]="title"></div>
 <div>{{username}}</div>
 <div [innerHTML]="content"></div>
<div [innerHTML]="content"></div>
<ul>
    <li *ngFor="let item of arr">{{item}}</li>
</ul>
<ul>
    <li *ngFor="let item of arr2">{{item}}</li>
</ul>
<ul>
    <li *ngFor="let item of list">{{item}}</li>
</ul>
<ul>
    <li *ngFor="let item of userList">
        {{item.username}}
        {{item.age}}
    </li>
</ul>
<ul>
    <li *ngFor="let item of cars">
        <h2>{{item.brand}}</h2>
        <ol>
            <li *ngFor="let item of item.list">
                {{ item.seriel}}
            </li>
        </ol>
    </li>
</ul>
```

 ***Chapter 2***  
 
