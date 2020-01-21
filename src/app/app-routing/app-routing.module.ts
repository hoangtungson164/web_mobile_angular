import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankListComponent} from '../bank-list/bank-list.component';
import {BankConsensusComponent} from '../bank-consensus/bank-consensus.component';
import {SendingInfoComponent} from '../sending-info/sending-info.component';
import {LoginComponent} from '../login/login.component';
import {ReportComponent} from '../report/report.component';

const routes: Routes = [{
  path: '',
  component: BankListComponent,
}, {
  path: 'banks/:id/consensus',
  component: BankConsensusComponent,
}, {
  path: 'banks/:id/sending',
  component: SendingInfoComponent,
}, {
  path: 'banks/:id/login',
  component: LoginComponent,
}, {
  path: 'banks/report',
  component: ReportComponent,
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
