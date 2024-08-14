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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [roles, setRoles] = useState({});
  const [pageSize, setPageSize] = useState(500);

  useEffect(() => {
    // Функция для чтения параметров из URL
    const readUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pageParam = parseInt(urlParams.get('page'), 10);
      const rowsPerPageParam = parseInt(urlParams.get('rowsPerPage'), 10);

      if (!isNaN(pageParam)) setPage(pageParam);
      if (!isNaN(rowsPerPageParam)) setRowsPerPage(rowsPerPageParam);
    };

    // Чтение параметров при монтировании компонента
    readUrlParams();

    const fetchRoles = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const response = await axiosInstance.get(`/companies/5daa4b59-4cad-47ab-95b6-c02287f2f099/sales/?page_size=${pageSize}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response);
        console.log('Fetched roles:', response.data);

        const newPageSize = response.data.product_count || 500;
        setPageSize(newPageSize);

        setRoles(response.data.data);
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };

    fetchRoles();
  }, [pageSize]);

  useEffect(() => {
    // Обновление URL при изменении состояния пагинации
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

  const currentData = Object.entries(roles).map(([key, value]) => ({
    id: key,
    ...value,
  })) || [];

  const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log(displayedData);

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
