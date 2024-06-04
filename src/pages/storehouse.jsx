import { Helmet } from 'react-helmet-async';
import LeftoversView from 'src/sections/leftlovers/view/leftovers-view';

import { ProductsView } from 'src/sections/products/view';
import StorehouseView from 'src/sections/storehouse/view/storehouse-view';

// ----------------------------------------------------------------------

export default function StorehousePage() {
  return (
    <>
      <Helmet>
        <title> Склад </title>
      </Helmet>

      <StorehouseView/>
    </>
  );
}
