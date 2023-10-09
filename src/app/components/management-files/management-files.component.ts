import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageFilesService } from 'src/app/services/manage-files.service';
import { Subscription } from 'rxjs';

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

    constructor(private _manageFiles: ManageFilesService) {
      this.files = [];
    }

    ngOnInit(): void {
      this.requestApi();
    }

    requestApi(){
      this.subscription = this._manageFiles.getListFiles().subscribe((res:Array<object>) => {
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
      this.requestApi();
    }

    uploadFile(event: any){
        this.upFile = event.target.files[0];
        console.log(this.upFile);
    }

    onSubmit(data:any){
      const form_data = new FormData();
      form_data.append('file', this.upFile);

      this._manageFiles.saveFile(form_data).subscribe((res:any)=>{
        console.log(res)
        this.refreshItems();
      });

    }
}
