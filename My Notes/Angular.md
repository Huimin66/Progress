 ***Chapter 1***  
 **create a new component**  
`ng g component components/news`

**execute**   
`ng serve --open`

**use variables**  
```TypeScript
export class NewsComponent implements OnInit {
    public title = "i am news component"
    private username:string = 'abc'
    public student:object={
        username:'zhang'
    }
    public content="<h2>I am a html label</h2>"
```  
```HTML
 <div [title]="title"></div>
 <div>{{username}}</div>
 <div [innerHTML]="content"></div>
<div [innerHTML]="content"></div>
```  
**for loop**  
 ```TypeScript
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
 ```HTML
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
 
**use image**  
 ```TypeScript
public picUrl="https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
 ```  
```HTML
<!-- image positon: src-> assets-> images -->
<img src="assets/images/01.png" alt="favorite">
<img [src]="picUrl"/>
 ```  
 
**get index from for loop**  
 ```TypeScript
 public newsList:any[]=[
        {
            'title': 'I am new 1'
        },
        {
            'title': 'I am new 2'
        },
        {
            'title': 'I am new 3'
        }
    ]
 ```
 ```HTML  
  <ul>
    <li *ngFor="let item of newsList; let key=index;">
        {{key}}---{{item.title}}
    </li>
  </ul>
 ```
  
**use if**  
```TypeScript
public flag: boolean = true
```
```HTML
<div *ngIf="flag">
    <img src="assets/image/01.png" alt="">
</div>
<div *ngIf="!flag">
    <img src="assets/image/02.png" alt="">
</div>
 ```  
 
**use if else** 
```css
.red{
    color: red;
}
```

```HTML
<ul>
    <li *ngFor="let item of newsList; let key=index;">
        <span *ngIf="key==1" class="red">{{key}}---{{item.title}}</span>
        <span *ngIf="key!=1">{{key}}---{{item.title}}</span>
    </li>
</ul>
```
**use switch**  
```TypeScript
public score:number = 2
```
```HTML
<ul [ngSwitch]="score">
    <li *ngSwitchCase="1">paid</li>
    <li *ngSwitchCase="2">order confirmed</li>
    <li *ngSwitchCase="3">shipped</li>
    <li *ngSwitchDefault>invalid</li>
</ul>
```
 
 **ngClass ngStyle**  
```HTML
<div [ngClass]="{red: true}">
    ngClass show
</div>
```
