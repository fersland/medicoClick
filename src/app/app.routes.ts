import { Routes } from '@angular/router';
import { DocListComponent } from './doctor/doc-list/doc-list.component';
import { DocCreateComponent } from './doctor/doc-create/doc-create.component';
import { DocEditComponent } from './doctor/doc-edit/doc-edit.component';
import { SpcListComponent } from './especialidades/spc-list/spc-list.component';
import { SpcEditComponent } from './especialidades/spc-edit/spc-edit.component';
import { SpcCreateComponent } from './especialidades/spc-create/spc-create.component';
import { PacienteListComponent } from './paciente/paciente-list/paciente-list.component';
import { PacienteCreateComponent } from './paciente/paciente-create/paciente-create.component';
import { PacienteEditComponent } from './paciente/paciente-edit/paciente-edit.component';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './clientes/cliente-create/cliente-create.component';
import { ClienteEditComponent } from './clientes/cliente-edit/cliente-edit.component';
import { RegisterFormComponent } from './registro/register-form/register-form.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '',                     redirectTo: 'login', pathMatch: 'full' },
    { path: 'doc',                  component: DocListComponent,    canActivate: [authGuard ]},
    { path: 'doc-create',           component: DocCreateComponent,  canActivate: [authGuard ]},
    { path: 'doc-edit/:id',         component: DocEditComponent,    canActivate: [authGuard ]},

    { path: 'spc',                  component: SpcListComponent,    canActivate: [authGuard ]},
    { path: 'spc-create',           component: SpcCreateComponent,  canActivate: [authGuard ]},
    { path: 'spc-edit/:id',         component: SpcEditComponent,    canActivate: [authGuard ]},

    { path: 'paciente',             component: PacienteListComponent,   canActivate: [authGuard ]},
    { path: 'paciente-create',      component: PacienteCreateComponent, canActivate: [authGuard ]},
    { path: 'paciente-edit/:id',    component: PacienteEditComponent,   canActivate: [authGuard ]},

    { path: 'cliente',              component: ClienteListComponent,    canActivate: [authGuard ]},
    { path: 'cliente-create',       component: ClienteCreateComponent,  canActivate: [authGuard ]},
    { path: 'cliente-edit/:id',     component: ClienteEditComponent,    canActivate: [authGuard ]},

    { path: 'registro',             component: RegisterFormComponent},
    { path: 'login',                component: LoginComponent}

];

