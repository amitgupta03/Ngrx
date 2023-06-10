import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './components/category/category.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CategoryEffects } from './store/category/category.effects';
import { categoryReducer } from './store/category/category.reducer';
import { CategoryFacade } from './store/category/category.facade';
import { ProductComponent } from './components/product/product.component';
import { ProductFacade } from './store/product/product.facade';
import { ProductEffects } from './store/product/product.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, CategoryComponent, ProductComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([CategoryEffects, ProductEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [CategoryFacade,ProductFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
