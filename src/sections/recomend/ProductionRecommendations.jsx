

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
} from '@mui/material';
import UserTableToolbar from './user-table-toolbar';
import { axiosInstance } from 'src/api/api';
import { BsCheck2 } from "react-icons/bs";


export default function ProductionRecommendations() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);
  const [productionValues, setProductionValues] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalProducts, setTotalProducts] = useState(0); // Для хранения общего количества продуктов

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const serviceParam = ''; // Ваш параметр сервиса, если есть

      // Обновленный URL с учётом пагинации
      let url = `/companies/${idCompany}/recomend/?page_size=${rowsPerPage}&page=${
        page + 1
      }${serviceParam}`;

      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.results);
      setTotalProducts(response.data.count); // Сохраняем общее количество продуктов

      // Инициализация значений для каждого recommendation
      const initialProductionValues = response.data.results.reduce((acc, row) => {
        acc[row.id] = row.application_for_production || '';
        return acc;
      }, {});
      setProductionValues(initialProductionValues);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]); // Перезапускаем fetchData при изменении страницы или количества элементов

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleProductionValueChange = (id, value) => {
    setProductionValues({
      ...productionValues,
      [id]: value,
    });
  };

  const handleSubmitProduction = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/prodcution/`;
  
      // Найдем строку данных по id
      const foundRow = data.find((row) => row.id === id);
  
      // Определим значение для productionValue
      let productionValue = productionValues[id];
  
      // Если значение пустое, используем количество (quantity) из строки данных
      if (!productionValue || productionValue === '') {
        productionValue = foundRow ? foundRow.quantity : ''; // Берём значение из row.quantity, если пусто
      }
  
      // Приводим значение к числу
      productionValue = parseFloat(productionValue); // Преобразуем в число
  
      // Проверка значений перед отправкой
      console.log('recommendations_id:', id);
      console.log('application_for_production:', productionValue); // Проверим, что значение передается как число
  
      // Отправляем запрос на сервер
      await axiosInstance.post(
        url,
        {
          recommendations_id: id,
          application_for_production: productionValue, // Используем значение как число
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // После отправки очищаем значение
      setProductionValues((prevValues) => ({ ...prevValues, [id]: '' }));
  
      console.log('Успешно отправлено на производство:', id);
    } catch (error) {
      console.error('Ошибка при отправке данных на производство:', error);
    }
  };
  

  const handleSubmitAllProduction = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/prodcution/`;
  
      const filteredProductionValues = Object.keys(productionValues)
        .filter((id) => productionValues[id] && productionValues[id] > 0)
        .map((id) => ({ id, value: parseFloat(productionValues[id]) })); // Преобразуем в число
  
      if (filteredProductionValues.length === 0) {
        console.log('Нет данных для отправки');
        return;
      }
  
      const requests = filteredProductionValues.map(({ id, value }) => {
        return axiosInstance.post(
          url,
          {
            recommendations_id: id,
            application_for_production: value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });
  
      await Promise.all(requests);
  
      setData((prevData) =>
        prevData.map((row) => {
          const updatedValue = productionValues[row.id];
          if (updatedValue && updatedValue > 0) {
            return {
              ...row,
              quantity: row.quantity - updatedValue,
            };
          }
          return row;
        })
      );
  
      const updatedProductionValues = { ...productionValues };
      filteredProductionValues.forEach(({ id }) => {
        updatedProductionValues[id] = '';
      });
      setProductionValues(updatedProductionValues);
  
      console.log('Успешно отправлены данные для выбранных значений');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Обновляем текущую страницу
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Обновляем количество строк на странице
    setPage(0); // Сбрасываем страницу на первую
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <UserTableToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        onSubmitAllProduction={handleSubmitAllProduction}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>шид</TableCell> */}
              <TableCell>Продукт</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Осталось дней</TableCell>
              <TableCell>Заявка на производство</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((row) => row.product.toLowerCase().includes(filterName.toLowerCase()))
              .map((row) => (
                <TableRow key={row.id}>
                  {/* <TableCell>{row.id}</TableCell> */}
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.days_left}</TableCell>
                  <TableCell>
                    {/* <input
                      type="number"
                      value={productionValues[row.id] || row.quantity || ''}
                      onChange={(e) => handleProductionValueChange(row.id, e.target.value)}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    /> */}

                    <input
                      type="number"
                      value={productionValues[row.id] !== undefined ? productionValues[row.id] : ''} // Если есть значение в productionValues, берем его, иначе оставляем пусто
                      onChange={(e) => handleProductionValueChange(row.id, e.target.value)} // Обновляем значение при изменении
                      placeholder={row.quantity} // Дефолтное значение в placeholder, но не в value, чтобы позволить стереть его
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleSubmitProduction(row.id)}
                    >
                              <BsCheck2 />

                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[100, 500, 1000]}
        component="div"
        count={totalProducts} // Общее количество продуктов для корректной пагинации
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
