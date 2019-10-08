import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';
import { ErrorHandler, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DemoModalComponent } from './demo-modal/demo-modal.component';

export class CustomRequestConfig<T> extends HttpRequest<any> {
  locallyHandledErrors?: (responseError: HttpErrorResponse) => boolean | number[];
}

export class InterceptorHttpParams extends HttpParams {
  constructor(
    public interceptorConfig: { statusCodesToIgnore?: (responseError: HttpErrorResponse) => boolean | number[] },
    params?: { [param: string]: string | string[] }
  ) {
    super({fromObject: params} as HttpParamsOptions); // Passes through the HttpParams
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  private _defaultErrorHandler: ErrorHandler;

  constructor(private _ngbModal: NgbModal) {
    this._defaultErrorHandler = new ErrorHandler();
  }

  public intercept(request: CustomRequestConfig<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 401) {
          if (request.params instanceof InterceptorHttpParams) {
            if (Array.isArray(request.params.interceptorConfig.statusCodesToIgnore)) {
              if (request.params.interceptorConfig.statusCodesToIgnore.some(errorCode => errorCode === err.status)) {
                return throwError(err);
              }
            } else if (request.params.interceptorConfig.statusCodesToIgnore(err)) {
              return throwError(err);
            }
          }
          this._openModal(err);
        }
        return throwError(err);
      })
    );
  }

  private _openModal(errorResponse: HttpErrorResponse): Observable<any> {
    const modalRef =  this._ngbModal.open(DemoModalComponent);
    return modalRef.componentInstance;
  }
}
