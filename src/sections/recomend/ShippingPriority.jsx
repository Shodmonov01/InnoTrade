import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function ShippingPriority() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/shipping-priority'); // Замените на ваш API
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Регион</TableCell>
            <TableCell>Время в пути, дн</TableCell>
            <TableCell>Поступит через, дн</TableCell>
            <TableCell>Продажи, шт</TableCell>
            <TableCell>К отгрузке, шт</TableCell>
            <TableCell>Доля продаж, %</TableCell>
            <TableCell>Доля отгрузки, %</TableCell>
            <TableCell>Приоритет отгрузки</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.region}>
              <TableCell>{row.region}</TableCell>
              <TableCell>{row.travelTime}</TableCell>
              <TableCell>{row.deliveryTime}</TableCell>
              <TableCell>{row.sales}</TableCell>
              <TableCell>{row.toShip}</TableCell>
              <TableCell>{row.salesShare}</TableCell>
              <TableCell>{row.shippingShare}</TableCell>
              <TableCell>{row.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
