import { Routes } from '@angular/router';
import { DocListComponent } from './doctor/doc-list/doc-list.component';
import { DocCreateComponent } from './doctor/doc-create/doc-create.component';
import { DocEditComponent } from './doctor/doc-edit/doc-edit.component';
export const routes: Routes = [
    
    {path: 'doc', component: DocListComponent},
    {path: 'doc-create', component: DocCreateComponent},
    {path: 'doc-edit/:id', component: DocEditComponent},
    
];
