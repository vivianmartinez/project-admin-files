import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-file',
  templateUrl: './detail-file.component.html',
  styleUrls: ['./detail-file.component.css']
})
export class DetailFileComponent {

  @Input()
  item_file: any;

  constructor() {}

}
