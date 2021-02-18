import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthentificationGuard } from './shared/services';

const routes: Routes = [
    
    /* Pre-Menu */
    { path: 'premenu', loadChildren: './premenu/premenu.module#PreMenuModule', canActivate: [AuthentificationGuard] },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'not-accessible', loadChildren: './not-accessible/not-accessible.module#NotAccessibleModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: '404', redirectTo: './layout/layout.module#LayoutModule', canActivate: [AuthentificationGuard] },
    { path: '403', loadChildren: './not-accessible/not-accessible.module#NotAccessibleModule' },
    { path: 'not-found', redirectTo: './layout/layout.module#LayoutModule', canActivate: [AuthentificationGuard] },
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthentificationGuard] },
    { path: '**', redirectTo: './layout/layout.module#LayoutModule', canActivate: [AuthentificationGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, 
        { // Restore the last scroll position
        scrollPositionRestoration: "enabled",
        scrollOffset: [0, 0],
        // Enable scrolling to anchors
        anchorScrolling: "enabled",
      })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
