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

 **ngStyle**  
 ```TypeScript
public attr:string='red'
```
```HTML
<p [ngStyle]="{'color': 'red'}">
    I am p label
</p>
```  

 **pipe**   
```TypeScript
public today = new Date()
```
 ```HTML
<p>{{title | uppercase}}</p>
<p>{{title | lowercase}}</p>

<p>{{today | date:'yyyy-MM-dd HH:mm:ss'}}</p>
``` 

 **event click**   
 ```TypeScript
getTitle(){
    alert(this.title)
}
setTitle(){
    this.title='Title changed'
}
```
 ```HTML
<strong>{{title}}</strong>
<button (click)="getTitle()">get title</button>
<button (click)="setTitle()">set title</button>
```  
 **event keydown**   
 ```TypeScript
keyDown(event:any){
    console.log(event.target)
}
```
```HTML
<input type="text" (keydown)="keyDown($event)"/>
```

**ngModel**  
Creates a FormControl instance from a domain model and binds it to a form control element.  
```TypeScript
//import FormModule in app.module.ts
import{FormsModule} from '@angular/forms'
//define a variable in xxx.component.ts
public keywords:string = ''
@NgModule({ 
//....
imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
],
```
```HTML
<-- use ngModel in xxx.component.html !-->
<input type="text" [(ngModel)]="keywords" />
```  

Defining a name attribute is a requirement when using [(ngModel)] in combination with a form.

**use service**  
terminal 
```TypeScript
ng g service services/storage
```
app.mudule.ts 
```TypeScript
import {StorageService} from './services/storage.service'

providers: [StorageService],
```
storage.service.ts
```TypeScript
  get(){
    console.log("this is a service")
  }
```
search.component.ts 
```TypeScript
import {StorageService} from '../../services/storage.service'
 constructor(public storage:StorageService) { 
    let search = this.storage.get()
    console.log(search) //this is a service
  }
```
**ngOnInit()**  
die Initialisierung der Komponente oder Direktive abgeschlossen 

**ngAfterViewInit()  @ViewChild**
Called after ngAfterContentInit when the component's view has been initialized.
Applies to components.
Add 'inplements AfterViewInit' to the class.
```TypeScript
import { Component, OnInit, ViewChild } from '@angular/core';
//...
@ViewChild('myBox') myBox:ElementRef | undefined
@ViewChild('header') myBox:ElementRef | undefined
//...
ngAfterViewInit(){
    if(this.myBox){
        this.myBox.nativeElement.style.color='red'
    }
}

this.header.run()
```
```HTML
<div #myBox>
    i am myBox
</div>

<app-header #header></app-header>
```

**Informationnen über Property-Bindings vom Parent übergeben**  
```HTML
<-- home.component.html !-->
<app-header [title]="title" [msg]=""></app-header>

<-- header.component.html !-->
<header>{{title}}</header>
```
```TypeScript
//home.component.ts
public title:string="Home Title"

//header.component.ts
import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
@Input() title:string
```

**Output child send info to parent**  
```HTML
<-- child.component.html !-->
<button (click)="sendToParent()">Send Information to Parent</button>

<-- parent.component.html !-->
<app-child (outer)="run($event)"></app-child>
```
```TypeScript
//child.component.ts
import { Output, EventEmitter} from '@angular/core';
...
@Output() private outer = new EventEmitter()
...
sendToParent(){
    this.outer.emit("some data from child component")
}
```

***Der Lebenszyklus einer Komponente***  
ngOnChanges
```
Wichtig: Der erste ngOnChanges-Aufruf erfolgt bereits vor ngOnInit!
```
ngOnInit
```
Wollt ihr jedoch einfach nach dem Initialisieren der Inputs einmalig eine Funktion ausführen, bietet sich der ngOnInit-Hook an.
Hinweis: Im Konstruktor einer Komponente sollte nur zur Dependency Injection genutzt werden. 
Alles andere kann in den ngOnInit Hook verschoben werden.
Wichtig: Der ngDoCheck Hook wird immer dann ausgeführt, wenn die Komponente ihre Eingabewerte auf Änderungen prüfen soll. 
Dies kann je nach aktiver Change Detection Strategie sehr häufig passieren.
```
ngDoCheck  
```
Wichtig: Der ngDoCheck Hook wird immer dann ausgeführt, wenn die Komponente ihre Eingabewerte auf Änderungen prüfen soll. 
Dies kann je nach aktiver Change Detection Strategie sehr häufig passieren.
Die eigene Change Detection Funktion sollte daher sehr performant implementiert werden, 
um die weitere Ausführung der Anwendung nicht zu blockieren.
```
ngAfterContentInit  
ngAfterContentChecked  
ngAfterViewInit  
ngAfterViewChecked  
ngOnDestroy  

*Ausführungsreihenfolge*  
<img src="https://angular.de/artikel/angular-2-component-lifecycle/lifecycle-hooks-init.png" height="420px" width="400px" />

Wenn die Change Detection an einer Komponente nach der Initialisierung angestoßen wird, 
haben wir den Zugriff auf folgende Hooks innerhalb dieser Komponente.  
<img src="https://angular.de/artikel/angular-2-component-lifecycle/lifecycle-hooks-change.png" height="350px" width="330px" />

**send Http request, use HttpClientModule**  
```TypeScript
//app.module.ts
import{HttpClientModule} from '@angular/common/http'
imports:[
    BrowserModule,
    HttpClientModule
]
//home.component.ts
import{HttpClient} from '@angular/common/http'
import{HttpHeaders} from '@angular/common/http' //post
...
constructor(public http:HttpClient){
    
}
...
let api = "http://a.b.c"
this.http.get(api).subscribe(responde=>{
    console.log(responde)
})
...
const httpOptions={
    headers:new HttpHeaders({'Conten-Type': 'application/json'})
}
let api = "http://a.b.c"
this.http.post(api, {username:"jone", age"20"}, httpOptions).subscribe(response=>{
    console.log(response)
});
```
**Route**  
1,choose route module when create the project.  
2, app-routing.module.ts 
```TypeScript
import {NewsComponent} from './components/news/new.component'
import {HomeComponent} from './components/news/home.component'
import {ProductComponent} from './components/news/product.component'
...
import {WelcomeComponent} from './components/home/welcome/welcome.component'
import {WelcomeComponent} from './components/home/settting/setting.component'
...
const routes: Routes=[
    {
        path:'new', component:NewComponent
    },
    {
        path:'home', component:HomeComponent
        children:[
            {
                {path:'welcome', component:WelcomComponent},
                {path:'setting', component:SettingComponent},
                {path:'**', component:WelcomComponent}
            }
        ]
        
    },
    {
        path:'product', component:ProductComponent
    },
    {
        path:'**', redirectTo:'home'
    }
]
```
```HTML
<-- app.component.html!-->
<header class="header">
    <a [routerLink]="['/home']" routerLinkActive="active"></a>
    <a [routerLink]="['/news']" routerLinkActive="active"></a>
    <a [routerLink]="['/product']" routerLinkActive="active"></a>
    <-- or -->   
    <a routerLink="/home"></a>
</header>
<router-outlet></router-outlet>
```  
```HTML
<-- home.component.html!-->
<div class="left">
    <a [routerLink]="['/home/welcome']" routerLinkActive="active"></a>
    <a [routerLink]="['/home/setting']" routerLinkActive="active"></a>
</div>
<div class="right">
    <router-outlet></router-outlet>
</div>
```

 







