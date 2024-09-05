import { useEffect, useState } from 'react';
import {
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Container,
  Typography,
  TablePagination,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import UserTableToolbar from '../user-table-toolbar';
import { axiosInstance } from 'src/api/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

const tabs = [
  { label: 'общие', service: '' },
  { label: 'продажи ВБ', service: 'wildberries' },
  { label: 'продажи ОЗОН', service: 'ozon' },
  { label: 'продажи ЯНДЕКС', service: 'yandexmarket' },
];

export default function ProductsView() {
  const [currentTab, setCurrentTab] = useState('общие');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [roles, setRoles] = useState({});
  const [pageSize, setPageSize] = useState(500);
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const fetchRoles = async (applyFilters = false) => {
    setIsLoading(true); // Начало загрузки
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
      const selectedTab = tabs.find((tab) => tab.label === currentTab);
      const serviceParam = selectedTab?.service ? `&service=${selectedTab.service}` : '';
  
      let url = `/companies/${idCompany}/sales/?page_size=${pageSize}${serviceParam}`;
  
      if (applyFilters) {
        // Форматируем даты
        const formattedStartDate = startDate ? format(new Date(startDate), 'yyyy-MM-dd') : '';
        const formattedEndDate = endDate ? format(new Date(endDate), 'yyyy-MM-dd') : '';
  
        // Добавляем фильтры к URL
        url += `&date_from=${formattedStartDate}&date_to=${formattedEndDate}`;
      }
  
      // Добавляем фильтр по артикулу
      if (filterName) {
        url += `&article=${filterName}`;
      }
  
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const newPageSize = response.data.product_count || 500;
      setPageSize(newPageSize);
  
      setRoles(response.data.data);
  
      // Извлекаем даты
      const allDates = Object.values(response.data.data)
        .flatMap((item) => Object.keys(item))
        .filter((key) => key !== 'id');
      setDates(Array.from(new Set(allDates)).sort((a, b) => new Date(b) - new Date(a)));
    } catch (error) {
      console.error('Failed to fetch roles', error);
    } finally {
      setIsLoading(false); // Завершение загрузки
    }
  };
  

  // Хук для получения данных только при изменении пагинации и активного таба
  useEffect(() => {
    fetchRoles();
  }, [ currentTab]); // Добавили зависимость currentTab

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сбросить на первую страницу
  };

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab);
    setPage(0); // Сбросить на первую страницу
  };

  const handleSearch = () => {
    fetchRoles(true); // Выполняем поиск с параметрами
  };

  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sales Data');

    // Add header row
    worksheet.addRow(['Артикул', ...dates]);

    // Add data rows
    currentData.forEach((row) => {
      worksheet.addRow([row.id, ...dates.map((date) => row[date] || 0)]);
    });

    // Write to file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'sales_data.xlsx');
  };

  const currentData =
    Object.entries(roles).map(([key, value]) => ({
      id: key,
      ...value,
    })) || [];

  const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Продажи</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<PiMicrosoftExcelLogo />}
          onClick={handleExportToExcel}
        >
          Экспорт в Excel
        </Button>
      </Stack>

      {/* Добавление табов для фильтрации */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label} value={tab.label} />
        ))}
      </Tabs>

      {isLoading ? (
        <Typography variant="h6" align="center">
          Загрузка данных...
        </Typography>
      ) : (
        <>
          <Card>
            <UserTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onSearch={handleSearch} // Добавляем функцию поиска
              isLoading={isLoading} // Передаем состояние загрузки
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Артикул</TableCell>
                    {dates.map((date) => (
                      <TableCell key={date}>{date}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedData.map((row) => (
                    <TableRow hover key={row.id} tabIndex={-1}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      {dates.map((date) => (
                        <TableCell key={date}>{row[date] || 0}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={currentData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </>
      )}
    </Container>
  );
}
