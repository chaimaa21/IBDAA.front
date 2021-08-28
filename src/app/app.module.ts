import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AcceuilComponent } from './acceuil/acceuil.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { AdminComponent } from './admin/admin.component';
import { DemoMaterialModule } from './material-module';
import { environment } from 'src/environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './formateur/list/list.component';
import { CreateComponent } from './formateur/create/create.component';
import { UpdateComponent } from './formateur/update/update.component';
import { FormateurService } from './formateur/formateur.service';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ListFormationComponent } from './formation/list-formation/list-formation.component';
import { CreateFormationComponent } from './formation/create-formation/create-formation.component';
import { UpdateFormationComponent } from './formation/update-formation/update-formation.component';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AcceuilComponent,
    AdminComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent,
    MatConfirmDialogComponent,
    ListFormationComponent,
    CreateFormationComponent,
    UpdateFormationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  exports:[RouterModule],
  providers: [FormateurService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

