import { useState, Suspense, useEffect} from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout';
import { AdminHome, Authentication, Home, NewUser, UserProfile } from './pages';
import AdminLayout from './layouts/AdminLayout';
import { AuthLayout } from './layouts';
import { auth } from './config/firebase.config';
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {Toaster} from 'react-hot-toast'
import AdminUsers from './pages/admin/AdminUsers';
import AdminApps from './pages/admin/AdminApps';
import Details from './pages/Details';

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* client lauout */}
          <Route  element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/detail/:appid' element={<Details />} />
            <Route path='/user/:uid' element={<UserProfile />} />

          </Route>
            {/* admin layout */}

          <Route path='/admin/*' element={<AdminLayout />} >
            <Route path='home' element={<AdminHome />} />
            <Route path='apps' element={<AdminApps />} />
            <Route path='users' element={<AdminUsers />} />
          </Route>

            {/* Auth layout */}
          <Route path='/auth/*' element={<AuthLayout />}>
            <Route index element={<Authentication />} />
          </Route>

        </Routes>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App
