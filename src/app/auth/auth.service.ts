import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { Router } from '@angular/router';
import * as interfaces from '../interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  user: any = {};
  loggedUser: any;
  public loginStatus = new BehaviorSubject<boolean>(false);
  public get auth(){
    return this.loggedUser
  }
  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.loginStatus.subscribe(result =>{
      console.log(result)
    })
  }

  checkLoginStatus(){
    return this.loginStatus.asObservable()
  }

  signIn(user: any) {
    this.http
      .post<any>('https://organizateunpoco.herokuapp.com/api/user/signin', user)
      .pipe(
        map((res) => res.response),
        tap(
          res => {
            localStorage.setItem('user', res.token);
          }
        ))
          .subscribe((user) => {
            //redirectionarrrr
            if(user._id){
              this.loggedUser = user
              this.snackBar.open(`Hola ${user.firstName}!`, ':)', {duration: 2500})
          this.loginStatus.next(true)
          this.router.navigate(['./home'])
        }else{
          this.snackBar.open(user, 'Oops!', {duration: 2000})

        }
        
      });
  }

  signUp(user: interfaces.SignUpUser) {
    this.http
      .post<any>('https://organizateunpoco.herokuapp.com/api/user/signup', user)
      .pipe(
        map((res) => res.response),
        // tap(
        //   res => localStorage.setItem('user', res.token)
        // )
        )
      .subscribe((user) => {
        if(user._id){
          this.snackBar.open('Cuenta creada, inicie sesión', 'Ok', {duration: 2000});
          this.router.navigate(['./home'])
        }else{
          this.snackBar.open('Probá con otro mail!', 'Oops', {duration: 2000});
        }
      });
  }

  logOut(){
    this.snackBar.open(`Nos vemos pronto, ${this.loggedUser.firstName}!`, '', {duration:2000})
    this.loggedUser = null
    localStorage.clear()
    this.router.navigate(['./auth/login'])
    this.loginStatus.next(false)
  }

  verificaAutenticacion(){
    if(!localStorage.getItem('user')){
      return of(false)
    }else{
      //ejectutar el post para loguearse desde localstorage
      return of(true)
    }
  }

  verificaLog(){
    if(localStorage.getItem('user')){
      return of(false)
    }else{
      //ejectutar el post para loguearse desde localstorage
      return of(true)
    }
  }

  logFromLS(token){
    this.http.post<any>('https://organizateunpoco.herokuapp.com/api/user/preserve', {token}, {
      headers:{
        Authorization: 'Bearer ' + token
    }
    }).subscribe( res => {
      if(res.response){
        this.loginStatus.next(true)
        this.loggedUser = res.response
      }
    }, error => {
      localStorage.clear()
      console.error(error)
      this.snackBar.open('Inicia sesión, por favor', 'Ok', {duration: 2000})
      this.router.navigate(['./auth/login'])

    }
    )
  }
}
