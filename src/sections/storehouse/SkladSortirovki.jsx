// // import React, { useEffect, useState } from 'react';
// // import {
// //   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl,
// // } from '@mui/material';
// // import { AiOutlinePlus } from 'react-icons/ai';
// // import { FaCheckSquare } from 'react-icons/fa';
// // import { axiosInstance } from 'src/api/api';

// // const SkladSortirovki = () => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [newShelfData, setNewShelfData] = useState({}); // Данные для новых полок
// //   const [openModal, setOpenModal] = useState(false); // Для модального окна
// //   const [selectedProduct, setSelectedProduct] = useState(null); // ID выбранного продукта
// //   const [isLoadingAction, setIsLoadingAction] = useState(false); // Индикатор состояния действий
// //   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
// //   const [selectedShelf, setSelectedShelf] = useState(''); // Выбранная полка
// //   const [existingShelves, setExistingShelves] = useState([]); // Существующие полки

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem('token')).access;
// //         const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
// //         const response = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         const responseData = response.data.results || [];
// //         setData(responseData);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleNewShelfChange = (field, value) => {
// //     setNewShelfData({
// //       ...newShelfData,
// //       [field]: value,
// //     });
// //   };

// //   const handleShelfSelectChange = (event) => {
// //     setSelectedShelf(event.target.value);
// //   };

// //   const handleAddNewShelf = () => {
// //     const token = JSON.parse(localStorage.getItem('token')).access;
// //     const idCompany = localStorage.getItem('selectedCompany');

// //     if (selectedShelf === 'new') {
// //       // Добавляем новую полку
// //       if (!newShelfData.shelf_name || !newShelfData.stock) {
// //         setSnackbar({ open: true, message: 'Введите данные для новой полки и количество товара', severity: 'error' });
// //         return;
// //       }

// //       const { shelf_name, stock } = newShelfData;
// //       setIsLoadingAction(true);
// //       axiosInstance.post(`companies/${idCompany}/sorting/`, {
// //         sorting_warehouse_id: selectedProduct,
// //         stock: Number(stock),
// //         shelf_name: shelf_name,
// //       }, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         }
// //       })
// //         .then(() => {
// //           setSnackbar({ open: true, message: 'Товар успешно размещен на новой полке', severity: 'success' });
// //           setOpenModal(false);
// //           setIsLoadingAction(false);
// //           setNewShelfData({});
// //           // Обновление данных интерфейса может быть добавлено
// //         })
// //         .catch((error) => {
// //           setSnackbar({ open: true, message: `Ошибка: ${error.message}`, severity: 'error' });
// //           setIsLoadingAction(false);
// //         });

// //     } else {
// //       // Добавляем товар на существующую полку
// //       if (!selectedShelf) {
// //         setSnackbar({ open: true, message: 'Выберите полку', severity: 'error' });
// //         return;
// //       }

// //       setIsLoadingAction(true);
// //       axiosInstance.post(`companies/${idCompany}/sorting/`, {
// //         sorting_warehouse_id: selectedProduct,
// //         stock: Number(newShelfData.stock || 0),
// //         shelf_name: selectedShelf,
// //       }, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         }
// //       })
// //         .then(() => {
// //           setSnackbar({ open: true, message: 'Товар успешно размещен на выбранной полке', severity: 'success' });
// //           setOpenModal(false);
// //           setIsLoadingAction(false);
// //           setNewShelfData({});
// //         })
// //         .catch((error) => {
// //           setSnackbar({ open: true, message: `Ошибка: ${error.message}`, severity: 'error' });
// //           setIsLoadingAction(false);
// //         });
// //     }
// //   };

// //   const openShelfModal = (productId, shelves) => {
// //     setSelectedProduct(productId);
// //     setExistingShelves(shelves);
// //     setOpenModal(true);
// //   };

// //   const closeShelfModal = () => {
// //     setOpenModal(false);
// //     setNewShelfData({});
// //     setSelectedShelf('');
// //   };

// //   const handleCloseSnackbar = () => {
// //     setSnackbar({ open: false, message: '', severity: 'success' });
// //   };

// //   if (loading) return <p>Загрузка...</p>;
// //   if (error) return <p>Ошибка: {error}</p>;

// //   return (
// //     <div>
// //       {isLoadingAction && <CircularProgress />}

