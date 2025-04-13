import { Routes } from '@angular/router';
import { DocListComponent } from './doctor/doc-list/doc-list.component';
import { DocCreateComponent } from './doctor/doc-create/doc-create.component';
export const routes: Routes = [
    
    {path: '', component: DocListComponent},
    {path: 'doc-create', component: DocCreateComponent}
];
