import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-update',
  templateUrl: './buttons-update.component.html',
  styleUrls: ['./buttons-update.component.css']
})
export class ButtonsUpdateComponent implements OnInit {

  @Input() link: '/dashboard' ;

  @Output() updateClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {  }

  onClickButton(event: any): void {
    this.updateClicked.emit(event);
  }

}
