// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { axiosInstance } from 'src/api/api';
// import UserTableSort from './user-table-sort';

// const SkladSortirovki = () => {
//   const [data, setData] = useState([]);
//   const [shelfData, setShelfData] = useState({});
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [error, setError] = useState(null);
//   const [selectedShelf, setSelectedShelf] = useState('');
//   const [filterName, setFilterName] = useState('');
//   const [sort, setSort] = useState(''); // Добавлено состояние для сортировки

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');
//         const response = await axiosInstance.get(`companies/${idCompany}/sorting/?sort=${sort}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data.results || []);
//       } catch (error) {
//         setSnackbar({
//           open: true,
//           message: `Ошибка загрузки данных: ${error.message}`,
//           severity: 'error',
//         });
//       }
//     };

//     fetchData();
//   }, [sort]); // Зависимость от sort

//   const handleShelfChange = (productId, field, value) => {
//     setShelfData((prevState) => ({
//       ...prevState,
//       [productId]: {
//         ...prevState[productId],
//         [field]: value,
//       },
//     }));
//   };

//   const handleAddOrUpdateShelf = async (productId) => {
//     const { existing_shelf, new_shelf_name, stock } = shelfData[productId] || {};

//     if ((!existing_shelf && !new_shelf_name) || !stock) {
//       setSnackbar({
//         open: true,
//         message: 'Необходимо выбрать существующую полку или ввести новую, а также указать количество',
//         severity: 'error',
//       });
//       return;
//     }

//     const token = JSON.parse(localStorage.getItem('token')).access;
//     const idCompany = localStorage.getItem('selectedCompany');

//     try {
//       const payload = {
//         sorting_warehouse_id: productId,
//         stock: Number(stock),
//       };

//       if (new_shelf_name) {
//         payload.shelf_name = new_shelf_name;
//       } else {
//         payload.shelf_name = existing_shelf;
//       }

//       await axiosInstance.post(`companies/${idCompany}/sorting/`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSnackbar({
//         open: true,
//         message: 'Полка успешно обновлена или добавлена',
//         severity: 'success',
//       });

//       const updatedData = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setData(updatedData.data.results || []);
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: `Ошибка при обновлении данных: ${error.message}`,
//         severity: 'error',
//       });
//     }
//   };

//   const handleSearch = (event) => {
//     setFilterName(event.target.value);
//   };

//   const handleSortChange = (newSort) => {
//     setSort(newSort); // Обработчик изменения сортировки
//   };

//   const filteredData = data.filter((item) =>
//     item.product.toLowerCase().includes(filterName.toLowerCase())
//   );

//   return (
//     <div>
//       <UserTableSort
//         filterName={filterName}
//         onFilterName={handleSearch}
//         sort={sort} // Передаем текущее значение сортировки
//         onSortChange={handleSortChange} // Передаем обработчик изменения сортировки
//       />
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Продукт</TableCell>
//               <TableCell>Несортированное</TableCell>
//               <TableCell>Полка</TableCell>
//               <TableCell>Количество</TableCell>
//               <TableCell>Действия</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.product}</TableCell>
//                 <TableCell>{row.unsorted}</TableCell>
//                 <TableCell>
//                   <FormControl fullWidth margin="dense">
//                     <InputLabel id="shelf-select-label">Полка</InputLabel>
//                     <Select
//                       labelId="shelf-select-label"
//                       value={shelfData[row.id]?.existing_shelf || ''}
//                       onChange={(e) => handleShelfChange(row.id, 'existing_shelf', e.target.value)}
//                       fullWidth
//                     >
//                       {row.shelf.length > 0 ? (
//                         row.shelf.map((shelf) => (
//                           <MenuItem key={shelf.id} value={shelf.shelf_name}>
//                             {shelf.shelf_name}
//                           </MenuItem>
//                         ))
//                       ) : (
//                         <MenuItem disabled value="">
//                           Нет доступных полок
//                         </MenuItem>
//                       )}
//                       <MenuItem value="new">Добавить новую полку</MenuItem>
//                     </Select>
//                   </FormControl>

//                   {shelfData[row.id]?.existing_shelf === 'new' && (
//                     <TextField
//                       fullWidth
//                       margin="dense"
//                       label="Новая полка"
//                       value={shelfData[row.id]?.new_shelf_name || ''}
//                       onChange={(e) => handleShelfChange(row.id, 'new_shelf_name', e.target.value)}
//                     />
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   <TextField
//                     type="number"
//                     margin="dense"
//                     label="Количество"
//                     value={shelfData[row.id]?.stock || ''}
//                     onChange={(e) => handleShelfChange(row.id, 'stock', e.target.value)}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     onClick={() => handleAddOrUpdateShelf(row.id)}
//                   >
//                     Добавить/Обновить
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default SkladSortirovki;

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { axiosInstance } from 'src/api/api';
import UserTableSort from './user-table-sort';

