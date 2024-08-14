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
} from '@mui/material';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import UserTableToolbar from '../user-table-toolbar';
import { axiosInstance } from 'src/api/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// Добавьте токен в заголовки axiosInstance
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const tabs = ['общие', 'продажи ВБ', 'продажи ОЗОН', 'продажи ЯНДЕКС'];

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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        let url = `/companies/5daa4b59-4cad-47ab-95b6-c02287f2f099/sales/?page_size=${pageSize}`;

        if (startDate && endDate) {
          url += `&date_from=${format(startDate, 'yyyy-MM-dd')}&date_to=${format(endDate, 'yyyy-MM-dd')}`;
        }

        const response = await axiosInstance.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const newPageSize = response.data.product_count || 500;
        setPageSize(newPageSize);
        setRoles(response.data.data);

        // Extract dates
        const allDates = Object.values(response.data.data).flatMap(item => Object.keys(item)).filter(key => key !== 'id');
        setDates(Array.from(new Set(allDates)).sort((a, b) => new Date(b) - new Date(a)));
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };

    fetchRoles();
  }, [pageSize, startDate, endDate]);

  useEffect(() => {
    const updateUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('page', page);
      urlParams.set('rowsPerPage', rowsPerPage);
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
    };

    updateUrlParams();
  }, [page, rowsPerPage]);

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

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sales Data');

    // Add header row
    worksheet.addRow(['Артикул', ...dates]);

    // Add data rows
    currentData.forEach(row => {
      worksheet.addRow([row.id, ...dates.map(date => row[date] || 0)]);
    });

    // Write to file
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'sales_data.xlsx');
  };

  const currentData = Object.entries(roles).map(([key, value]) => ({
    id: key,
    ...value,
  })) || [];

  const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Продажи</Typography>

        <Button variant="contained" color="inherit" startIcon={<PiMicrosoftExcelLogo />} onClick={handleExportToExcel}>
          Экспорт в EXCEL
        </Button>
      </Stack>

      <Card className="p-4 flex gap-4 mb-5">
        {tabs.map((tab) => (
          <Button key={tab} variant="contained" color="inherit" onClick={() => handleTabChange(tab)}>
            {tab}
          </Button>
        ))}
      </Card>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
                    onFilterName={handleFilterByName}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <TableContainer>
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
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  {dates.map((date) => (
                    <TableCell key={date}>{row[date] || 0}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100]}
          component="div"
          count={currentData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

