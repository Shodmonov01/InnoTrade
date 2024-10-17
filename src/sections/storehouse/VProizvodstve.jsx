import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  TablePagination,
} from '@mui/material';
import { axiosInstance } from 'src/api/api';
import UserTableVP from './user-table-vp';
import { BsCheck2 } from 'react-icons/bs';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

const VProizvodstve = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productionValues, setProductionValues] = useState({});
  const [filterName, setFilterName] = useState('');
  const [sort, setSort] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Сохраняем общее количество страниц
  const [perPage, setPerPage] = useState(10); // Количество элементов на странице

  const fetchData = async (currentPage = 1) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      let url = `companies/${idCompany}/prodcution/?page=${currentPage}&per_page=${perPage}`;

      if (sort) {
        url += `&sort=${sort}`;
      }

      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.results);
      setTotalPages(response.data.total_pages); // Устанавливаем общее количество страниц

      // Инициализация значений для производства
      const initialProductionValues = response.data.results.reduce((acc, row) => {
        acc[row.id] = row.produced || '';
        return acc;
      }, {});
      setProductionValues(initialProductionValues);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Эффект для загрузки данных с учётом пагинации
  useEffect(() => {
    fetchData(page); // Передаем текущую страницу
  }, [sort, page, perPage]);

  // Обработчик изменения сортировки
  const handleSortChange = (value) => {
    setSort(value); // Устанавливаем новое значение сортировки
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Обновляем текущую страницу
  };

  // Эффект для загрузки данных и сортировки
  useEffect(() => {
    fetchData();
  }, [sort]);

  // Обработка изменения значения производства
  const handleProductionValueChange = (id, value) => {
    setProductionValues({
      ...productionValues,
      [id]: value, // Сохраняем значение ввода
    });
  };

  // Отправка изменения одного продукта
// Отправка изменения одного продукта
const handleSubmitProduced = async (id) => {
  try {
    const token = JSON.parse(localStorage.getItem('token')).access;
    const productionValue =
      productionValues[id] !== ''
        ? Number(productionValues[id])
        : data.find((row) => row.id === id)?.manufacture;

    await axiosInstance.patch(
      `companies/${id}/update-prodcution/`,
      {
        produced: productionValue,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Успешно обновлено количество для производства:', id);

    // Обновляем локальное состояние data
    const updatedData = data.map((row) => 
      row.id === id
        ? { ...row, manufacture: row.manufacture - productionValue, produced: 0 }
        : row
    );

    setData(updatedData);

    // Очищаем значение ввода
    setProductionValues({
      ...productionValues,
      [id]: '', // Очищаем поле ввода после обновления
    });
  } catch (error) {
    console.error('Ошибка при обновлении количества для производства:', error);
  }
};


  const handleSubmitAllProduction = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      let allProductionValues = [];

      // Собираем данные со всех страниц
      for (let i = 1; i <= totalPages; i++) {
        const response = await axiosInstance.get(
          `companies/${idCompany}/production/?page=${i}&per_page=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const pageValues = response.data.results.map((row) => ({
          id: row.id,
          value: productionValues[row.id] || row.manufacture, // Убедитесь, что поле `manufacture` существует
        }));

        allProductionValues = [...allProductionValues, ...pageValues];
      }

      const filteredProductionValues = allProductionValues.filter(({ value }) => value > 0);

      if (filteredProductionValues.length === 0) {
        console.log('Нет данных для отправки');
        return;
      }

      const requests = filteredProductionValues.map(({ id, value }) =>
        axiosInstance.patch(
          `companies/${idCompany}/update-production/`, // Исправлен путь
          {
            produced: Number(value),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );

      await Promise.all(requests);
      console.log('Успешно отправлены данные для всех значений');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  // Обработка фильтрации по имени продукта
  const handleSearch = (event) => {
    setFilterName(event.target.value);
  };

  // Фильтрация данных по введенному значению
  const filteredData = data.filter((item) =>
    item.product.toLowerCase().includes(filterName.toLowerCase())
  );

  // Экспорт данных в Excel
  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Продукция');

    worksheet.columns = [
      { header: 'Продукт', key: 'product', width: 30 },
      { header: 'Нужно произвести', key: 'manufacture', width: 20 },
      { header: 'Произведено', key: 'produced', width: 20 },
    ];

    filteredData.forEach((row) => {
      worksheet.addRow({
        product: row.product,
        manufacture: row.manufacture,
        produced:
          productionValues[row.id] !== undefined ? productionValues[row.id] : row.manufacture,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `Производство_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <UserTableVP
        filterName={filterName}
        onFilterName={handleSearch}
        onSubmitAllProduction={handleSubmitAllProduction}
        onSortChange={handleSortChange} // Pass sorting function
        sort={sort} // Pass the sort value
        handleExportToExcel={handleExportToExcel}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell>Нужно произвести</TableCell>
              <TableCell>Произведено</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.manufacture}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={productionValues[row.id] !== undefined ? productionValues[row.id] : ''}
                    onChange={(e) => handleProductionValueChange(row.id, e.target.value)}
                    placeholder={row.manufacture}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmitProduced(row.id)}
                  >
                    <BsCheck2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalPages * perPage}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={perPage}
          onRowsPerPageChange={(event) => setPerPage(parseInt(event.target.value, 10))}
          rowsPerPageOptions={[10, 12, 20]}
        />
      </TableContainer>
    </div>
  );
};

export default VProizvodstve;
