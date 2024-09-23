// // // // import React, { useEffect, useState } from 'react';
// // // // import { axiosInstance } from 'src/api/api';

// // // // const SkladSortirovki = () => {
// // // //   const [data, setData] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const token = JSON.parse(localStorage.getItem('token')).access;        const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
// // // //         const response = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         });
// // // //         setData(response.data);
// // // //         setLoading(false);
// // // //       } catch (err) {
// // // //         setError(err.message);
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, []);

// // // //   if (loading) return <p>Loading...</p>;
// // // //   if (error) return <p>Error: {error}</p>;

// // // //   return (
// // // //     <div>
// // // //       <h2>Склад сортировки</h2>
// // // //       {/* Отображение данных */}
// // // //       <pre>{JSON.stringify(data, null, 2)}</pre>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SkladSortirovki;
// // // // // 

// // // import React, { useEffect, useState } from 'react';
// // // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton } from '@mui/material';
// // // import { AiOutlinePlus } from 'react-icons/ai'; // Иконка для добавления нового места
// // // import { FaCheckSquare } from 'react-icons/fa'; // Иконка для завершения сортировки
// // // import { axiosInstance } from 'src/api/api';

// // // const SkladSortirovki = () => {
// // //   const [data, setData] = useState([]); // Должно быть массивом
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [sortingLocations, setSortingLocations] = useState({}); // Храним изменения мест сортировки
// // //   const [newLocations, setNewLocations] = useState({}); // Новые места хранения

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const token = JSON.parse(localStorage.getItem('token')).access;
// // //         const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
// // //         const response = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         });

// // //         const responseData = response.data.results || [];
// // //         setData(responseData); // Обновляем состояние
// // //         setLoading(false);
// // //       } catch (err) {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   const handleStorageLocationChange = (id, value) => {
// // //     setSortingLocations({
// // //       ...sortingLocations,
// // //       [id]: value, // Обновляем количество для сортировки
// // //     });
// // //   };

// // //   const handleNewLocationChange = (id, value) => {
// // //     setNewLocations({
// // //       ...newLocations,
// // //       [id]: value, // Обновляем новое место хранения
// // //     });
// // //   };

// // //   const handleAddNewLocation = (id) => {
// // //     // Логика для добавления нового места
// // //     console.log(`Добавить новое место для id: ${id}, новое место: ${newLocations[id]}`);
// // //   };

// // //   const handleMoveToFinishedGoods = (id) => {
// // //     // Логика для перемещения на склад готовой продукции
// // //     console.log(`Переместить на склад готовой продукции для id: ${id}`);
// // //   };

// // //   if (loading) return <p>Loading...</p>;
// // //   if (error) return <p>Error: {error}</p>;

// // //   if (!Array.isArray(data)) {
// // //     return <p>Ошибка: данные не в формате массива</p>;
// // //   }

// // //   return (
// // //     <div>
// // //       <h2>Склад сортировки</h2>
// // //       <TableContainer>
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell>Продукт</TableCell>
// // //               <TableCell>Несортированное</TableCell>
// // //               <TableCell>Новое место хранения</TableCell>
// // //               <TableCell>Места хранения</TableCell>
// // //               <TableCell>Действия</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {data.map((row) => (
// // //               <TableRow key={row.id}>
// // //                 <TableCell>{row.product}</TableCell>
// // //                 <TableCell>
// // //                   <TextField
// // //                     type="number"
// // //                     value={sortingLocations[row.id] || row.unsorted}
// // //                     onChange={(e) => handleStorageLocationChange(row.id, e.target.value)}
// // //                   />
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <TextField
// // //                     size="small"
// // //                     value={newLocations[row.id] || ''}
// // //                     onChange={(e) => handleNewLocationChange(row.id, e.target.value)}
// // //                     placeholder="Новое место"
// // //                   />
// // //                   <IconButton
// // //                     onClick={() => handleAddNewLocation(row.id)}
// // //                     size="small"
// // //                     color="primary"
// // //                   >
// // //                     <AiOutlinePlus />
// // //                   </IconButton>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   {row.shelf.length > 0 ? row.shelf.join(', ') : 'Нет мест хранения'}
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <IconButton onClick={() => handleMoveToFinishedGoods(row.id)}>
// // //                     <FaCheckSquare />
// // //                   </IconButton>
// // //                 </TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>
// // //     </div>
// // //   );
// // // };

