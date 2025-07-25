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

export const routes: Routes = [
    
    { path: 'doc',                  component: DocListComponent},
    { path: 'doc-create',           component: DocCreateComponent},
    { path: 'doc-edit/:id',         component: DocEditComponent},

    { path: 'spc',                  component: SpcListComponent},
    { path: 'spc-create',           component: SpcCreateComponent},
    { path: 'spc-edit/:id',         component: SpcEditComponent},

    { path: 'paciente',             component: PacienteListComponent},
    { path: 'paciente-create',      component: PacienteCreateComponent},
    { path: 'paciente-edit/:id',    component: PacienteEditComponent},

    { path: 'cliente',              component: ClienteListComponent},
    { path: 'cliente-create',       component: ClienteCreateComponent},
    { path: 'cliente-edit/:id',     component: ClienteEditComponent}

];

