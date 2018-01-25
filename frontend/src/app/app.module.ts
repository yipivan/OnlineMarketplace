import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//Routing imports
import { MainRoutingModule } from './components/main/main-routing.module';

//Component imports
import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { MainComponent } from './components/main/main.component';
import { TopComponent } from './components/top/top.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TabsComponent } from './components/main/tabs/tabs.component';
import { SidebarComponent } from './components/main/sidebar/sidebar.component';
import { ProductsComponent } from './components/main/products/products.component';
import { ProductDetailComponent } from './components/main/product-detail/product-detail.component';
import { TemporaryComponent } from './components/main/temporary/temporary.component';
import { SellComponent } from './components/main/sell/sell.component';
import { CartComponent } from './components/main/cart/cart.component';


//Service imports
import { FacebookAuthService } from './services/facebook-auth.service';
import { AuthService } from './services/auth.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { AuthGuard } from './services/auth-guard.service';
import { GoogleAuthService } from './services/google-auth.service';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { SellService } from './services/sell.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TopComponent,
    BottomComponent,
    MainComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    TabsComponent,
    ProductsComponent,
    TemporaryComponent,
    SellComponent,
    ProductDetailComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    MainRoutingModule,
    HttpClientModule
  ],
  providers: [
    FacebookAuthService, 
    AuthService,
    OAuthService,
    AuthGuard,
    GoogleAuthService,
    ProductsService,
    CartService,
    SellService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}