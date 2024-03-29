import React, { useState, useEffect } from 'react';

import { Income } from '../components/Box/Income';
import { Sales } from '../components/Box/Sales';
import { Expenses } from '../components/Box/Expenses';
import { Employees } from '../components/Box/Employees';
import { ExpensesChart } from '../components/Chart/ExpensesChart';
import { Pies } from '../components/Chart/Pies';

import '../styles/pages/dashboard.scss'


export const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="title">
        <span>Dashboard</span>
      </div>
      <div className="container">
      <div className="box box2"><Income/></div>
        <div className="box box1"><Sales/></div>
        <div className="box box3"><Expenses/></div>
        <div className="box box4"><Employees/></div>
        <div className="box box5"><ExpensesChart/></div>
        <div className="box box6"><Pies/></div>
        {/* <div className="box box7">Recent Orders</div> */}
      </div>
    </div>
  )
}
