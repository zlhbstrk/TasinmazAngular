import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IlEkleComponent } from './Il/il-ekle/il-ekle.component';

const routes: Routes = [
  {
    path: 'ilekle',
    component: IlEkleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
