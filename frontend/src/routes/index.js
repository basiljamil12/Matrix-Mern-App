import React from "react";
import { Route } from "react-router-dom";

<<<<<<< HEAD
import Emplist from '../container/emp/empList';
import LogList from '../container/logs/logistics';
import detailList from '../container/emp/show_detail';
import AddEmp from '../container/emp/add_emp';
import EditEmp from '../container/emp/edit_emp';
import AddLogs from '../container/logs/add_logs';
import EditLogistics from '../container/logs/edit_logs.js';
import TaskList from '../container/task/tasks.js';
import AddTask from '../container/task/add_task.js';
import ViewTask from '../container/task/view_task.js';
import BonusList from '../container/bonuses/bonuslist.js';
import AddBonus from '../container/bonuses/addbonus.js';
import Dashboard from '../container/Dashboard.js';
import loggedTasks from '../container/task/loggedTasks.js';

export const Routes = () => (
   
        <div>
            <Route  path="/empList" component={Emplist} />
            <Route path="/logistics" component={LogList} />
            <Route  path="/show_detail" component={detailList} />
            <Route path="/add_logs" component={AddLogs}/>
            <Route path="/add_emp" component={AddEmp}/>
            <Route path="/edit_logs" component={EditLogistics} />
            <Route path="/edit_emp" component={EditEmp}/>

            <Route path="/tasks" component={TaskList}/>
            <Route path="/add_task" component={AddTask}/>
            <Route path="/view_task" component={ViewTask}/>
            <Route path="/bonuslist" component={BonusList}/>
            <Route path="/addbonus" component={AddBonus}/>
            <Route path="/empTasks" component={loggedTasks}/>
            <Route path="/dashboard" component={Dashboard}/>
        </div>
  
); 
=======
import Emplist from "../container/emp/empList";
import LogList from "../container/logs/logistics";
import detailList from "../container/emp/show_detail";
import AddEmp from "../container/emp/add_emp";
import EditEmp from "../container/emp/edit_emp";
import AddLogs from "../container/logs/add_logs";
import EditLogistics from "../container/logs/edit_logs";
import TaskList from "../container/task/tasks.js";
import AddTask from "../container/task/add_task.js";
import ViewTask from "../container/task/view_task.js";
import BonusList from "../container/bonuses/bonuslist.js";
import AddBonus from "../container/bonuses/addbonus.js";
import ViewBonus from "../container/bonuses/viewbonus.js";
import Dashboard from "../container/Dashboard";
import loggedTasks from "../container/task/loggedTasks";
import MachineInfo from "../container/machine/machineinfo";
import refineList from "../container/refinery/refineList";
import { AddPurities } from "../container/refinery/addPurities";
import { EditPurities } from "../container/refinery/editPurities";

export const Routes = () => (
  <div>
    <Route path="/empList" component={Emplist} />
    <Route path="/logistics" component={LogList} />
    <Route path="/show_detail" component={detailList} />
    <Route path="/add_logs" component={AddLogs} />
    <Route path="/add_emp" component={AddEmp} />
    <Route path="/edit_logs" component={EditLogistics} />
    <Route path="/edit_emp" component={EditEmp} />
    <Route path="/refineryList" component={refineList} />
    <Route path="/addPurities" component={AddPurities} />
    <Route path="/editPurities" component={EditPurities} />
    <Route path="/tasks" component={TaskList} />
    <Route path="/add_task" component={AddTask} />
    <Route path="/view_task" component={ViewTask} />
    <Route path="/bonuslist" component={BonusList} />
    <Route path="/addbonus" component={AddBonus} />
    <Route path="/viewbonus" component={ViewBonus} />
    <Route path="/machineinfo" component={MachineInfo} />
    <Route path="/empTasks" component={loggedTasks} />
    <Route path="/dashboard" component={Dashboard} />
  </div>
);
>>>>>>> c4b7c38cfb2988b9d84d257f9d87ecac908891a5
