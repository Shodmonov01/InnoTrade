import { useState } from 'react';
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
import { data } from './data';



const tabs = ['общие', 'продажи ВБ', 'продажи ОЗОН', 'продажи ЯНДЕКС'];

export default function ProductsView() {
  const [currentTab, setCurrentTab] = useState('общие');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');

  
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

  const currentData = data[currentTab];
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
                  <TableCell>{row['28.03.2024']}</TableCell>
                  <TableCell>{row['27.03.2024']}</TableCell>
                  <TableCell>{row['26.03.2024']}</TableCell>
                  <TableCell>{row['25.03.2024']}</TableCell>
                  <TableCell>{row['24.03.2024']}</TableCell>
                  <TableCell>{row['23.03.2024']}</TableCell>
                  <TableCell>{row['22.03.2024']}</TableCell>
                  <TableCell>{row['21.03.2024']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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
