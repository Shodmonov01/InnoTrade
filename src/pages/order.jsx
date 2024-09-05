import { Helmet } from 'react-helmet-async';
import OrdersView from 'src/sections/orders/view/orders-view';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function OrderPage() {
  return (
    <>
      <Helmet>
        <title> Заказы </title>
      </Helmet>

      <OrdersView />
    </>
  );
}
