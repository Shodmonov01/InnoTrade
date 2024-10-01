

import { useState } from 'react';
import { Container, Tabs, Tab, CircularProgress, Typography } from '@mui/material';
import React, { Suspense } from 'react';

// Ленивое подключение компонентов
const ProductionRecommendations = React.lazy(() => import('../ProductionRecommendations'));
const ShippingRecommendations = React.lazy(() => import('../ShippingRecommendations'));
const ShippingPriority = React.lazy(() => import('../ShippingPriority'));

export default function RecomendView() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  

  return (
    <Container>
     <Typography variant="h4">Рекомендации</Typography>

      <Tabs value={currentTab} onChange={handleChange}>
        <Tab label="Рекомендации производства" />
        <Tab label="Рекомендации отгрузок" />
        <Tab label="Приоритет отгрузок" />
      </Tabs>

      {/* Используем Suspense для отображения индикатора загрузки */}
      {currentTab === 0 && (
        <Suspense fallback={<CircularProgress />}>
          <ProductionRecommendations />
        </Suspense>
      )}
      {currentTab === 1 && (
        <Suspense fallback={<CircularProgress />}>
          <ShippingRecommendations />
        </Suspense>
      )}
      {currentTab === 2 && (
        <Suspense fallback={<CircularProgress />}>
          <ShippingPriority />
        </Suspense>
      )}
    </Container>
  );
}
