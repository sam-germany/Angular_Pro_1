import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Subject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';



export interface AuthResponseData22 {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http22: HttpClient,
              private router: Router) {}


  signup22(email: string, password: string) {
   return this.http22
      .post<AuthResponseData22>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey22,
    {
           email: email ,
           password: password,
           returnSecureToken: true
         }
      ).pipe( catchError(this.handleError22), tap( respData => {

        this.handleAuthentication(respData.email, respData.localId, respData.idToken, +respData.expiresIn);
      }));
  }

  login22(email: string, password: string) {

    return this.http22.post<AuthResponseData22>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey22,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError22), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }


  autoLogin22() {
    const userData: { email: string;
                      id: string; _token: string;
                     _tokenExpirationDate: string; }   = JSON.parse(localStorage.getItem('userData22'));

    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout22(expirationDuration);
    }
  }


  logout22() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData22');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout22(expirationDuration: number) {
   this.tokenExpirationTimer = setTimeout( () => {
      this.logout22();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

    const expirationDate = new Date(new Date().getTime() +  expiresIn * 1000);
    const user2 = new User(email, userId, token, expirationDate);
    this.user.next(user2);
    this.autoLogout22(expiresIn *1000);
    localStorage.setItem('userData22', JSON.stringify(user2));

  }

  private handleError22(errorRes: HttpErrorResponse) {
          let errorMessage = 'An unknow error occurred';

        if(!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':  errorMessage = 'This email exists already';
          break;
          case 'INVALID_PASSWORD':  errorMessage = 'Password is invalid';
          break;
          case 'USER_DISABLED':  errorMessage = 'User is disabled';

        }
        return throwError(errorMessage);
      }






}
