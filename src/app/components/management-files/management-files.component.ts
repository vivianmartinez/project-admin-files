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

    constructor(private _manageFiles: ManageFilesService) {
      this.files = [];
    }

    ngOnInit(): void {
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
}
