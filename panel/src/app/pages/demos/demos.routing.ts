import {Routes, RouterModule}  from '@angular/router';

import {Demos} from './demos.component';
import {DemoTables} from './components/pageTables/table.component';
import {DemoCreate} from './components/createPage/pageCreate.component';
import {DemoEdit} from './components/editPage/pageEdit.component';

// noinspection TypeScriptValidateTypes
const routes:Routes = [
    {
        path: '',
        component: Demos,
        children: [{
            path: 'list',
            component: DemoTables,
        }, {
            path: 'create',
            component: DemoCreate,
        }, {
            path: 'edit',
            component: DemoEdit,
        }, {path: '', redirectTo: 'list',pathMatch: 'full'}
        ]
    }
];

export const routing = RouterModule.forChild(routes);
