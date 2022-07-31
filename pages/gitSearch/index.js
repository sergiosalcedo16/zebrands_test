import React, { useState } from 'react';
import SideNav from '../../components/nav';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {


  return (
    <div  className={'flex h-screen'} style={{backgroundColor:'#EDF2FF'}}>
      <SideNav/>
    </div>
  )
}