const SkladSortirovki = () => {
  const [data, setData] = useState([]);
  const [shelfData, setShelfData] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filterName, setFilterName] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false); // State to track export loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');
        const response = await axiosInstance.get(`companies/${idCompany}/sorting/?sort=${sort}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.results || []);
      } catch (error) {
        setSnackbar({
          open: true,
          message: `Ошибка загрузки данных: ${error.message}`,
          severity: 'error',
        });
      }
    };

    fetchData();
  }, [sort]);

  const handleSearch = (event) => {
    setFilterName(event.target.value);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const filteredData = data.filter((item) =>
    item.product.toLowerCase().includes(filterName.toLowerCase())
  );

  // Function to handle Excel export
  const handleExcelExport = async () => {
    setLoading(true); // Set loading to true when exporting starts
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Сортировка');

    // Add header row
    worksheet.addRow(['Продукт', 'Несортированное', 'Полка', 'Количество']);

    // Add data rows
    filteredData.forEach((row) => {
      worksheet.addRow([
        row.product,
        row.unsorted,
        row.shelf.map((shelf) => shelf.shelf_name).join(', '),
        shelfData[row.id]?.stock || '',
      ]);
    });

    // Generate Excel file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'Sklad_Sortirovki.xlsx');
    setLoading(false); // Set loading to false once export is complete
  };

  const handleShelfChange = (id, field, value) => {
    setShelfData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');
        const response = await axiosInstance.get(`companies/${idCompany}/sorting/?sort=${sort}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.results || []);
      } catch (error) {
        setSnackbar({
          open: true,
          message: `Ошибка загрузки данных: ${error.message}`,
          severity: 'error',
        });
      }
    };

    fetchData();
  }, [sort]); // Зависимость от sort

  // const handleShelfChange = (productId, field, value) => {
  //   setShelfData((prevState) => ({
  //     ...prevState,
  //     [productId]: {
  //       ...prevState[productId],
  //       [field]: value,
  //     },
  //   }));
  // };

  const handleAddOrUpdateShelf = async (productId) => {
    const { existing_shelf, new_shelf_name, stock } = shelfData[productId] || {};

    if ((!existing_shelf && !new_shelf_name) || !stock) {
      setSnackbar({
        open: true,
        message:
          'Необходимо выбрать существующую полку или ввести новую, а также указать количество',
        severity: 'error',
      });
      return;
    }

    const token = JSON.parse(localStorage.getItem('token')).access;
    const idCompany = localStorage.getItem('selectedCompany');

    try {
      const payload = {
        sorting_warehouse_id: productId,
        stock: Number(stock),
      };

      if (new_shelf_name) {
        payload.shelf_name = new_shelf_name;
      } else {
        payload.shelf_name = existing_shelf;
      }

      await axiosInstance.post(`companies/${idCompany}/sorting/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSnackbar({
        open: true,
        message: 'Полка успешно обновлена или добавлена',
        severity: 'success',
      });

      const updatedData = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(updatedData.data.results || []);
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Ошибка при обновлении данных: ${error.message}`,
        severity: 'error',
      });
    }
  };

  return (
    <div>
      <UserTableSort
        filterName={filterName}
        onFilterName={handleSearch}
        sort={sort}
        onSortChange={handleSortChange}
        onExcelExport={handleExcelExport} // Pass the export handler
        loading={loading} // Pass loading state to disable the button during export
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell>Несортированное</TableCell>
              <TableCell>Полка</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.unsorted}</TableCell>
                <TableCell>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="shelf-select-label">Полка</InputLabel>
                    <Select
                      labelId="shelf-select-label"
                      value={shelfData[row.id]?.existing_shelf || ''} // Убедитесь, что здесь вы берете правильное значение
                      onChange={(e) => handleShelfChange(row.id, 'existing_shelf', e.target.value)} // Функция обновления состояния
                      fullWidth
                    >
                      {row.shelf.length > 0 ? (
                        row.shelf.map((shelf) => (
                          <MenuItem key={shelf.id} value={shelf.shelf_name}>
                            {shelf.shelf_name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem disabled value="">
                          Нет доступных полок
                        </MenuItem>
                      )}
                      <MenuItem value="new">Добавить новую полку</MenuItem>
                    </Select>
                  </FormControl>



                  {shelfData[row.id]?.existing_shelf === 'new' && (
                    <TextField
                      fullWidth
                      margin="dense"
                      label="Новая полка"
                      value={shelfData[row.id]?.new_shelf_name || ''}
                      onChange={(e) => handleShelfChange(row.id, 'new_shelf_name', e.target.value)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    margin="dense"
                    label="Количество"
                    value={shelfData[row.id]?.stock || ''}
                    onChange={(e) => handleShelfChange(row.id, 'stock', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleAddOrUpdateShelf(row.id)}>
                    Добавить/Обновить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SkladSortirovki;