// //       <TableContainer>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Продукт</TableCell>
// //               <TableCell>Несортированное</TableCell>
// //               <TableCell>Места хранения</TableCell>
// //               <TableCell>Действия</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {data.map((row) => (
// //               <TableRow key={row.id}>
// //                 <TableCell>{row.product}</TableCell>
// //                 <TableCell>{row.unsorted}</TableCell>
// //                 <TableCell>
// //                   <div className='flex gap-2 items-center'>
// //                     <div>
// //                       {row.shelf.length > 0 ? (
// //                         row.shelf.map((s) => (
// //                           <div key={s.id} style={{ marginBottom: '10px' }}>
// //                             <strong>Полка:</strong> {s.shelf_name} - <strong>Количество:</strong> {s.stock}
// //                           </div>
// //                         ))
// //                       ) : (
// //                         <div style={{ color: 'red' }}>Нет мест хранения</div>
// //                       )}
// //                     </div>
// //                     <div>
// //                       <Button
// //                         variant="contained"
// //                         color="primary"
// //                         onClick={() => openShelfModal(row.id, row.shelf)}
// //                         startIcon={<AiOutlinePlus />}
// //                       >
// //                         Добавить полку
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </TableCell>
// //                 <TableCell>
// //                   <div style={{ display: 'flex', gap: '10px' }}>
// //                     <IconButton onClick={() => handleMoveToFinishedGoods(row.id)} color="success">
// //                       <FaCheckSquare />
// //                     </IconButton>
// //                   </div>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       {/* Модальное окно для добавления новой или существующей полки */}
// //       <Dialog open={openModal} onClose={closeShelfModal}>
// //         <DialogTitle>Выберите или добавьте полку</DialogTitle>
// //         <DialogContent>
// //           <FormControl fullWidth margin="dense">
// //             <InputLabel id="shelf-select-label">Полка</InputLabel>
// //             <Select
// //               labelId="shelf-select-label"
// //               value={selectedShelf}
// //               onChange={handleShelfSelectChange}
// //               fullWidth
// //             >
// //               {existingShelves.map((shelf) => (
// //                 <MenuItem key={shelf.id} value={shelf.shelf_name}>
// //                   {shelf.shelf_name}
// //                 </MenuItem>
// //               ))}
// //               <MenuItem value="new">Добавить новую полку</MenuItem>
// //             </Select>
// //           </FormControl>

// //           {selectedShelf === 'new' && (
// //             <>
// //               <TextField
// //                 fullWidth
// //                 margin="dense"
// //                 label="Имя новой полки"
// //                 value={newShelfData.shelf_name || ''}
// //                 onChange={(e) => handleNewShelfChange('shelf_name', e.target.value)}
// //                 placeholder="Введите имя полки"
// //               />
// //               <TextField
// //                 fullWidth
// //                 margin="dense"
// //                 label="Количество"
// //                 type="number"
// //                 value={newShelfData.stock || ''}
// //                 onChange={(e) => handleNewShelfChange('stock', e.target.value)}
// //                 placeholder="Введите количество товара"
// //               />
// //             </>
// //           )}

// //           {selectedShelf !== 'new' && (
// //             <TextField
// //               fullWidth
// //               margin="dense"
// //               label="Количество"
// //               type="number"
// //               value={newShelfData.stock || ''}
// //               onChange={(e) => handleNewShelfChange('stock', e.target.value)}
// //               placeholder="Введите количество товара для выбранной полки"
// //             />
// //           )}
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={closeShelfModal} color="secondary">
// //             Отмена
// //           </Button>
// //           <Button onClick={handleAddNewShelf} color="primary" disabled={isLoadingAction}>
// //             Добавить
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Уведомление */}
// //       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
// //         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </div>
// //   );
// // };

// // export default SkladSortirovki;


// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Select, MenuItem, Snackbar, Alert } from '@mui/material';
// import { axiosInstance } from 'src/api/api';

// const SkladSortirovki = () => {
//   const [data, setData] = useState([]); // Данные по продуктам и полкам
//   const [shelfData, setShelfData] = useState({}); // Данные для новых/выбранных полок
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании
//         const response = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data.results || []);
//       } catch (error) {
//         setSnackbar({ open: true, message: `Ошибка загрузки данных: ${error.message}`, severity: 'error' });
//       }
//     };

//     fetchData();
//   }, []);

//   const handleShelfChange = (productId, field, value) => {
//     setShelfData({
//       ...shelfData,
//       [productId]: {
//         ...shelfData[productId],
//         [field]: value,
//       },
//     });
//   };

//   const handleAddOrUpdateShelf = async (productId) => {
//     const { existing_shelf, new_shelf_name, stock } = shelfData[productId] || {};

//     if ((!existing_shelf && !new_shelf_name) || !stock) {
//       setSnackbar({ open: true, message: 'Необходимо выбрать существующую полку или ввести новую, а также указать количество', severity: 'error' });
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
//         // Если создается новая полка
//         payload.shelf_name = new_shelf_name;
//       } else {
//         // Если используется существующая полка
//         payload.shelf_name = existing_shelf;
//       }

//       await axiosInstance.post(`companies/${idCompany}/sorting/`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setSnackbar({ open: true, message: 'Полка успешно обновлена или добавлена', severity: 'success' });

//       // Опционально можно обновить данные после успешной операции
//       const updatedData = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setData(updatedData.data.results || []);
//     } catch (error) {
//       setSnackbar({ open: true, message: `Ошибка при обновлении данных: ${error.message}`, severity: 'error' });
//     }
//   };

