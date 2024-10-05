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
  { label: 'Общие', service: '' },
  { label: 'Wildberries', service: 'wildberries' },
  { label: 'Ozon', service: 'ozon' },
  { label: 'Yandex Market', service: 'yandexmarket' },
];

export default function ProductsView() {
  const [currentTab, setCurrentTab] = useState('Общие');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [roles, setRoles] = useState({});
  const [pageSize, setPageSize] = useState(500);
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [sort, setSort] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchRoles = async () => {
    setIsLoading(true); // Начало загрузки
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
      const selectedTab = tabs.find((tab) => tab.label === currentTab);
      const serviceParam = selectedTab?.service ? `&service=${selectedTab.service}` : '';

      let url = `/companies/${idCompany}/stocks/?page_size=${rowsPerPage}&page=${
        page + 1
      }${serviceParam}`;

      if (startDate && endDate) {
        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
        url += `&date_from=${formattedStartDate}&date_to=${formattedEndDate}`;
      }
      if (filterName) {
        url += `&article=${filterName}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }

      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPageSize(response.data.product_count || 500);
      setTotalProducts(response.data.product_count || 0); // Обновляем общее количество продуктов
      setRoles(response.data.data);

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

  // useEffect(() => {
  //   fetchRoles();
  // }, [currentTab, page, rowsPerPage, startDate, endDate, filterName, sort]);
  useEffect(() => {
    fetchRoles();
  }, [currentTab, page, rowsPerPage]);

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
    fetchRoles(); // Выполняем поиск с параметрами
  };

  const handleExportToExcel = async () => {
    setIsExporting(true); // Устанавливаем состояние загрузки для кнопки

    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
      const selectedTab = tabs.find((tab) => tab.label === currentTab);
      const serviceParam = selectedTab?.service ? `&service=${selectedTab.service}` : '';

      let url = `/companies/${idCompany}/sales/?page_size=${totalProducts}${serviceParam}`;

      if (startDate && endDate) {
        const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
        const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
        url += `&date_from=${formattedStartDate}&date_to=${formattedEndDate}`;
      }
      if (filterName) {
        url += `&article=${filterName}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }

      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allData = response.data.data;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sales Data');

      worksheet.addRow(['Артикул', ...dates]);

      Object.entries(allData).forEach(([key, value]) => {
        worksheet.addRow([key, ...dates.map((date) => value[date] || 0)]);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), 'sales_data.xlsx');
    } catch (error) {
      console.error('Failed to export to Excel', error);
    } finally {
      setIsExporting(false); // Завершаем состояние загрузки для кнопки
    }
  };

  const currentData =
    Object.entries(roles).map(([key, value]) => ({
      id: key,
      ...value,
    })) || [];

  const displayedData = currentData;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Остатки</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
          onClick={handleExportToExcel}
          disabled={isExporting}
        >
          {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
        </Button>
      </Stack>
      <Card className="px-6 my-4 py-3">
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
      </Card>
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
              onSearch={handleSearch}
              isLoading={isLoading}
              sort={sort}
              setSort={setSort}
            />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Артикул</TableCell>
                    {dates.map((date) => (
                      <TableCell align="center" key={date}>
                        {date}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedData.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell align="center">{row.id}</TableCell>
                      {dates.map((date) => (
                        <TableCell align="center" key={date}>
                          {row[date] || 0}
                        </TableCell>
                      ))}
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
          </Card>
        </>
      )}
    </Container>
  );
}
