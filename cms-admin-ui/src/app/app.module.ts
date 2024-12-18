import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { GlobalHttpInterceptorService } from './shared/interceptors/error-handler.interceptor';
import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import {AdminApiSeriesApiClient,AdminApiPostApiClient,AdminApiPostCategoryApiClient, ADMIN_API_BASE_URL, AdminApiAuthApiClient, AdminApiRoleApiClient, AdminApiTestApiClient, AdminApiTokenApiClient, AdminApiUserApiClient } from './api/admin-api.service.generated';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertService } from './shared/services/alert.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ToastModule } from 'primeng/toast';
import { environment } from '../environments/environment';
const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];
import { AuthGuard } from './shared/auth.guard';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { UtilityService } from './shared/services/utility.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UploadService } from './shared/services/upload.service';
import { BroadcastService } from './shared/services/boardcast.service';


@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    ToastModule,
    HttpClientModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    FormsModule,
  ],
  providers: [
    { provide: ADMIN_API_BASE_URL, useValue: environment.API_URL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    IconSetService,
    Title,
    MessageService,
    AlertService,
    AdminApiAuthApiClient,
    AuthGuard,
    AdminApiTestApiClient,
    AdminApiTokenApiClient,
    AdminApiRoleApiClient,
    DialogService,
    ConfirmationService,
    UtilityService,
    AdminApiUserApiClient,
    AdminApiPostCategoryApiClient,
    AdminApiPostApiClient,
    AdminApiSeriesApiClient,
    ConfirmationService,
    UploadService,
    BroadcastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
