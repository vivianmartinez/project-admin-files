import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ManageFilesService } from 'src/app/services/manage-files.service';
import { Subscription } from 'rxjs';
import { RouteFilesService } from 'src/app/services/route-files.service';
import { faUpload, faServer, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-management-files',
  templateUrl: './management-files.component.html',
  styleUrls: ['./management-files.component.css']
})
export class ManagementFilesComponent implements OnInit, OnDestroy{

    public files: any;
    public extensions_allowed = ['.jpg','.png','.gif','.txt','.pdf','.csv','.pptx','.doctx'];
    public upFile: File | any;
    public onUpFile: boolean = false;
    public route_current: any;
    public message_error: string | null = null;
    private subscription: Subscription = new Subscription();
    private subs_route: Subscription = new Subscription();
    private subs_save: Subscription = new Subscription();

    faUpload = faUpload;
    faServer = faServer;
    faSortUp = faSortUp;

    @ViewChild('inputFile',{read:ElementRef}) inputFile:any;

    constructor(private _manageFiles: ManageFilesService, private _routeFileService: RouteFilesService) {
      this.files = [];
    }

    ngOnInit(): void {
      //get current route
      this.subscription = this._routeFileService.current_route$.subscribe((res:any)=>{
        this.requestApi(res);
        this.route_current = res;
      });
    }

    requestApi(route:any){
      const params = {'route': route}
      this.subscription = this._manageFiles.getAllFiles(params).subscribe((res:Array<object>) => {
        const result = res.map(item=>{
          return JSON.parse(JSON.stringify(item))
        });
        this.files = [...result];
      });
    }

    ngOnDestroy(): void {
     this.subscription.unsubscribe();
     this.subs_route.unsubscribe();
     this.subs_save.unsubscribe();
    }
    //refresh data
    refreshItems(){
      this.subs_route = this._routeFileService.current_route$.subscribe((res:any)=>{
        this.requestApi(res);
        this.reset();
      });
    }
    //reset errors and desabled upload button
    reset(){
      this.onUpFile = false;
      this.upFile = null;
      this.message_error = null;
      this.inputFile.nativeElement.value = '';
    }
    // get event change on input
    uploadFile(event: any){
        this.upFile = event.target.files[0];
        this.onUpFile = true;
    }
    //send file API
    onSubmit(data:any){
      const form_data = new FormData();
      form_data.append('file', this.upFile);
      form_data.append('route', this.route_current);
      this.subs_save = this._manageFiles.saveFile(form_data).subscribe((res:any)=>{
        this.refreshItems();
        if(res.hasOwnProperty('file_exists')){
          if(res.file_exists){
            this.message_error = res.message;
            this.onUpFile = false;
          }
        }
      });
    }
    // back to the previous route
    backDirectory():void
    {
      const back_route = this.route_current.slice(0,this.route_current.lastIndexOf('/'));
      this._routeFileService.setDirectory(back_route);
    }
}
