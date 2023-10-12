import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteFilesService {

  private current_route = new BehaviorSubject<string>('files');
  current_route$ = this.current_route.asObservable();

  constructor() { }

  setDirectory(route:any):void{
    this.current_route.next(route);
  }
}
