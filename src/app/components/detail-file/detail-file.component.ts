import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { faCheckCircle, faFile, faTrash, faRectangleXmark, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen, faEdit } from '@fortawesome/free-regular-svg-icons';
import { ManageFilesService } from 'src/app/services/manage-files.service';
import { RouteFilesService } from 'src/app/services/route-files.service';
import { GlobalUrlApi } from 'src/app/services/global-url-api';
import { DownloadFilesService } from 'src/app/services/download-files.service';
import { Subscription } from 'rxjs';

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

  faFile        = faFile;
  faTrash       = faTrash;
  faEdit        = faEdit;
  faFolderOpen  = faFolderOpen;
  faCheck       = faCheckCircle;
  faXmark       = faRectangleXmark;
  faBookOpen    = faBookOpen;

  public confirm_edit: boolean = false;
  public rename_file: string = '';
  public current_route: any;
  public url_api = GlobalUrlApi.url_api;
  private subscription: Subscription = new Subscription();

  constructor(private _manageFile: ManageFilesService, private _routeFileService: RouteFilesService) { }

  ngOnInit(): void{
    this.subscription = this._routeFileService.current_route$.subscribe((res:any)=>{
      this.current_route = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(item_file:any):void
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
      this.confirm_edit = true;
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
      this.refresh.emit();
    });
  }

  abortEdit():void
  {
    this.confirm_edit = false;
  }

  nextDirectory(route:any):void
  {
    this.current_route += `/${route}`;
    this._routeFileService.setDirectory(this.current_route);
  }

  public openFile(name:string):void
  {
    DownloadFilesService.downloadFile(`${this.url_api}${this.current_route}/`,name);
  }
}
