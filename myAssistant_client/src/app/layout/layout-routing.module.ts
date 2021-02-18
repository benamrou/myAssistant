import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            /*********************************************************************/
            /* Customer design */
            { path: 'dashboard_customer', loadChildren: './customer/dashboard/customer.dashboard.module#DashboardCustomerModule' },
            { path: 'customer_design', loadChildren: './customer/design/design.module#DesignModule' },
            /* Mass-change */
            { path: 'customer_massjournal', loadChildren: './customer/mass.update/journal/massjournal.module#MassJournalModule' },
            { path: 'customer_itemhierarchy', loadChildren: './customer/mass.update/item.hierarchy/item.hierarchy.module#ItemHierarchyModule' },
            /*********************************************************************/
            /* Template design */
            { path: 'dashboard_designer', loadChildren: './designer/dashboard/designer.dashboard.module#DashboardDesignerModule' },
            { path: 'template_manager', loadChildren: './designer/template/template.manager.module#TemplateManagerModule' },
            { path: 'wrapscenarios', loadChildren: './designer/scenario/scenario.manager.module#ScenarioManagerModule' },
            /*********************************************************************/
            /* Admin design */
            { path: 'dashboard_admin', loadChildren: './administration/dashboard/admin.dashboard.module#DashboardAdminModule' },
            /* Login */
            { path: '**', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
