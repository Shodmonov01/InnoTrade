// import { lazy, Suspense } from 'react';
// import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// import DashboardLayout from 'src/layouts/dashboard';
// import RecomendPage from 'src/pages/recomend';
// import ShipmentPage from 'src/pages/shipment';
// import StorehousePage from 'src/pages/storehouse';
// import PrivateRoute from 'src/components/PrivateRoute';
// import Company from 'src/pages/company';
// // import LeftoversPage from 'src/pages/leftovers';

// export const IndexPage = lazy(() => import('src/pages/app'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/users'));
// export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
// export const Page404 = lazy(() => import('src/pages/page-not-found'));
// export const LeftoversPage = lazy(() => import('src/pages/leftovers'));

// // ----------------------------------------------------------------------

// export default function Router() {
//   const routes = useRoutes([
//     {
//       element: (
//         <DashboardLayout>
//           <Suspense>
//             <PrivateRoute>
//               <Outlet />
//             </PrivateRoute>
//           </Suspense>
//         </DashboardLayout>
//       ),
//       children: [
//         { element: <IndexPage />, index: true },
//         { path: 'user', element: <UserPage /> },
//         { path: 'products', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//         { path: 'leftovers', element: <LeftoversPage /> },
//         { path: 'shipment', element: <ShipmentPage /> },
//         { path: 'recomend', element: <RecomendPage /> },
//         { path: 'storehouse', element: <StorehousePage /> },
//       ],
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       path: 'company',
//       element: (
//         <PrivateRoute>
//           <Company />
//         </PrivateRoute>
//       ),
//     },
//     {
//       path: '404',
//       element: <Page404 />,
//     },
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
// }

import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import RecomendPage from 'src/pages/recomend';
import ShipmentPage from 'src/pages/shipment';
import StorehousePage from 'src/pages/storehouse';
import PrivateRoute from 'src/components/PrivateRoute';
import Company from 'src/pages/company';
import StockPage from 'src/pages/order';
import OrderPage from 'src/pages/order';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/users'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const LeftoversPage = lazy(() => import('src/pages/leftovers'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'leftovers', element: <LeftoversPage /> },
        { path: 'shipment', element: <ShipmentPage /> },
        { path: 'recomend', element: <RecomendPage /> },
        { path: 'storehouse', element: <StorehousePage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'company',
      element: (
        <PrivateRoute>
          <Company />
        </PrivateRoute>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
