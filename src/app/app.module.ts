import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/nav-bar/nav-logo/nav-logo.component';
import { SharedModule } from './theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AddBankComponent } from './demo/Listes/bank-liste/add-bank/add-bank.component';
import { AgenceComponent } from './demo/Listes/agence/agence.component'
import { EditAgcComponent } from './demo/Listes/agence/edit-agc/edit-agc.component'
import { AddClientComponent } from './demo/Listes/responsable/add-respo/add-client.component'
import { ClientsComponent } from './demo/Listes/clients/clients.component'
import { EditBqComponent } from './demo/Listes/bank-liste/edit-bq/edit-bq.component'
import { AddAgcComponent } from './demo/Listes/agence/add-agc/add-agc.component'
import { AppelfondComponent } from './demo/demandes/appelfond/appelfond.component';
import { PlanificationComponent } from './demo/planification/planification.component';
import { LeveefondComponent } from './demo/demandes/leveefond/leveefond.component';
import { ResponsableListComponent } from './demo/Listes/responsable/responsable-list/responsable-list.component';
import { ResponsableService } from './services/responsable.service';





@NgModule({
  declarations: [
    PlanificationComponent,
    AppComponent,
    AdminComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavigationComponent,
    NavLogoComponent,
    AddBankComponent,
    AgenceComponent,
    EditAgcComponent,
    AddClientComponent,
    ClientsComponent,
    EditBqComponent,
    AddAgcComponent,
    AppelfondComponent,
    LeveefondComponent,
    ResponsableListComponent
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, HttpClientModule],
  providers: [NavigationItem,ResponsableService],
  bootstrap: [AppComponent],
  exports: [NavBarComponent]
})
export class AppModule {}
