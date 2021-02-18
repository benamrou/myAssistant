import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenarioManagerComponent } from './scenario.manager.component';


const routes: Routes = [
  //{ path: '', component: HomePage },
  { path: '', component: ScenarioManagerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioManagerRoutingModule {
}
