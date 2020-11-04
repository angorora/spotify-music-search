import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { catchError, tap } from 'rxjs/operators';
import { ApiError, HTTPError } from '../../store/error/error.actions';
import { AuthState } from '../../store/auth/auth.state';
import { environment } from 'src/environments/environment';
import { GetToken } from 'src/app/store/auth/auth.actions';
@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private store: Store, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('token')) {
      if (!req.headers.has('Content-Type')) {
        req = req.clone({
          headers: req.headers.set('Content-Type', 'application/json'),
        });
      }
      req = this.addAuthTokenToHeaders(req);
    } else {
      req = req.clone({
        headers: req.headers.set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      });
      req = this.addBasicAuthHeaders(req);
    }
    return next.handle(req).pipe(
      tap((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse && response.status === 200) {
          if (!response.body.success)
            this.store.dispatch(
              new ApiError({ status: 200, message: response.body.message })
            );
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.router.navigateByUrl('/error');
        }
        return this.store.dispatch(new HTTPError(error));
        throwError(error);
      })
    );
  }
  private addAuthTokenToHeaders(req: HttpRequest<any>): HttpRequest<any> {
    let token = this.store.selectSnapshot<string>(AuthState.token);

    // If we dont have a token then we have nothing to add to the header
    if (!token) {
      return req;
    }
    //TODO If you are calling an outside domain then do not add the token.

    return (req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    }));
  }

  private addBasicAuthHeaders(req: HttpRequest<any>): HttpRequest<any> {
    const clientId: string = environment.clientId;
    const clientSecret: string = environment.clientSecret;
    return req.clone({
      headers: req.headers.set(
        'Authorization',
        `Basic ${btoa(
          environment.clientId.concat(':', environment.clientSecret)
        )}`
      ),
    });
  }
}
