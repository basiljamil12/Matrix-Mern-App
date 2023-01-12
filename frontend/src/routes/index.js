import React from 'react'
import { Route } from 'react-router-dom';

import Emplist from '../container/emp/empList';
import detailList from '../container/emp/show_detail';
import AddEmp from '../container/emp/add_emp';
export const Routes = () => (
   
        <div>
            <Route  path="/empList" component={Emplist} />
            <Route  path="/show_detail" component={detailList} />
            <Route path="/add_emp" component={AddEmp}/>
        </div>
  
); 