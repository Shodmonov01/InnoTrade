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

// Добавьте токен в заголовки axiosInstance
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const tabs = ['общие', 'продажи ВБ', 'продажи ОЗОН', 'продажи ЯНДЕКС'];

export default function ProductsView() {
  const [currentTab, setCurrentTab] = useState('общие');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [roles, setRoles] = useState({}); // Обновите состояние для хранения данных

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const response = await axiosInstance.get('/companies/5daa4b59-4cad-47ab-95b6-c02287f2f099/sales/?page=5&page_size=20', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response);
        console.log('Fetched roles:', response.data);
        setRoles(response.data.data); // Устанавливаем только нужные данные
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };

    fetchRoles();
  }, []);

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

  // Преобразуем данные для текущей вкладки
  const currentData = Object.entries(roles).map(([key, value]) => ({
    id: key,
    ...value,
  })) || [];

  const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Продажи</Typography>

        <Button variant="contained" color="inherit" startIcon={<PiMicrosoftExcelLogo />}>
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
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Артикул</TableCell>
                <TableCell>28.03.2024</TableCell>
                <TableCell>27.03.2024</TableCell>
                <TableCell>26.03.2024</TableCell>
                <TableCell>25.03.2024</TableCell>
                <TableCell>24.03.2024</TableCell>
                <TableCell>23.03.2024</TableCell>
                <TableCell>22.03.2024</TableCell>
                <TableCell>21.03.2024</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row['2024-08-06'] || 0}</TableCell>
                  <TableCell>{row['2024-08-07'] || 0}</TableCell>
                  <TableCell>{row['2024-08-08'] || 0}</TableCell>
                  <TableCell>{row['2024-08-09'] || 0}</TableCell>
                  <TableCell>{row['2024-08-10'] || 0}</TableCell>
                  <TableCell>{row['2024-08-11'] || 0}</TableCell>
                  <TableCell>{row['2024-08-12'] || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
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
