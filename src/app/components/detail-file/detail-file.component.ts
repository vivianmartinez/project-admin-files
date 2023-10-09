import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
import { ManageFilesService } from 'src/app/services/manage-files.service';
import { RouteFilesService } from 'src/app/services/route-files.service';

interface filemodel
{
  name_file: string,
  type_file: string,
  size_file: string,
  route: string,
  root: string
}


@Component({
  selector: 'app-detail-file',
  templateUrl: './detail-file.component.html',
  styleUrls: ['./detail-file.component.css']
})
export class DetailFileComponent implements OnDestroy, OnInit {

  @Input()
  item_file: any;

  @Output()
  refresh: EventEmitter<number> = new EventEmitter();

  faFile  = faFile;
  faTrash = faTrash;
  faEdit  = faEdit;
  faArrow = faCaretSquareDown;

  public on_edit: boolean = false;
  public rename_file: string = '';
  public current_route: any;

  constructor(private _manageFile: ManageFilesService, private _routeFileService: RouteFilesService ) { }

  ngOnInit(): void{
    this._routeFileService.current_route$.subscribe((res:any)=>{
      this.current_route = res;
    });
  }

  ngOnDestroy(): void {

  }

  delete(item_file:any)
  {
    const params = {
      'route' : item_file.route,
      'name_file' : item_file.name_file
    }
    this._manageFile.deleteFile(params).subscribe((res:any)=>{
      this.refresh.emit();
    });
  }

  onEdit(file:any):void
  {
      this.on_edit = true;
      this.rename_file = file;
  }

  renameFile(current_file:any):void
  {
    const params =
    {
      'route' : current_file.route,
      'old_name' : current_file.name_file,
      'rename': this.rename_file
    }
    this._manageFile.renameFile(params).subscribe((res:any)=>{
      console.log(res);
      this.refresh.emit();
    });
  }

  nextDirectory(route:any):void
  {
    this.current_route += `/${route}`;
    this._routeFileService.setDirectory(this.current_route);
    console.log(this.current_route);
  }
}
