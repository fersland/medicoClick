import { Routes } from '@angular/router';
import { DocListComponent } from './doctor/doc-list/doc-list.component';
import { DocCreateComponent } from './doctor/doc-create/doc-create.component';
import { DocEditComponent } from './doctor/doc-edit/doc-edit.component';
import { SpcListComponent } from './especialidades/spc-list/spc-list.component';
import { SpcEditComponent } from './especialidades/spc-edit/spc-edit.component';
import { SpcCreateComponent } from './especialidades/spc-create/spc-create.component';

export const routes: Routes = [
    
    { path: 'doc',                  component: DocListComponent},
    { path: 'doc-create',           component: DocCreateComponent},
    { path: 'doc-edit/:id',         component: DocEditComponent},

    { path: 'spc',                  component: SpcListComponent},
    { path: 'spc-create',           component: SpcCreateComponent},
    { path: 'spc-edit/:id',         component: SpcEditComponent}
    
];

