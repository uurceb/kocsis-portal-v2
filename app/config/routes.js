import React from 'react'
import Main from '../components/layouts/Main';
import Blank from '../components/layouts/Blank';

import MainView from '../views/Main';
import MinorView from '../views/Minor';
import ProjectsView from '../views/ProjectsView';
import ProjectDetailView from '../views/ProjectDetailView'
import ProjectDetailTestView from '../views/ProjectDetailTestView'
import PhasesView from '../views/PhasesView';
import EstimatingFactorsView from '../views/EstimatingFactorsView';
import InventoryItemsView from '../views/InventoryItemsView';
import ParametersView from '../views/ParametersView';

import { Route, Router, IndexRedirect, browserHistory } from 'react-router';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRedirect to="/main" />
            <Route path="main" component={MainView}> </Route>
            <Route path="/projects" component={ProjectsView}></Route>
            <Route path="/project/:projectId" component={ProjectDetailView} ></Route>
            <Route path="/projecttest/:projectId" component={ProjectDetailTestView} ></Route>
            <Route path="/phases" component={PhasesView} ></Route>
            <Route path="/estimatingfactors" component={EstimatingFactorsView} ></Route>
            <Route path="/inventoryitems" component={InventoryItemsView} ></Route>
            <Route path="/parameters" component={ParametersView} ></Route>
        </Route>
    </Router>

);