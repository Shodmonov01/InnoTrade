import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { axiosInstance } from 'src/api/api';

export default function ShippingPriority() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // Сбрасываем ошибку перед новым запросом
    try {
      const token = JSON.parse(localStorage.getItem('token'))?.access;
      const idCompany = localStorage.getItem('selectedCompany');

      // Проверим, что и token, и idCompany существуют
      if (!token) {
        throw new Error('Токен не найден. Авторизация не выполнена.');
      }
      if (!idCompany) {
        throw new Error('Компания не выбрана.');
      }

      const url = `/companies/${idCompany}/priority/`;

      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.results);
    } catch (error) {
      setError(error.message || 'Произошла ошибка при запросе данных.');
      console.error('Ошибка при получении данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Регион</TableCell>
            <TableCell>Время в пути (дн)</TableCell>
            <TableCell>Поступит через (дн)</TableCell>
            <TableCell>Продажи (шт)</TableCell>
            <TableCell>Доля продаж (%)</TableCell>
            <TableCell>Доля отгрузки (%)</TableCell>
            <TableCell>Приоритет отгрузки</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.region_name}</TableCell>
              <TableCell>{row.travel_days}</TableCell>
              <TableCell>{row.arrive_days}</TableCell>
              <TableCell>{row.sales}</TableCell>
              <TableCell>{(row.sales_share * 100).toFixed(2)}%</TableCell>
              <TableCell>{(row.shipments_share * 100).toFixed(2)}%</TableCell>
              <TableCell>{row.shipping_priority.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
