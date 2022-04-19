import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OrderFood';

  
}

interface Person {
    name: string ;
    age: string;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: "25",
    gender: 'male'
};