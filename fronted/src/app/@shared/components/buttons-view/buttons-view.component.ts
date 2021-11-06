import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons-view',
  templateUrl: './buttons-view.component.html',
  styleUrls: ['./buttons-view.component.css']
})
export class ButtonsViewComponent implements OnInit {

  @Input() link: '/dashboard';

  @Input() link2: '/dashboard';

  @Input() amount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
