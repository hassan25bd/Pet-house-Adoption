import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from '../components/shared/PrivateRoute';

import Home from '../pages/Home/Home';
import AllPets from '../pages/AllPets/AllPets';
import PetDetails from '../pages/PetDetails/PetDetails';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddPet from '../pages/Dashboard/AddPet';
import MyListings from '../pages/Dashboard/MyListings';
import MyRequests from '../pages/Dashboard/MyRequests';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'pets', element: <AllPets /> },
      {
        path: 'pets/:id',
        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'add-pet', element: <AddPet /> },
      { path: 'my-listings', element: <MyListings /> },
      { path: 'my-requests', element: <MyRequests /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);

export default router;