// // // export default SkladSortirovki;

// // import React, { useEffect, useState } from 'react';
// // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, Button } from '@mui/material';
// // import { AiOutlinePlus } from 'react-icons/ai'; // Иконка для добавления нового места
// // import { FaCheckSquare } from 'react-icons/fa'; // Иконка для завершения сортировки
// // import { axiosInstance } from 'src/api/api';

// // const SkladSortirovki = () => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [newShelfData, setNewShelfData] = useState({}); // Храним данные для новых полок

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

// //   const handleNewShelfChange = (id, field, value) => {
// //     setNewShelfData({
// //       ...newShelfData,
// //       [id]: {
// //         ...newShelfData[id],
// //         [field]: value, // Обновляем поле полки (имя или количество)
// //       },
// //     });
// //   };

// //   const handleAddNewShelf = (id) => {
// //     if (!newShelfData[id] || !newShelfData[id].shelf_name || !newShelfData[id].stock) {
// //       alert('Введите данные для новой полки и количество товара');
// //       return;
// //     }

// //     // Логика для отправки данных новой полки на сервер
// //     const { shelf_name, stock } = newShelfData[id];
// //     const token = JSON.parse(localStorage.getItem('token')).access;
// //     const idCompany = localStorage.getItem('selectedCompany');

// //     axiosInstance.post(`companies/${idCompany}/sorting/`, {
// //       sorting_warehouse_id: id,
// //       stock: Number(stock),
// //       shelf_name: shelf_name,
// //     }, {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       }
// //     })
// //       .then(() => {
// //         alert('Товар успешно размещен на новой полке');
// //         // Логика для обновления данных полки в интерфейсе может быть добавлена тут
// //       })
// //       .catch((error) => {
// //         console.error('Ошибка при размещении товара на новой полке:', error);
// //       });
// //   };

// //   const handleMoveToFinishedGoods = (id) => {
// //     // Логика для завершения сортировки и перемещения товара на другой склад
// //     console.log(`Переместить на склад готовой продукции для id: ${id}`);
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   return (
// //     <div>
// //       <h2>Склад сортировки</h2>
// //       <TableContainer>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Продукт</TableCell>
// //               <TableCell>Несортированное</TableCell>
// //               <TableCell>Новая полка</TableCell>
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
// //                   <TextField
// //                     label="Имя полки"
// //                     value={newShelfData[row.id]?.shelf_name || ''}
// //                     onChange={(e) => handleNewShelfChange(row.id, 'shelf_name', e.target.value)}
// //                     placeholder="Введите имя полки"
// //                   />
// //                   <TextField
// //                     label="Количество"
// //                     type="number"
// //                     value={newShelfData[row.id]?.stock || ''}
// //                     onChange={(e) => handleNewShelfChange(row.id, 'stock', e.target.value)}
// //                     placeholder="Количество товара"
// //                     style={{ marginLeft: 8 }}
// //                   />
// //                   <IconButton
// //                     onClick={() => handleAddNewShelf(row.id)}
// //                     size="small"
// //                     color="primary"
// //                     style={{ marginLeft: 8 }}
// //                   >
// //                     <AiOutlinePlus />
// //                   </IconButton>
// //                 </TableCell>
// //                 <TableCell>
// //                   {row.shelf.length > 0 ? (
// //                     row.shelf.map((s) => (
// //                       <div key={s.id}>
// //                         Полка: {s.shelf_name} - Количество: {s.stock}
// //                       </div>
// //                     ))
// //                   ) : (
// //                     'Нет мест хранения'
// //                   )}
// //                 </TableCell>
// //                 <TableCell>
// //                   <IconButton onClick={() => handleMoveToFinishedGoods(row.id)}>
// //                     <FaCheckSquare />
// //                   </IconButton>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </div>
// //   );
// // };

// // export default SkladSortirovki;


// import React, { useEffect, useState } from 'react';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle,
// } from '@mui/material';
// import { AiOutlinePlus } from 'react-icons/ai';
// import { FaCheckSquare } from 'react-icons/fa';
// import { axiosInstance } from 'src/api/api';

// const SkladSortirovki = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newShelfData, setNewShelfData] = useState({}); // Храним данные для новых полок
//   const [openModal, setOpenModal] = useState(false); // Для модального окна
//   const [selectedProduct, setSelectedProduct] = useState(null); // ID выбранного продукта

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
//         const response = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const responseData = response.data.results || [];
//         setData(responseData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleNewShelfChange = (field, value) => {
//     setNewShelfData({
//       ...newShelfData,
//       [field]: value,
//     });
//   };

//   const handleAddNewShelf = () => {
//     if (!newShelfData.shelf_name || !newShelfData.stock) {
//       alert('Введите данные для новой полки и количество товара');
//       return;
//     }

//     const { shelf_name, stock } = newShelfData;
//     const token = JSON.parse(localStorage.getItem('token')).access;
//     const idCompany = localStorage.getItem('selectedCompany');

//     axiosInstance.post(`companies/${idCompany}/sorting/`, {
//       sorting_warehouse_id: selectedProduct,
//       stock: Number(stock),
//       shelf_name: shelf_name,
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       }
//     })
//       .then(() => {
//         alert('Товар успешно размещен на новой полке');
//         setOpenModal(false);
//         // Обновление данных интерфейса может быть добавлено
//       })
//       .catch((error) => {
//         console.error('Ошибка при размещении товара на новой полке:', error);
//       });
//   };

