import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  constructor(public storage:StorageService) { 
    let todoList = this.storage.get('todoList')
  }

  public keywords:string = ''
  public todoList:any=[]

  ngOnInit(): void {
  }

  doAdd(event:KeyboardEvent ){
    if(event.key==="Enter"){
      this.todoList.push(
        {
          title:this.keywords,
          status:0 //0 todo, 1 finished
        }
      )
      this.keywords=''
    }
    
  }

  deleteList(key:number){
    this.todoList.splice(key,1)
  }

  checkBoxChange(){
    this.storage.set('todoList', this.todoList)
  }
}

