import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCustomerComponent } from './customer.dashboard.component';

const routes: Routes = [
    {
        path: '', component: DashboardCustomerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardCustomerRoutingModule {
}
