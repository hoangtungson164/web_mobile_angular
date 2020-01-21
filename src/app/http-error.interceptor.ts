import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: There is problem with your app. Please reload or try another device.`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: There is problem with the server.` +
                        ` Please wait a minute or contact the help for more information.`;
                    }
                    window.alert(errorMessage);
                    return throwError(errorMessage);
                })
            );
    }
}
