import { Component, Input } from '@angular/core';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-detail-file',
  templateUrl: './detail-file.component.html',
  styleUrls: ['./detail-file.component.css']
})
export class DetailFileComponent {

  @Input()
  item_file: any;
  faLine = faFileLines;
  constructor() {}

}
