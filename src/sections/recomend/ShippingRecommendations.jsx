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
import { PiMicrosoftExcelLogo } from 'react-icons/pi';

export default function ShippingRecommendations() {
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [services, setServices] = useState([]);
  const [regionFilter, setRegionFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('wildberries');
  const [productCodeFilter, setProductCodeFilter] = useState('');
  const [sort, setSort] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // для общей отправки
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [rowsPerPage, page, regionFilter, serviceFilter, sort]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      const queryParams = new URLSearchParams({
        page_size: rowsPerPage,
        page: page + 1,
        warehouse__oblast_okrug_name: regionFilter || '',
        // warehouse__oblast_okrug_name: regionFilter || '',
        // service: serviceFilter || '',
        service: serviceFilter || 'wildberries',
        article: productCodeFilter || '',
        sort: sort || '',
      }).toString();

      const response = await axiosInstance.get(`companies/${idCompany}/supplier/?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.results || []);
      setTotalProducts(response.data.product_count || 0);

      const uniqueRegions = [
        ...new Set(
          response.data.results.flatMap((row) =>
            row.data.map((region) => region.warehouse__oblast_okrug_name)
          )
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

  const handleSearch = () => {
    fetchData(); // Вызов функции fetchData при нажатии на кнопку "Поиск"
  };

  const handleSubmitProduction = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      // Отправляем POST запрос с нужным productId
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
      // Вы можете обновить интерфейс после успешной отправки, например, показать сообщение об успехе
    } catch (err) {
      console.error('Ошибка при отправке данных:', err.message);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сбрасываем на первую страницу при изменении количества строк на странице
  };

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const allData = [];

      // Fetch all pages of data
      const totalPages = Math.ceil(totalProducts / rowsPerPage);
      for (let i = 0; i < totalPages; i++) {
        const response = await axiosInstance.get(
          `companies/${idCompany}/supplier/?page_size=${rowsPerPage}&page=${i + 1}`,
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
          const regionData = row.data.find((r) => r.warehouse__oblast_okrug_name === region);
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

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSubmitAllProducts = async () => {
    setIsSubmitting(true);
    try {
      // Здесь создаем массив промисов для отправки каждого продукта
      const submitPromises = data.map(
        (product) => handleSubmitProduction(product.id) // отправляем ID продукта
      );

      // Ожидаем завершения всех промисов
      await Promise.all(submitPromises);

      console.log('Все данные успешно отправлены');
      // Вы можете показать уведомление об успешной отправке или обновить интерфейс
    } catch (error) {
      console.error('Ошибка при отправке всех данных:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalculateClick = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/calculate-supplier/`;

      console.log('Fetching data from URL:', url);
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Показать уведомление об успешном начале расчёта
      setAlertOpen(true);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Текущие заказы');

    worksheet.columns = [
      { header: 'ID заказа', key: 'id', width: 10 },
      { header: 'Название заказа', key: 'name', width: 30 },
      { header: 'Юр. лицо', key: 'owner', width: 25 },
      { header: 'Класс пользователя', key: 'user_class', width: 20 },
      { header: 'Адрес', key: 'address', width: 30 },
      { header: 'Телефон', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Дата создания', key: 'create_at', width: 20 },
      { header: 'Дата доставки', key: 'date_delivery', width: 20 },
      { header: 'Сумма', key: 'price', width: 15 },
      { header: 'Общий вес', key: 'total_weight', width: 15 },
      { header: 'Статус', key: 'status', width: 15 },
      { header: 'Оплата', key: 'payment', width: 15 },
    ];

    orders.forEach((order) => {
      worksheet.addRow({
        id: order.id,
        name: order.name,
        owner: order.owner?.name_organizatsiya || 'Не указано',
        user_class: order.owner?.user_class?.name || 'Не указано',
        address: order.owner?.adress_delivery || 'Не указан',
        phone: order.owner?.phone || 'Не указан',
        email: order.owner?.email || '—',
        create_at: format(new Date(order.create_at), 'dd/MM/yyyy HH:mm:ss'),
        date_delivery: order.date_delivery,
        price: order.price,
        total_weight: order.total_weight,
        status: order.status?.name || 'Не указан',
        payment: order.payment || 'Не указано',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'Текущие_заказы.xlsx');
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <Paper>
      <div className="mx-3">
        <div className="actions flex justify-start items-center gap-3">
          <Button
            variant="contained"
            color="inherit"
            startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
            onClick={handleExportToExcel}
            disabled={isExporting}
          >
            {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
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
          <TextField
            sx={{ mb: 0, p: 2 }}
            variant="outlined"
            placeholder="Поиск по артикулу"
            value={productCodeFilter}
            onChange={(e) => setProductCodeFilter(e.target.value)}
            size="small"
          />

          <Button
            variant="contained"
            onClick={handleSearch} // Привязываем обработчик клика к кнопке
          >
            Поиск
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculateClick}
            disabled={isLoading} // Отключаем кнопку во время загрузки
          >
            {isLoading ? 'Подсчёт...' : 'Подсчёт'}
          </Button>
        </div>

        <div className="flex gap-8">
          <Select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Фильтр по региону' }}
            sx={{ mb: 0, px: 2 }}
          >
            <MenuItem value="">Все регионы</MenuItem>
            {regions
              .sort((a, b) => a.localeCompare(b, 'ru'))
              .map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
          </Select>

          <Select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Фильтр по сервисам' }}
            sx={{ mb: 0, px: 2 }}
          >
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
      </div>

      <TableContainer style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                rowSpan={2}
                style={{
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#fff',
                  zIndex: 2,
                }}
              >
                Действия
              </TableCell>
              <TableCell
                rowSpan={2}
                style={{
                  position: 'sticky',
                  left: 80, // Это значение нужно подстроить, чтобы "Артикул" правильно отображался рядом с "Действия"
                  backgroundColor: '#fff',
                  zIndex: 1,
                }}
              >
                Артикул
              </TableCell>
              {regions.map((region) => (
                <TableCell key={region} colSpan={2} align="center">
                  {region}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {regions.map((region) => (
                <>
                  <TableCell key={`${region}-quantity`} align="center">
                    Количество
                  </TableCell>
                  <TableCell key={`${region}-days_left`} align="center">
                    Осталось дней
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.product}>
                <TableCell
                  style={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: '#fff',
                    zIndex: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => handleSubmitProduction(row.id)}
                  >
                    <BsCheck2 />
                  </Button>
                </TableCell>
                <TableCell
                  style={{
                    position: 'sticky',
                    left: 80, // Это значение нужно подстроить, чтобы "Артикул" правильно отображался рядом с "Действия"
                    backgroundColor: '#fff',
                    zIndex: 1,
                  }}
                >
                  {row.product}
                </TableCell>
                {regions.map((region) => {
                  const regionData = row.data.find(
                    (r) => r.warehouse__oblast_okrug_name === region
                  );
                  return (
                    <>
                      <TableCell key={`${region}-quantity`} align="center">
                        {regionData ? regionData.quantity : ' '}
                      </TableCell>
                      <TableCell key={`${region}-days_left`} align="center">
                        {regionData ? regionData.days_left : ' '}
                      </TableCell>
                    </>
                  );
                })}
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
    </Paper>
  );
}
