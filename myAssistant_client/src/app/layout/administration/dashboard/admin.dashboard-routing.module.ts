import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardAdminComponent } from './admin.dashboard.component';

const routes: Routes = [
    {
        path: '', component: DashboardAdminComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardAdminRoutingModule {
}
