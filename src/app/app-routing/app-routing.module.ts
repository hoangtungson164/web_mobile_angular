import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankListComponent} from '../bank-list/bank-list.component';
import {BankConsensusComponent} from '../bank-consensus/bank-consensus.component';
import {SendingInfoComponent} from '../sending-info/sending-info.component';
import {LoginComponent} from '../login/login.component';
import {InquiryReportComponent} from '../inquiry-report/inquiry-report.component';

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
  path: 'banks/:id/inquiryReport',
  component: InquiryReportComponent,
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
