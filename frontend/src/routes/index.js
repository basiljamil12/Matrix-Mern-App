import React from 'react'
import { Route } from 'react-router-dom';

import Emplist from '../container/emp/empList';
import LogList from '../container/logs/logistics';
import detailList from '../container/emp/show_detail';
import AddEmp from '../container/emp/add_emp';
import EditEmp from '../container/emp/edit_emp';
import { AddLogs } from '../container/logs/add_logs';
import { EditLogistics } from '../container/logs/edit_logs';
import Dashboard from '../container/Dashboard';

export const Routes = () => (
   
        <div>
            <Route  path="/empList" component={Emplist} />
            <Route path="/logistics" component={LogList} />
            <Route  path="/show_detail" component={detailList} />
            <Route path="/add_logs" component={AddLogs}/>
            <Route path="/add_emp" component={AddEmp}/>
            <Route path="/edit_logs" component={EditLogistics} />
            <Route path="/edit_emp" component={EditEmp}/>
            <Route path="/dashboard" component={Dashboard}/>
        </div>
  
); 