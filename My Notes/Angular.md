 create a new component
`ng g component components/news`

execute 
`ng serve --open`

ts class:
`export class NewsComponent implements OnInit {`
    `public title = "i am news component"`
    `private username:string = 'abc'`
    `public student:object={`
        `username:'zhang'`
    `}`

  `constructor() {` 
      `this.username='wang'`
  `}`

  `ngOnInit(): void {`
  `}`

`}`

use variables in html
`<div [title]="title"></div>`
`<div>{{username}}</div>`
