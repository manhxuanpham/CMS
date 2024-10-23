import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SystemRoutingModule } from './system-routing.module';
import { UserComponent } from './users/user.component';
import { RoleComponent } from './roles/role.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RolesDetailComponent } from './roles/roles-detail.component';
import { CmsSharedModule } from 'src/app/shared/modules/cms-share.module';
import { PermissionGrantComponent } from './roles/permission-grant.component';

import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  imports: [
    SystemRoutingModule,
    TableModule,
    ProgressSpinnerModule,
    BlockUIModule,
    PaginatorModule,
    PanelModule,
    CheckboxModule,
    InputTextModule,
    SharedModule,
    ButtonModule,
    KeyFilterModule,
    SharedModule,
    CmsSharedModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  declarations: [UserComponent, RoleComponent, RolesDetailComponent, PermissionGrantComponent],
})
export class SystemModule {}
