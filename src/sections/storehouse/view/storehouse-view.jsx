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
} from '@mui/material';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { MdDeleteOutline } from 'react-icons/md';
import { FaCheckSquare } from 'react-icons/fa';
import { AiOutlineArrowRight, AiOutlinePlus } from 'react-icons/ai';

// import { data } from './data';
import UserTableToolbar from '../user-table-toolbar';

const tabs = ['В производстве', 'Склад сортировки', 'Склад ГП', 'Инвентаризация'];

export default function StorehouseView() {
  const [currentTab, setCurrentTab] = useState('В производстве');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortingLocations, setSortingLocations] = useState({});
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [inventoryData, setInventoryData] = useState(data['Инвентаризация']);
  const [newLocations, setNewLocations] = useState({});

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

  const handleAddNewLocation = (id) => {
    const newEntry = {
      id: newLocations[id],
      location: newLocations[id],
      quantity: 0,
      total: 0,
      totalFact: 0,
    };
    setInventoryData([...inventoryData, newEntry]);
    setNewLocations({ ...newLocations, [id]: '' });
  };

  const handleNewLocationChange = (id, value) => {
    setNewLocations({ ...newLocations, [id]: value });
  };

  const currentData = data[currentTab];
  const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Склад</Typography>
        <Stack direction="row" alignItems="center" className="gap-3">
          <Button variant="contained" color="inherit" startIcon={<PiMicrosoftExcelLogo />}>
            Экспорт в EXCEL
          </Button>
        </Stack>
      </Stack>

      <Card className="p-4 flex gap-4 mb-5 items-center">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant="contained"
            color="inherit"
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </Button>
        ))}
      </Card>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          currentTab={currentTab} // Pass current tab
          handleMoveToSortingWarehouse={() => handleMoveToSortingWarehouse(selected)} // Pass function to handle move to sorting warehouse
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
                ) : currentTab === 'Склад ГП' ? (
                  <>
                    <TableCell>Место</TableCell>
                    <TableCell>28.03.2024</TableCell>
                    <TableCell>27.03.2024</TableCell>
                    <TableCell>26.03.2024</TableCell>
                    <TableCell>25.03.2024</TableCell>
                    <TableCell>24.03.2024</TableCell>
                  </>
                ) : currentTab === 'Инвентаризация' ? (
                  <>
                    <TableCell>Место</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell>Итого</TableCell>
                    <TableCell>Итого факт</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      <div className="flex gap-3 items-center">
                        <input type="date" />{' '}
                        <span>
                          <MdDeleteOutline size={20} />
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div>Нужно произвести</div>{' '}
                        <span className="cursor-pointer">
                          <AiOutlineArrowRight size={20} />
                        </span>
                      </div>{' '}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>Произведено</TableCell>
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
                      <TableCell >
                       <div className="flex items-center gap-3 ">
                       {row.storageLocation}
                        <TextField
                          size="small"
                          value={newLocations[row.id] || ''}
                          onChange={(e) => handleNewLocationChange(row.id, e.target.value)}
                          placeholder="Новое место"
                        />
                        <IconButton
                          onClick={() => handleAddNewLocation(row.id)}
                          size="small"
                          color="primary"
                        >
                          <AiOutlinePlus />
                        </IconButton>
                       </div>
                        
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleMoveToFinishedGoods(row.id)}>
                          <FaCheckSquare />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : currentTab === 'Склад ГП' ? (
                    <>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>{row['28.03.2024']}</TableCell>
                      <TableCell>{row['27.03.2024']}</TableCell>
                      <TableCell>{row['26.03.2024']}</TableCell>
                      <TableCell>{row['25.03.2024']}</TableCell>
                      <TableCell>{row['24.03.2024']}</TableCell>
                    </>
                  ) : currentTab === 'Инвентаризация' ? (
                    <>
                      <TableCell>
                        {row.location}
                        <IconButton
                          onClick={() => handleAddNewLocation(row.id)}
                          size="small"
                          color="primary"
                        >
                          <AiOutlinePlus />
                        </IconButton>
                        <TextField
                          size="small"
                          value={newLocations[row.id] || ''}
                          onChange={(e) => handleNewLocationChange(row.id, e.target.value)}
                          placeholder="Новое место"
                        />
                      </TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.total}</TableCell>
                      <TableCell>{row.totalFact}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.needed}</TableCell>
                      <TableCell>
                        <AiOutlineArrowRight />
                      </TableCell>
                      <TableCell>{row.produced}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteRow(row.id)}>
                          <FaCheckSquare />
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

// data.js
export const data = {
  'В производстве': [
    { id: 'N245-1', needed: 10, produced: 5 },
    { id: 'N123-2', needed: 3, produced: 1 },
    { id: 'N123', needed: 3, produced: 3 },
    { id: 'Алена-Мишка', needed: 3, produced: 4 },
    { id: 'Анастасия Единорог', needed: 3, produced: 3 },
  ],
  'Склад сортировки': [
    { id: 'N245-1', notSorted: 0, movingToStorage: 10, storageLocation: 'A-10-12' },
    { id: 'N123-2', notSorted: 300, movingToStorage: 200, storageLocation: 'A-10-12' },
    { id: 'N123', notSorted: 400, movingToStorage: 0, storageLocation: 'A-10-12' },
    { id: 'Алена-Мишка', notSorted: 600, movingToStorage: 300, storageLocation: 'A-10-12' },
    { id: 'Анастасия Единорог', notSorted: 200, movingToStorage: 500, storageLocation: 'A-10-12' },
  ],
  'Склад ГП': [
    {
      id: 'N245-1',
      location: 'A-10-12',
      '28.03.2024': 3,
      '27.03.2024': 3,
      '26.03.2024': 3,
      '25.03.2024': 3,
      '24.03.2024': 3,
    },
    {
      id: 'N123-2',
      location: 'A-10-12',
      '28.03.2024': 3,
      '27.03.2024': 3,
      '26.03.2024': 3,
      '25.03.2024': 3,
      '24.03.2024': 3,
    },
    {
      id: 'N123',
      location: 'A-10-12',
      '28.03.2024': 3,
      '27.03.2024': 3,
      '26.03.2024': 3,
      '25.03.2024': 3,
      '24.03.2024': 3,
    },
    {
      id: 'Алена-Мишка',
      location: 'A-10-12',
      '28.03.2024': 3,
      '27.03.2024': 3,
      '26.03.2024': 3,
      '25.03.2024': 3,
      '24.03.2024': 3,
    },
    {
      id: 'Анастасия Единорог',
      location: 'A-10-12',
      '28.03.2024': 3,
      '27.03.2024': 3,
      '26.03.2024': 3,
      '25.03.2024': 3,
      '24.03.2024': 3,
    },
  ],
  Инвентаризация: [
    { id: 'N245-1', location: 'A-10-12', quantity: 10, total: 20, totalFact: 20 },
    { id: 'N123-2', location: 'A-10-12', quantity: 3, total: 3, totalFact: 3 },
    { id: 'N123', location: 'A-10-12', quantity: 3, total: 3, totalFact: 3 },
    { id: 'Алена-Мишка', location: 'A-10-12', quantity: 3, total: 3, totalFact: 3 },
    { id: 'Анастасия Единорог', location: 'A-10-12', quantity: 3, total: 3, totalFact: 3 },
  ],
};