//   const handleMoveToFinishedGoods = (id) => {
//     // Логика для завершения сортировки и перемещения товара на другой склад
//     console.log(`Переместить на склад готовой продукции для id: ${id}`);
//   };

//   const openShelfModal = (productId) => {
//     setSelectedProduct(productId);
//     setOpenModal(true);
//   };

//   const closeShelfModal = () => {
//     setOpenModal(false);
//     setNewShelfData({});
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2 style={{ marginBottom: '20px' }}>Склад сортировки</h2>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Продукт</TableCell>
//               <TableCell>Несортированное</TableCell>
//               <TableCell>Места хранения</TableCell>
//               <TableCell>Действия</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.product}</TableCell>
//                 <TableCell>{row.unsorted}</TableCell>
//                 <TableCell>
//                   {row.shelf.length > 0 ? (
//                     row.shelf.map((s) => (
//                       <div key={s.id} style={{ marginBottom: '10px' }}>
//                         Полка: <strong>{s.shelf_name}</strong> - Количество: <strong>{s.stock}</strong>
//                       </div>
//                     ))
//                   ) : (
//                     'Нет мест хранения'
//                   )}
//                 </TableCell>
//                 <TableCell>
//                   <div style={{ display: 'flex', gap: '10px' }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => openShelfModal(row.id)}
//                       startIcon={<AiOutlinePlus />}
//                     >
//                       Добавить полку
//                     </Button>
//                     <IconButton onClick={() => handleMoveToFinishedGoods(row.id)} color="success">
//                       <FaCheckSquare />
//                     </IconButton>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Модальное окно для добавления новой полки */}
//       <Dialog open={openModal} onClose={closeShelfModal}>
//         <DialogTitle>Добавить новую полку</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Имя полки"
//             value={newShelfData.shelf_name || ''}
//             onChange={(e) => handleNewShelfChange('shelf_name', e.target.value)}
//             placeholder="Введите имя полки"
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Количество"
//             type="number"
//             value={newShelfData.stock || ''}
//             onChange={(e) => handleNewShelfChange('stock', e.target.value)}
//             placeholder="Введите количество товара"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeShelfModal} color="secondary">
//             Отмена
//           </Button>
//           <Button onClick={handleAddNewShelf} color="primary">
//             Добавить
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default SkladSortirovki;


import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Snackbar, Alert,
} from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaCheckSquare } from 'react-icons/fa';
import { axiosInstance } from 'src/api/api';

