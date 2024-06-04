import { Helmet } from 'react-helmet-async';
import LeftoversView from 'src/sections/leftlovers/view/leftovers-view';

import { ProductsView } from 'src/sections/products/view';
import RecomendView from 'src/sections/recomend/view/recomend-view';

// ----------------------------------------------------------------------

export default function RecomendPage() {
  return (
    <>
      <Helmet>
        <title> Рекомендации </title>
      </Helmet>

      <RecomendView/>
    </>
  );
}
