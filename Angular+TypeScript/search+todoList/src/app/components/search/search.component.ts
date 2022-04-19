import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {StorageService} from '../../services/storage.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent implements OnInit {

  constructor(public storage:StorageService) { 
    let search = this.storage.get('searchlist')
  }

  public keywords = ''
  public historyList: Array<string>=[]

  @ViewChild('myBox') myBox!:ElementRef | undefined

  ngOnInit(): void {
    let searchList = this.storage.get('searchlist')
    if(searchList){
      this.historyList=searchList
    }
  }
  ngAfterViewInit(){
    if(this.myBox){
        this.myBox.nativeElement.style.color='red'
    }
  }

  doSearch(){
    if(this.historyList.indexOf(this.keywords) === -1)
    {
      this.historyList.push(this.keywords)

      this.storage.set('searchlist',this.historyList)
      console.log(this.historyList)
    }
    this.keywords=''
  }

  deleteHistory(key:number){
    this.historyList.splice(key,1)
  }
}
