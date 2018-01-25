import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/auth-guard.service';;
import { FacebookComponent } from '../../components/facebook/facebook.component';
import { GoogleComponent } from '../../components/google/google.component';
import { ProductsComponent } from './products/products.component';
import { TemporaryComponent } from './temporary/temporary.component';
import { SellComponent } from './sell/sell.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'favourites', component: TemporaryComponent },
    { path: 'transactions', component: TemporaryComponent },
    { path: 'sell', component: SellComponent },
    { path: 'cart', component: TemporaryComponent },
    { path: 'auth/facebook/callback', component: FacebookComponent },
    { path: 'auth/google/callback', component: GoogleComponent },
    { path: 'cart', component: CartComponent },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
export const routingComponents = [
    FacebookComponent,
    GoogleComponent,
    ProductsComponent,
    TemporaryComponent,
    ProductDetailComponent,
    CartComponent,
    SellComponent
]