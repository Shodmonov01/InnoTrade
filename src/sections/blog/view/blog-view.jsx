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
  IconButton,
  TextField,
  Input,
} from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import UserTableToolbar from '../user-table-toolbar';

const tabs = ['Настройки API', 'Сезонность', 'Срок доставки', 'Настройки пользователей'];

export default function BlogView() {
  const [currentTab, setCurrentTab] = useState('Настройки API');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortingLocations, setSortingLocations] = useState({});
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [data, setData] = useState([]);

  // Загружаем данные из localStorage при первом рендере
  useEffect(() => {
    const storedData = localStorage.getItem('selectedCompany');
    if (storedData) {
      setData([JSON.parse(storedData)]); // Assuming you're storing a single company object
    }
  }, []);
  

  // Обработчики для фильтрации, пагинации и табов
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
    console.log(`Moving ${id} to sorting warehouse`);
  };

  const handleDeleteRow = (id) => {
    console.log(`Deleting row ${id}`);
  };

  const handleStorageLocationChange = (id, value) => {
    setSortingLocations({ ...sortingLocations, [id]: value });
  };

  const handleMoveToFinishedGoods = (id) => {
    console.log(`Moving ${id} to finished goods`);
  };

 const currentData = data.filter(item => item.tab === currentTab);
const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

console.log(currentTab);
console.log(displayedData);

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
                  <TableCell colSpan={1}>Wildberries</TableCell>
                  <TableCell colSpan={2}>Ozon</TableCell>
                  <TableCell colSpan={4}>Yandex Market</TableCell>
                </>
              )}
            </TableRow>
            {currentTab !== 'Склад сортировки' && (
              <TableRow>
                <TableCell />
                <TableCell>wb_api_key</TableCell>
                <TableCell>api_token</TableCell>
                <TableCell>client_id</TableCell>
                <TableCell>api_key(bearer)</TableCell>
                <TableCell>fby_campaign_id</TableCell>
                <TableCell>fbs_campaign_id</TableCell>
                <TableCell>business_id</TableCell>
              </TableRow>
            )}
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
                    <TableCell><Input type="text" value={row.wildberries?.[0]?.wb_api_key || ''} /></TableCell>
                    <TableCell><Input type="text" value={row.ozon?.[0]?.api_token || ''} /></TableCell>
                    <TableCell><Input type="text" value={row.ozon?.[0]?.client_id || ''} /></TableCell>
                    <TableCell><Input type="text" value={row.yandex_market?.[0]?.api_key || ''} /></TableCell>
                    <TableCell><Input type="text" value={row.yandex_market?.[0]?.fby_campaign_id || ''} /></TableCell>
                    <TableCell><Input type="text" value={row.yandex_market?.[0]?.fbs_campaign_id || ''} /></TableCell>
                    <TableCell><Input type="text" value={row.yandex_market?.[0]?.business_id || ''} /></TableCell>
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