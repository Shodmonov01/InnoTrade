

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { axiosInstance } from 'src/api/api';
import UserTableToolbar from './user-table-toolbar';
import { BsCheck2 } from 'react-icons/bs';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns'; // Импортируем функцию форматирования даты

export default function ShipmentTab() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');

        const response = await axiosInstance.get(
          `companies/${idCompany}/shipment/?page_size=${rowsPerPage}&page=${page + 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const results = response.data.results || [];

        // Обновляем данные и количество товаров
        setData(results);
        setTotalProducts(response.data.product_count || 0);

        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error('Ошибка при получении данных:', err.message);
      }
    };

    fetchData();
  }, [rowsPerPage, page]);

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleSubmitProduction = async (product) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      // Извлекаем только id полок из in_shelf
      const shelfIds = product.in_shelf.map((shelf) => shelf.id);

      // Отправляем POST запрос с правильным shipment_id и shelf_ids
      const response = await axiosInstance.post(
        `companies/${idCompany}/shipment-history/`,
        {
          shelf_ids: shelfIds, // массив id полок
          shipment_id: product.id, // id продукта как shipment_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Успешная отправка:', response.data);
      // Обновите интерфейс, если необходимо
    } catch (err) {
      console.error('Ошибка при отправке данных:', err.message);
    }
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Shipments');

    worksheet.columns = [
      { header: 'Артикул', key: 'product', width: 20 },
      { header: 'Полка', key: 'in_shelf', width: 30 },
      { header: 'На складе', key: 'in_warehouse', width: 15 },
      { header: 'Отгрузить', key: 'shipment', width: 15 },
    ];

    data.forEach((row) => {
      worksheet.addRow({
        product: row.product,
        in_shelf: row.in_shelf.join(', '),
        in_warehouse: row.in_warehouse,
        shipment: row.shipment,
      });
    });

    // Сохраняем файл с текущей датой
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `shipments_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  return (
    <Card>
      <UserTableToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        onExportExcel={handleExportExcel}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell>Полка</TableCell>
              <TableCell>На складе</TableCell>
              <TableCell>Отгрузить</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>
                    {row.in_shelf.length > 0 ? row.in_shelf.join(', ') : 'Нет данных'}
                  </TableCell>
                  <TableCell>{row.in_warehouse}</TableCell>
                  <TableCell>{row.shipment}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleSubmitProduction(row)} // передаем весь объект row
                    >
                      <BsCheck2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Загрузка данных...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[100, 500, 1000]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
