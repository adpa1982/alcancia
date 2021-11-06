import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-create',
  templateUrl: './buttons-create.component.html',
  styleUrls: ['./buttons-create.component.css']
})
export class ButtonsCreateComponent implements OnInit {

  @Input() link: '/dashboard' ;

  @Output() saveClicked = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void { }

  onClickButton(event: any): void {
    this.saveClicked.emit(event);
  }

}
