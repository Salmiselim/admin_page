import { LoginAdmComponent } from './login-adm/login-adm.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AddBankComponent } from './demo/Listes/bank-liste/add-bank/add-bank.component';
import { AgenceComponent } from './demo/Listes/agence/agence.component'
import { EditAgcComponent } from './demo/Listes/agence/edit-agc/edit-agc.component'
import { AddClientComponent } from './demo/Listes/responsable/add-respo/add-client.component';
import { ClientsComponent } from './demo/Listes/clients/clients.component';
import { EditBqComponent } from './demo/Listes/bank-liste/edit-bq/edit-bq.component';
import { AddAgcComponent } from './demo/Listes/agence/add-agc/add-agc.component';
import { AppelfondComponent } from './demo/demandes/appelfond/appelfond.component';
import { PlanificationComponent } from './demo/planification/planification.component';
import { AgenceTunisComponent } from './demo/Listes/agence/Region/agence-tunis/agence-tunis.component';
import { ChatComponent } from './demo/chat/chat.component';
import { NewclientsComponent } from './demo/Listes/clients/new_cli/newclients.component';
import { LeveefondComponent } from './demo/demandes/leveefond/leveefond.component';
import { ResponsableListComponent } from './demo/Listes/responsable/responsable-list/responsable-list.component';
import { EchangeComponent } from './demo/demandes/echange/echange.component';
import { MiseadispositionComponent } from './demo/demandes/miseadisposition/miseadisposition.component';






export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component')
      },
      {
        path: 'addbq',
        component: AddBankComponent
      },
      {
        path: 'agclist',
        component: AgenceComponent
      },

      {
        path: 'plan',
        component: PlanificationComponent
      },
      {
        path: 'editagc/:agence',
        component: EditAgcComponent
      },
      {
        path: 'addclient',
        component: AddClientComponent
      },
      {
        path: 'Listeclient',
        component: ClientsComponent
      },
      {
        path: 'editbq/:bank',
        component: EditBqComponent
      },
      {
        path: 'addagc',
        component: AddAgcComponent
      },
      {
        path: 'af',
        component: AppelfondComponent
       },
       {
        path: 'AgenceTn',
        component: AgenceTunisComponent
       },
       {
        path: 'chat',
        component: ChatComponent
       },

       {
        path: 'newclients',
        component: NewclientsComponent
       },
       {
        path: 'lv',
        component: LeveefondComponent
       },
       {
        path: 'respo',
        component: ResponsableListComponent
       },
       {
        path: 'echange',
        component: EchangeComponent
       },
       {
        path: 'MAD',
        component: MiseadispositionComponent
       }

    ]
  },
  { path: 'login', component: LoginAdmComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
