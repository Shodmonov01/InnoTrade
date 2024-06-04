import { Helmet } from 'react-helmet-async';
import LeftoversView from 'src/sections/leftlovers/view/leftovers-view';

import { ProductsView } from 'src/sections/products/view';
import ShipmentView from 'src/sections/shipment/view/shipment-view';

// ----------------------------------------------------------------------

export default function ShipmentPage() {
  return (
    <>
      <Helmet>
        <title> Отгрузки </title>
      </Helmet>

      <ShipmentView/>
    </>
  );
}
