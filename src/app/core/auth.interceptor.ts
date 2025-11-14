import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  // add x-api-key header
  req = req.clone({
    setHeaders: {
      'x-api-key': '1234567890',
    },
  });
  console.log(req);
  console.log(token);
  console.log(token, 'sa');
  return next(req);
};
