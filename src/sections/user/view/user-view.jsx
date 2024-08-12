import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { axiosAccountInstance } from 'src/api/api';
import UserAddModal from '../UserAddModal'; // Импортируйте компонент модального окна

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Состояние для управления модальным окном

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const response = await axiosAccountInstance.get('/create', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Original data:', response.data);

        const transformedData = response.data.map(user => ({
          id: user.uuid,
          name: `${user.username} ${user.last_name}`,
          role: user.groups.join(', '),
          status: user.company.length ? 'Active' : 'Inactive',
          company: user.company.map(c => c.name).join(', '),
          avatarUrl: user.avatar,
          isVerified: user.isVerified || false,
          chatId: user.chat_id,
        }));

        console.log('Transformed data:', transformedData);
        setUserData(transformedData);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    };

    fetchCompanies();
  }, []);
  
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Пользователи</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenModal} // Открыть модальное окно при клике
        >
          Добавить Пользователя
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={userData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Имя' },
                  { id: 'company', label: 'Компания' },
                  { id: 'role', label: 'Роль' },
                  { id: 'isVerified', label: 'Подтвержден', align: 'center' },
                  { id: 'status', label: 'Статус' },
                  { id: 'chat_id', label: 'Chat ID' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      chatId={row.chatId}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, userData.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <UserAddModal open={openModal} onClose={handleCloseModal} /> {/* Добавление модального окна */}
    </Container>
  );
}
