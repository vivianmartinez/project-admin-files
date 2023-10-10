import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadFilesService {

  constructor() { }

  static downloadFile(path:string,name:string):void{
    const link_download  = document.createElement('a');
    link_download.href   = `${path}${name}`;
    link_download.target = '_blank';
    link_download.download = name;

    document.body.appendChild(link_download);
    link_download.click();
    document.body.removeChild(link_download);
  }

}
