import React from 'react'
import { Route } from 'react-router-dom';

import Emplist from '../container/emp/empList';
import LogList from '../container/emp/logistics';
import detailList from '../container/emp/show_detail';
import AddEmp from '../container/emp/add_emp';
import EditEmp from '../container/emp/edit_emp';

export const Routes = () => (
   
        <div>
            <Route  path="/empList" component={Emplist} />
            <Route path="/logistics" component={LogList} />
            <Route  path="/show_detail" component={detailList} />
            <Route path="/add_emp" component={AddEmp}/>
            <Route path="/edit_emp" component={EditEmp}/>
        </div>
  
); 