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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import UserTableToolbar from './user-table-toolbar';
import { axiosInstance } from 'src/api/api';
import { BsCheck2 } from "react-icons/bs";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

export default function ProductionRecommendations() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);
  const [productionValues, setProductionValues] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sort, setSort] = useState('');
  const [filterTimeout, setFilterTimeout] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const fetchData = async (pageNumber = page + 1) => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      let url = `/companies/${idCompany}/recomend/?page_size=${rowsPerPage}&page=${pageNumber}`;

      if (filterName) {
        url += `&article=${filterName}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }

      console.log("Fetching data from URL:", url);
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.results);
      setTotalProducts(response.data.product_count);

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
    fetchData(page + 1);
  }, [page, rowsPerPage, sort]);

  useEffect(() => {
    if (filterTimeout) {
      clearTimeout(filterTimeout);
    }

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1000);

    setFilterTimeout(timeoutId);
  }, [filterName]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProductionValueChange = (id, value) => {
    setProductionValues({
      ...productionValues,
      [id]: value,
    });
  };

  const handleSubmitProduction = async (id) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));

    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/prodcution/`;

      const foundRow = data.find((row) => row.id === id);
      let productionValue = productionValues[id];

      if (!productionValue || productionValue === '') {
        productionValue = foundRow ? foundRow.quantity : '';
      }

      productionValue = parseFloat(productionValue);

      console.log('recommendations_id:', id);
      console.log('application_for_production:', productionValue);

      await axiosInstance.post(
        url,
        {
          recommendations_id: id,
          application_for_production: productionValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProductionValues((prevValues) => ({ ...prevValues, [id]: '' }));
      console.log('Успешно отправлено на производство:', id);
    } catch (error) {
      console.error('Ошибка при отправке данных на производство:', error);
      setData((prevData) => [...prevData, foundRow]);
    }
  };

  const handleSubmitAllProduction = async () => {
    const filteredProductionValues = data.map((row) => ({
      id: row.id,
      value: parseFloat(productionValues[row.id]) || parseFloat(row.quantity),
    }));

    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/prodcution/`;

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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Рекомендации по производству');

    worksheet.columns = [
      { header: 'Продукт', key: 'product', width: 30 },
      { header: 'Количество', key: 'quantity', width: 15 },
      { header: 'Осталось дней', key: 'days_left', width: 15 },
      { header: 'Заявка на производство', key: 'application_for_production', width: 25 },
    ];

    data.forEach(row => {
      worksheet.addRow({
        product: row.product,
        quantity: row.quantity,
        days_left: row.days_left,
        application_for_production: productionValues[row.id] || '',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `production_recommendations_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmSubmitAllProduction = () => {
    handleCloseConfirmDialog();
    handleSubmitAllProduction();
  };

  const handleCalculateClick = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/calculate-recomand/`;

      console.log("Fetching data from URL:", url);
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Показать уведомление об успешном начале расчёта
      setAlertOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setIsLoading(false);
    }
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
        onSubmitAllProduction={handleOpenConfirmDialog} // Open dialog instead of direct function call
        sort={sort}
        setSort={setSort}
        onExport={exportToExcel}
        handleCalculateClick={handleCalculateClick}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Осталось дней</TableCell>
              <TableCell>Заявка на производство</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.days_left}</TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={productionValues[row.id] !== undefined ? productionValues[row.id] : ''}
                    onChange={(e) => handleProductionValueChange(row.id, e.target.value)}
                    placeholder={row.quantity}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
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
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Подтверждение</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите отправить все заявки на производство?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleConfirmSubmitAllProduction} color="primary">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
