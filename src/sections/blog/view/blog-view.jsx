// StorehouseView.js
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
  IconButton,
  TextField,
  Input,
} from '@mui/material';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { MdDeleteOutline } from 'react-icons/md';
import { data } from './data';
import UserTableToolbar from '../user-table-toolbar';

const tabs = ['Настройки API', 'Сезонность', 'Срок доставки', 'Настройки пользователей'];

export default function BlogView() {
  const [currentTab, setCurrentTab] = useState('Настройки API');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortingLocations, setSortingLocations] = useState({});
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

  const handleMoveToSortingWarehouse = (id) => {
    // Логика перемещения артикулов на склад сортировки
    console.log(`Moving ${id} to sorting warehouse`);
  };

  const handleDeleteRow = (id) => {
    // Логика удаления строки
    console.log(`Deleting row ${id}`);
  };

  const handleStorageLocationChange = (id, value) => {
    setSortingLocations({ ...sortingLocations, [id]: value });
  };

  const handleMoveToFinishedGoods = (id) => {
    // Логика перемещения на склад готовой продукции
    console.log(`Moving ${id} to finished goods`);
  };

  const currentData = data[currentTab];
  const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Склад</Typography>
        <Stack direction="row" alignItems="center" className="gap-3">
       
          <Button variant="contained" color="inherit">Добавить Фирму</Button>
        </Stack>
      </Stack>

      <Card className="p-4 flex gap-4 mb-5 items-center">
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
                {currentTab === 'Склад сортировки' ? (
                  <>
                    <TableCell>Не сортировано</TableCell>
                    <TableCell>Перемещаем на место хранения</TableCell>
                    <TableCell>Место хранения</TableCell>
                    <TableCell>Действия</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>Wildberries</TableCell>
                    <TableCell>Ozon</TableCell>
                    <TableCell>Yandex Market</TableCell>
                    <TableCell>Действия</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  {currentTab === 'Склад сортировки' ? (
                    <>
                      <TableCell>{row.notSorted}</TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={sortingLocations[row.id] || row.movingToStorage}
                          onChange={(e) => handleStorageLocationChange(row.id, e.target.value)}
                        />
                      </TableCell>
                      <TableCell>{row.storageLocation}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleMoveToFinishedGoods(row.id)}>
                          <MdDeleteOutline />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell><Input type="text" /></TableCell>
                      <TableCell><Input type="text" /></TableCell>
                      <TableCell><Input type="text" /></TableCell>
                      <TableCell>
<Input type="text" />
                        <IconButton onClick={() => handleDeleteRow(row.id)}>
                          <MdDeleteOutline />
                        </IconButton>
                      </TableCell>
                    </>
                  )}
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
