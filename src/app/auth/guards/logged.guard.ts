import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import{AuthService } from '../auth.service'

@Injectable({
    providedIn: 'root'
  })

  export class LoggedGuard implements CanLoad, CanActivate {

    constructor(private authService: AuthService, private router: Router){}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.authService.verificaLog().pipe(
          tap(res => {
            if(!res){
              this.router.navigate(['./home'])
            }
          })
        )
    }
    canLoad(
      route: Route,
      segments: UrlSegment[]): Observable<boolean> | boolean  {
        return this.authService.verificaLog().pipe(
          tap(res => {
            if(!res){
              this.router.navigate(['./home'])
            }
          })
        )
    }
  }