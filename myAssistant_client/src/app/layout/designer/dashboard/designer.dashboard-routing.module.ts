import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardDesignerComponent } from './designer.dashboard.component';

const routes: Routes = [
    {
        path: '', component: DashboardDesignerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardDesignerRoutingModule {
}