//   return (
//     <div>
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
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.product}</TableCell>
//                 <TableCell>{row.unsorted}</TableCell>
//                 <TableCell>
//                   {/* Селектор для выбора существующей полки */}
//                   <Select
//                     value={shelfData[row.id]?.existing_shelf || ''}
//                     onChange={(e) => handleShelfChange(row.id, 'existing_shelf', e.target.value)}
//                     displayEmpty
//                   >
//                     <MenuItem value="" disabled>Выберите полку</MenuItem>
//                     {/* Проверяем, существует ли массив полок */}
//                     {Array.isArray(row.shelves) && row.shelves.length > 0 ? (
//                       row.shelves.map((shelf) => (
//                         <MenuItem key={shelf.id} value={shelf.shelf_name}>{shelf.shelf_name}</MenuItem>
//                       ))
//                     ) : (
//                       <MenuItem disabled>Нет доступных полок</MenuItem>
//                     )}
//                   </Select>

         

//                   {/* Поле для новой полки */}
//                   <TextField
//                     value={shelfData[row.id]?.new_shelf_name || ''}
//                     onChange={(e) => handleShelfChange(row.id, 'new_shelf_name', e.target.value)}
//                     placeholder="Новая полка"
//                     margin="dense"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   {/* Поле для количества товара */}
//                   <TextField
//                     type="number"
//                     value={shelfData[row.id]?.stock || ''}
//                     onChange={(e) => handleShelfChange(row.id, 'stock', e.target.value)}
//                     placeholder="Количество"
//                     margin="dense"
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     onClick={() => handleAddOrUpdateShelf(row.id)}
//                     color="primary"
//                   >
//                     Добавить/Обновить
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Уведомления */}
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ open: false, message: '', severity: 'success' })}>
//         <Alert onClose={() => setSnackbar({ open: false, message: '', severity: 'success' })} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default SkladSortirovki;


import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { axiosInstance } from 'src/api/api';

const SkladSortirovki = () => {
  const [data, setData] = useState([]); // Данные по продуктам и полкам
  const [shelfData, setShelfData] = useState({}); // Данные для новых/выбранных полок
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [newShelfData, setNewShelfData] = useState({}); // Данные для новых полок
  // const [openModal, setOpenModal] = useState(false); // Для модального окна
  // const [selectedProduct, setSelectedProduct] = useState(null); // ID выбранного продукта
  // const [isLoadingAction, setIsLoadingAction] = useState(false); // Индикатор состояния действий
  const [selectedShelf, setSelectedShelf] = useState(''); // Выбранная полка
  // const [existingShelves, setExistingShelves] = useState([]); // Существующие полки

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании
        const response = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.results || []);
      } catch (error) {
        setSnackbar({ open: true, message: `Ошибка загрузки данных: ${error.message}`, severity: 'error' });
      }
    };

    fetchData();
  }, []);

  const handleShelfChange = (productId, value) => {
    setShelfData({
      ...shelfData,
      [productId]: {
        ...shelfData[productId],
        existing_shelf: value, // Изменяем выбранную полку для конкретного продукта
      },
    });
  };
  

  const handleAddOrUpdateShelf = async (productId) => {
    const { existing_shelf, new_shelf_name, stock } = shelfData[productId] || {};

    if ((!existing_shelf && !new_shelf_name) || !stock) {
      setSnackbar({ open: true, message: 'Необходимо выбрать существующую полку или ввести новую, а также указать количество', severity: 'error' });
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
        // Если создается новая полка
        payload.shelf_name = new_shelf_name;
      } else {
        // Если используется существующая полка
        payload.shelf_name = existing_shelf;
      }

      await axiosInstance.post(`companies/${idCompany}/sorting/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSnackbar({ open: true, message: 'Полка успешно обновлена или добавлена', severity: 'success' });

      // Опционально можно обновить данные после успешной операции
      const updatedData = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(updatedData.data.results || []);
    } catch (error) {
      setSnackbar({ open: true, message: `Ошибка при обновлении данных: ${error.message}`, severity: 'error' });
    }
  };

  console.log(data);
  

  return (
    <div>
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
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.unsorted}</TableCell>
                <TableCell>
                <FormControl fullWidth margin="dense">
  <InputLabel id="shelf-select-label">Полка</InputLabel>
  <Select
    labelId="shelf-select-label"
    value={shelfData[row.id]?.existing_shelf || ''} // Значение для выбранной полки конкретного продукта
    onChange={(e) => handleShelfChange(row.id, e.target.value)} // Передаем id продукта и новое значение
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



                  {/* Поле для новой полки */}
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
                  {/* Поле для количества товара */}
                  <TextField
                    type="number"
                    value={shelfData[row.id]?.stock || ''}
                    onChange={(e) => handleShelfChange(row.id, 'stock', e.target.value)}
                    placeholder="Количество"
                    margin="dense"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAddOrUpdateShelf(row.id)}
                    color="primary"
                  >
                    Добавить/Обновить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Уведомления */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ open: false, message: '', severity: 'success' })}>
        <Alert onClose={() => setSnackbar({ open: false, message: '', severity: 'success' })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SkladSortirovki;
