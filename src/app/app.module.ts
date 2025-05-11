import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// search module
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutsModule} from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";

// Auth
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';
import { ErrorInterceptor } from './core/helpers/error.interceptor';

// Language
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Store
import { rootReducer } from './store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { AuthenticationService } from './core/services/auth.service';
import { AuthInitService } from './initializer/auth-init.service';
import { AuthInterceptor } from './core/helpers/jwt.interceptor';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Factory function for APP_INITIALIZER
function initializeKeycloak(authInitService: AuthInitService) {
  return () => authInitService.initializeApp();
}



@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], 
    imports: [TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        BrowserModule,
        KeycloakAngularModule,
        AppRoutingModule,
        LayoutsModule,
        PagesModule,
        StoreModule.forRoot(rootReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        NgPipesModule], providers: [
          {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [AuthInitService]
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: KeycloakBearerInterceptor,
            multi: true
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true // Important: allows multiple interceptors
          },
          KeycloakService,
          AuthenticationService,
          AuthInitService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
