import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './app/core/auth.interceptor';
import { provideNgToast } from 'ng-angular-popup';
import { provideZoneChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgToast({
      position: 'toaster-top-right',
      duration: 3000, // 3 seconds in milliseconds
      maxToasts: 3, // Max 3 toasts at once
      width: 400, // Toast width in pixels
      showProgress: true, // Show progress bar
      dismissible: true, // Allow manual dismiss
      showIcon: true, // Show icons
      enableAnimations: true, // Enable animations
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
