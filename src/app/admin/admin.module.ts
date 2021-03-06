import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersDetailComponent } from './components/admin-orders-detail/admin-orders-detail.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminOrdersDetailComponent,
    ProductFormComponent,
  ],
  imports: [
    SharedModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild([
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders/:id', component: AdminOrdersDetailComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ])
  ]
})
export class AdminModule { }
