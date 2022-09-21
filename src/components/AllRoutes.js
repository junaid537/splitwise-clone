import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import AllExpenses from './AllExpenses'
import Dashboard from './Dashboard'
import IndividualGroup from './IndividualGroup'
import NewGroup from './NewGroup'
import RecentActivity from './RecentActivity'

const AllRoutes = () => {
  return (
    <Routes>
             <Route path="/" element={<Dashboard />} />
             <Route path="/new/group" element={<NewGroup />} />
             <Route path="/allExpenses" element={<AllExpenses />} />
             <Route path="/recentActivity" element={<RecentActivity />} />
             <Route path="/grpPage/:groupid" element={<IndividualGroup />} />
    </Routes>
  )
}

export default AllRoutes
