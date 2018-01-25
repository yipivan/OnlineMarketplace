import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';;
import { FacebookComponent } from '../../components/facebook/facebook.component';
import { GoogleComponent } from '../../components/google/google.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
    {path: 'auth/facebook/callback',component: FacebookComponent},
    {path: 'auth/google/callback',component: GoogleComponent},
    {path: 'products', component: ProductsComponent},
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class MainRoutingModule{}
export const routingComponents = [FacebookComponent, 
                                  GoogleComponent,
                                  ProductsComponent,
                                ]