import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateManagerComponent } from './template.manager.component';

const routes: Routes = [
    {
        path: '', component: TemplateManagerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TemplateManagerRoutingModule {
}
