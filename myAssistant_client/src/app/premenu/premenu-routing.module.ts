import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreMenuComponent } from './premenu.component';

const routes: Routes = [
    { path: '', component: PreMenuComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PreMenuRoutingModule { }
