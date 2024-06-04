import { Helmet } from 'react-helmet-async';
import LeftoversView from 'src/sections/leftlovers/view/leftovers-view';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function LeftoversPage() {
  return (
    <>
      <Helmet>
        <title> Остатки </title>
      </Helmet>

      <LeftoversView/>
    </>
  );
}
