import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageFilesService } from 'src/app/services/manage-files.service';
import { Subscription } from 'rxjs';
import { RouteFilesService } from 'src/app/services/route-files.service';

@Component({
  selector: 'app-management-files',
  templateUrl: './management-files.component.html',
  styleUrls: ['./management-files.component.css']
})
export class ManagementFilesComponent implements OnInit, OnDestroy{
    private subscription: Subscription = new Subscription();
    public files: any;
    public extensions_allowed = ['.jpg','.png','.gif','.txt','.pdf','.csv'];
    public upFile: File | any;
    public route_current: any;

    constructor(private _manageFiles: ManageFilesService, private _routeFileService: RouteFilesService) {
      this.files = [];
    }

    ngOnInit(): void {

      this._routeFileService.current_route$.subscribe((res:any)=>{
        console.log(res)
        this.requestApi(res);
        this.route_current = res;
      });
    }

    requestApi(route:any){
      const params = {'route': route}
      this.subscription = this._manageFiles.getListFiles(params).subscribe((res:Array<object>) => {
        const result = res.map(item=>{
          return JSON.parse(JSON.stringify(item))
        });
        this.files = [...result];
      });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    refreshItems(){
      this._routeFileService.current_route$.subscribe((res:any)=>{
        console.log(res)
        this.requestApi(res);
      });
    }

    uploadFile(event: any){
        this.upFile = event.target.files[0];
        console.log(this.upFile);
    }

    onSubmit(data:any){
      const form_data = new FormData();
      form_data.append('file', this.upFile);
      form_data.append('route', this.route_current);

      this._manageFiles.saveFile(form_data).subscribe((res:any)=>{
        console.log(res)
        this.refreshItems();
      });

    }

    backDirectory():void
    {
      const back_route = this.route_current.slice(0,this.route_current.lastIndexOf('/'));
      console.log(back_route);
      this._routeFileService.setDirectory(back_route);
    }
}
