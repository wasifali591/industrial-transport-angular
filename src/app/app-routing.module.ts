import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'homepage',
        loadChildren: './homepage/homepage.module#HomepageModule'
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'signup',
        loadChildren: './signup/signup.module#SignupModule'
    },
    {
        path: 'bookTruck',
        loadChildren: './book-truck/book-truck.module#BookTruckModule'
    },
    {
        path: 'error',
        loadChildren: './server-error/server-error.module#ServerErrorModule'
    },
    {
        path: 'access-denied',
        loadChildren: './access-denied/access-denied.module#AccessDeniedModule'
    },
    {
        path: 'not-found',
        loadChildren: './not-found/not-found.module#NotFoundModule'
    },
    {
        path: 'customerdashboard',
        loadChildren: './customerdashboard/customerdashboard.module#CustomerdashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