const SkladSortirovki = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newShelfData, setNewShelfData] = useState({}); // Храним данные для новых полок
  const [openModal, setOpenModal] = useState(false); // Для модального окна
  const [selectedProduct, setSelectedProduct] = useState(null); // ID выбранного продукта
  const [isLoadingAction, setIsLoadingAction] = useState(false); // Индикатор состояния действий
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
        const response = await axiosInstance.get(`companies/${idCompany}/sorting/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = response.data.results || [];
        setData(responseData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewShelfChange = (field, value) => {
    setNewShelfData({
      ...newShelfData,
      [field]: value,
    });
  };

  const handleAddNewShelf = () => {
    if (!newShelfData.shelf_name || !newShelfData.stock) {
      setSnackbar({ open: true, message: 'Введите данные для новой полки и количество товара', severity: 'error' });
      return;
    }

    const { shelf_name, stock } = newShelfData;
    const token = JSON.parse(localStorage.getItem('token')).access;
    const idCompany = localStorage.getItem('selectedCompany');

    setIsLoadingAction(true);
    axiosInstance.post(`companies/${idCompany}/sorting/`, {
      sorting_warehouse_id: selectedProduct,
      stock: Number(stock),
      shelf_name: shelf_name,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(() => {
        setSnackbar({ open: true, message: 'Товар успешно размещен на новой полке', severity: 'success' });
        setOpenModal(false);
        setIsLoadingAction(false);
        // Обновление данных интерфейса может быть добавлено
      })
      .catch((error) => {
        setSnackbar({ open: true, message: `Ошибка: ${error.message}`, severity: 'error' });
        setIsLoadingAction(false);
      });
  };

  const handleMoveToFinishedGoods = (id) => {
    // Подтверждение перед перемещением
    if (window.confirm('Вы уверены, что хотите переместить товар на склад готовой продукции?')) {
      setIsLoadingAction(true);
      // Логика для завершения сортировки и перемещения товара на другой склад
      console.log(`Переместить на склад готовой продукции для id: ${id}`);
      setIsLoadingAction(false);
      setSnackbar({ open: true, message: 'Товар перемещен на склад готовой продукции', severity: 'success' });
    }
  };

  const openShelfModal = (productId) => {
    setSelectedProduct(productId);
    setOpenModal(true);
  };

  const closeShelfModal = () => {
    setOpenModal(false);
    setNewShelfData({});
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'success' });
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>Склад сортировки</h2>
      <p>Здесь вы можете отсортировать товары, добавив их на новые полки. Несортированные товары нужно распределить по полкам для дальнейшего хранения.</p>
      
      {isLoadingAction && <CircularProgress />}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell>Несортированное</TableCell>
              <TableCell>Места хранения</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.unsorted}</TableCell>
                <TableCell>
                  {row.shelf.length > 0 ? (
                    row.shelf.map((s) => (
                      <div key={s.id} style={{ marginBottom: '10px' }}>
                        <strong>Полка:</strong> {s.shelf_name} - <strong>Количество:</strong> {s.stock}
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'red' }}>Нет мест хранения</div>
                  )}
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => openShelfModal(row.id)}
                      startIcon={<AiOutlinePlus />}
                    >
                      Добавить полку
                    </Button>
                    <IconButton onClick={() => handleMoveToFinishedGoods(row.id)} color="success">
                      <FaCheckSquare />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Модальное окно для добавления новой полки */}
      <Dialog open={openModal} onClose={closeShelfModal}>
        <DialogTitle>Добавить новую полку</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Имя полки"
            value={newShelfData.shelf_name || ''}
            onChange={(e) => handleNewShelfChange('shelf_name', e.target.value)}
            placeholder="Введите имя полки"
          />
          <TextField
            fullWidth
            margin="dense"
            label="Количество"
            type="number"
            value={newShelfData.stock || ''}
            onChange={(e) => handleNewShelfChange('stock', e.target.value)}
            placeholder="Введите количество товара"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeShelfModal} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleAddNewShelf} color="primary" disabled={isLoadingAction}>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Уведомление */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SkladSortirovki;
