import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, MetaReducer, ActionReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductListEffects } from './product-list/store/product-list.effects';
import * as fromApp from './store/app.reducer';
import { SuccessComponent } from './success/success.component';
import { ToastsComponent } from './toasts/toasts.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SortableDirective } from './product-list/directives/sortable.directive';
import { GermanCurrencyFormatPipe } from './pipes/german-currency-format.pipe';
import { SelectQuantityComponent } from './select-quantity/select-quantity.component';
import { CartComponent } from './cart/cart.component';
import { localStorageSync } from 'ngrx-store-localstorage';
import { CartProductsTableComponent } from './cart-products-table/cart-products-table.component';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['cart', 'checkout'], rehydrate: true })(
    reducer
  );
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    CheckoutComponent,
    SuccessComponent,
    ToastsComponent,
    ProductListComponent,
    SortableDirective,
    GermanCurrencyFormatPipe,
    SelectQuantityComponent,
    CartComponent,
    CartProductsTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot(fromApp.appReducer, { metaReducers }),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([ProductListEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
