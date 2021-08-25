import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './formateur/update/update.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/acceuil' },
  {path:"acceuil",
component : AcceuilComponent},
{path:"admin",
component : AdminComponent},
{path:"edit/:id",component:UpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
