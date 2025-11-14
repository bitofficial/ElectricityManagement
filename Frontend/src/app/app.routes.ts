import { Routes } from '@angular/router';
import { WelcomeComponent } from '../components/welcome/welcome.component';

//customer
import { LoginComponent } from '../components/customerRelated/login/login.component';
import { RegistrationComponent } from '../components/customerRelated/registration/registration.component';
import { HomeComponent } from '../components/customerRelated/home/home.component';
import { ViewBillComponent } from '../components/customerRelated/view-bill/view-bill.component';
import { ViewBillSummaryComponent } from '../components/customerRelated/view-bill-summary/view-bill-summary.component';
import { PayBillComponent } from '../components/customerRelated/pay-bill/pay-bill.component';
import { BillHistoryComponent } from '../components/customerRelated/bill-history/bill-history.component';
import { RegisterComplaintComponent } from '../components/customerRelated/register-complaint/register-complaint.component';
import { ComplaintStatusComponent } from '../components/customerRelated/complaint-status/complaint-status.component';


//admin
import { AdminDashboardComponent } from '../components/adminRelated/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from '../components/adminRelated/admin-login/admin-login.component';
import { AddCustomerComponent } from '../components/adminRelated/add-customer/add-customer.component';
import { AddBillComponent } from '../components/adminRelated/add-bill/add-bill.component';
import { ListCustomersComponent } from '../components/adminRelated/list-customers/list-customers.component';
import { UpdateCustomersComponent } from '../components/adminRelated/update-customers/update-customers.component';
import { ManageConnectionComponent } from '../components/adminRelated/manage-connection/manage-connection.component';
import { AdminComplaintsComponent } from '../components/adminRelated/admin-complaints/admin-complaints.component';
import { AdminViewBillComponent } from '../components/adminRelated/admin-view-bill/admin-view-bill.component';

//sme
import { ListSmeComplaintComponent } from '../components/smeRelated/list-sme-complaints/list-sme-complaints.component';
import { ResolveComplaintComponent } from '../components/smeRelated/resolve-complaint/resolve-complaint.component';
import { SearchComplaintComponent } from '../components/smeRelated/search-complaint/search-complaint.component';
import { ProfileComponent } from '../components/customerRelated/profile/profile.component';
import { DashboardComponent } from '../components/smeRelated/dashboard/dashboard.component';
import { SmeLoginComponent } from '../components/smeRelated/sme-login/sme-login.component';




export const routes: Routes = [
  // 🏠 General Routes
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  // 👤 Customer Routes
  { path: 'customer/home', component: HomeComponent },
  { path: 'customer/profile', component: ProfileComponent },
  { path: 'customer/view-bill', component: ViewBillComponent },
  { path: 'customer/bill-summary', component: ViewBillSummaryComponent },
  { path: 'customer/pay-bill', component: PayBillComponent },
  { path: 'customer/bill-history', component: BillHistoryComponent },
  { path: 'customer/register-complaint', component: RegisterComplaintComponent },
  { path: 'customer/complaint-status', component: ComplaintStatusComponent },

  // 🧑‍💼 Admin Routes
  { path: 'admin/home', component:AdminDashboardComponent},
  { path: 'admin/login', component: AdminLoginComponent},
  { path: 'admin/add-customer', component: AddCustomerComponent },
  { path: 'admin/list-customer', component: ListCustomersComponent },
  { path: 'admin/update-customer', component: UpdateCustomersComponent },
  { path: 'admin/manage-connection', component: ManageConnectionComponent },
  { path: 'admin/add-bill', component: AddBillComponent },
  { path: 'admin/view-bill', component: AdminViewBillComponent },
  { path: 'admin/complaints', component: AdminComplaintsComponent },

  // 🧰 SME Routes
  { path: 'sme/complaints', component: ListSmeComplaintComponent },
  { path: 'sme/resolve-complaint', component: ResolveComplaintComponent },
  { path: 'sme/search-complaint', component: SearchComplaintComponent },
  {path: 'sme/home', component: DashboardComponent},
  {path: 'sme/login', component: SmeLoginComponent},

  // 🌐 Fallback
  { path: '**', redirectTo: '' },
];
