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
public picUrl="https://www.theodinproject.com/assets/home-isometric-eebc110218cbdb1460dd2dfc662a4e96ae94747667dc81da422804ef55cfd2d8.svg"
 ```  
```HTML
<!-- image positon: src-> assets-> images -->
<img src="assets/images/01.png" alt="favorite">
<img [src]="picUrl"/>
 ```  
 
 get index form for loop  
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
  
  use boolean  
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
 
