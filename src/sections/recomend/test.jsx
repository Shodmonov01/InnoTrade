
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { axiosInstance } from 'src/api/api';
import { BsCheck2 } from 'react-icons/bs';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

export default function ShippingRecommendations() {
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [services, setServices] = useState([]);
  const [regionFilter, setRegionFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [productCodeFilter, setProductCodeFilter] = useState('');
  const [sort, setSort] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // для общей отправки

  useEffect(() => {
    fetchData();
  }, [rowsPerPage, page, regionFilter, serviceFilter, productCodeFilter, sort]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      const queryParams = new URLSearchParams({
        page_size: rowsPerPage,
        page: page + 1,
        region_name: regionFilter || '',
        service: serviceFilter || '',
        product_code: productCodeFilter || '',
        sort: sort || '',
      }).toString();

      const response = await axiosInstance.get(
        `companies/${idCompany}/supplier/?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.results || []);
      setTotalProducts(response.data.product_count || 0);

      const uniqueRegions = [
        ...new Set(
          response.data.results.flatMap((row) => row.data.map((region) => region.region_name))
        ),
      ];
      setRegions(uniqueRegions);

      const uniqueServices = ['wildberries', 'ozon', 'yandexmarket'];
      setServices(uniqueServices);

      setLoading(false);
    } catch (err) {
      console.error('Ошибка при получении данных:', err.message);
      setLoading(false);
    }
  };

  const handleSubmitSingleProduct  = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      const response = await axiosInstance.post(
        `companies/${idCompany}/shipment/`,
        {
          recomamandation_supplier_ids: [productId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Успешная отправка:', response.data);
    } catch (err) {
      console.error('Ошибка при отправке данных:', err.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };



  // Функция для отправки всех данных одной кнопкой
  const handleSubmitAllProducts = async () => {
    setIsSubmitting(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      // Отправка всех данных
      await axiosInstance.post(
        `companies/${idCompany}/shipment/bulk/`,
        { products: data }, // Отправляем все продукты
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Все данные успешно отправлены');
    } catch (error) {
      console.error('Ошибка при отправке всех данных:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const allData = [];

      const totalPages = Math.ceil(totalProducts / rowsPerPage);
      for (let i = 0; i < totalPages; i++) {
        const queryParams = new URLSearchParams({
          page_size: rowsPerPage,
          page: i + 1,
          region_name: regionFilter || '',
          service: serviceFilter || '',
          product_code: productCodeFilter || '',
          sort: sort || '',
        }).toString();

        const response = await axiosInstance.get(
          `companies/${idCompany}/supplier/?${queryParams}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        allData.push(...response.data.results);
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Рекомендации по отгрузке');

      worksheet.columns = [
        { header: 'Артикул', key: 'product', width: 20 },
        ...regions.flatMap((region) => [
          { header: `${region} - Количество`, key: `${region}-quantity`, width: 15 },
          { header: `${region} - Осталось дней`, key: `${region}-days_left`, width: 15 },
        ]),
      ];

      allData.forEach((row) => {
        const rowData = { product: row.product };
        regions.forEach((region) => {
          const regionData = row.data.find((r) => r.region_name === region);
          rowData[`${region}-quantity`] = regionData ? regionData.quantity : 0;
          rowData[`${region}-days_left`] = regionData ? regionData.days_left : 0;
        });
        worksheet.addRow(rowData);
      });

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const fileName = `Рекомендации_по_отгрузке_${format(new Date(), 'dd-MM-yyyy')}.xlsx`;
      saveAs(new Blob([buffer]), fileName);
    } catch (error) {
      console.error('Ошибка при экспорте в Excel:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <Paper>
      <div className="actions">
        <Button
          variant="contained"
          color="inherit"
          onClick={handleExportToExcel}
          disabled={isExporting}
          style={{ margin: '16px' }}
        >
          {isExporting ? <CircularProgress size={20} /> : 'Экспорт в Excel'}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitAllProducts}
          disabled={isSubmitting}
          style={{ margin: '16px' }}
        >
          {isSubmitting ? <CircularProgress size={20} /> : 'Отправить все данные'}
        </Button>
      </div>

      <div className="flex">
        <TextField
          variant="outlined"
          placeholder="Поиск по артикулу"
          value={productCodeFilter}
          onChange={(e) => setProductCodeFilter(e.target.value)}
          size="small"
          fullWidth
        />
        <Select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Фильтр по региону' }}
          sx={{ mb: 0, px: 2 }}
        >
          <MenuItem value="">Все регионы</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Фильтр по сервису' }}
          sx={{ mb: 0, px: 2 }}
        >
          <MenuItem value="">Все сервисы</MenuItem>
          {services.map((service) => (
            <MenuItem key={service} value={service}>
              {service}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={sort}
          onChange={handleSortChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Сортировка' }}
          sx={{ mb: 0, px: 2 }}
        >
          <MenuItem value="">Без сортировки</MenuItem>
          <MenuItem value="1">По возрастанию</MenuItem>
          <MenuItem value="-1">По убыванию</MenuItem>
        </Select>
      </div>

      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              
              <TableCell>Артикул</TableCell>
              {regions.map((region) => (
                <React.Fragment key={region}>
                  <TableCell align="center">{region} - Количество</TableCell>
                  <TableCell align="center">{region} - Осталось дней</TableCell>
                </React.Fragment>
              ))}
              <TableCell align="center">Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">
  <Button
    variant="contained"
    color="primary"
    onClick={() => handleSubmitSingleProduct(row)}
  >
    Отправить
  </Button>
</TableCell>

                <TableCell>{row.product}</TableCell>
                {regions.map((region) => {
                  const regionData = row.data.find((r) => r.region_name === region);
                  return (
                    <React.Fragment key={region}>
                      <TableCell align="center">{regionData ? regionData.quantity : 0}</TableCell>
                      <TableCell align="center">{regionData ? regionData.days_left : 0}</TableCell>
                    </React.Fragment>
                  );
                })}
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmitSingleProduct(row)}
                  >
                    Отправить
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
        labelRowsPerPage="Строк на страницу:"
      />
    </Paper>
  );
}