import {Routes, RouterModule}  from '@angular/router';

import {Users} from './users.component';
import {UserTables} from './components/pageTables/table.component';
import {UserCreate} from './components/createPage/pageCreate.component';
import {UserEdit} from './components/editPage/pageEdit.component';

// noinspection TypeScriptValidateTypes
const routes:Routes = [
    {
        path: '',
        component: Users,
        children: [{
            path: 'list',
            component: UserTables,
        }, {
            path: 'create',
            component: UserCreate,
        }, {
            path: 'edit',
            component: UserEdit,
        }, {path: '', redirectTo: 'list',pathMatch: 'full'}
        ]
    }
];

export const routing = RouterModule.forChild(routes);
