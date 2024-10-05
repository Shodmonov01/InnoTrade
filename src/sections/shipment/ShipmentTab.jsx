// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   Card,
// //   Button,
// // } from '@mui/material';
// // import { useState, useEffect } from 'react';
// // import { axiosInstance } from 'src/api/api';
// // import UserTableToolbar from './user-table-toolbar';
// // import { BsCheck2 } from 'react-icons/bs';
// // import ExcelJS from 'exceljs';
// // import { saveAs } from 'file-saver';
// // import { format } from 'date-fns'; // Импортируем функцию форматирования даты

// // export default function ShipmentTab() {
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(100);
// //   const [data, setData] = useState([]);
// //   const [totalProducts, setTotalProducts] = useState(0);
// //   const [selected, setSelected] = useState([]);
// //   const [filterName, setFilterName] = useState('');
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem('token')).access;
// //         const idCompany = localStorage.getItem('selectedCompany');

// //         const response = await axiosInstance.get(
// //           `companies/${idCompany}/shipment/?page_size=${rowsPerPage}&page=${page + 1}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         const results = response.data.results || [];

// //         // Обновляем данные и количество товаров
// //         setData(results);
// //         setTotalProducts(response.data.product_count || 0);

// //         setLoading(false);
// //         console.log(response.data);
// //       } catch (err) {
// //         console.error('Ошибка при получении данных:', err.message);
// //       }
// //     };

// //     fetchData();
// //   }, [rowsPerPage, page]);

// //   const handleFilterByName = (event) => {
// //     setPage(0);
// //     setFilterName(event.target.value);
// //   };

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleSubmitProduction = async (product) => {
// //     try {
// //       const token = JSON.parse(localStorage.getItem('token')).access;
// //       const idCompany = localStorage.getItem('selectedCompany');

// //       // Извлекаем только id полок из in_shelf
// //       const shelfIds = product.in_shelf.map((shelf) => shelf.id);

// //       // Отправляем POST запрос с правильным shipment_id и shelf_ids
// //       const response = await axiosInstance.post(
// //         `companies/${idCompany}/shipment-history/`,
// //         {
// //           shelf_ids: shelfIds, // массив id полок
// //           shipment_id: product.id, // id продукта как shipment_id
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       console.log('Успешная отправка:', response.data);
// //       // Обновите интерфейс, если необходимо
// //     } catch (err) {
// //       console.error('Ошибка при отправке данных:', err.message);
// //     }
// //   };

// //   const handleExportExcel = async () => {
// //     const workbook = new ExcelJS.Workbook();
// //     const worksheet = workbook.addWorksheet('Shipments');

// //     worksheet.columns = [
// //       { header: 'Артикул', key: 'product', width: 20 },
// //       { header: 'Полка', key: 'in_shelf', width: 30 },
// //       { header: 'На складе', key: 'in_warehouse', width: 15 },
// //       { header: 'Отгрузить', key: 'shipment', width: 15 },
// //     ];

// //     data.forEach((row) => {
// //       worksheet.addRow({
// //         product: row.product,
// //         in_shelf: row.in_shelf.join(', '),
// //         in_warehouse: row.in_warehouse,
// //         shipment: row.shipment,
// //       });
// //     });

// //     // Сохраняем файл с текущей датой
// //     const buffer = await workbook.xlsx.writeBuffer();
// //     saveAs(new Blob([buffer]), `shipments_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
// //   };

// //   return (
// //     <Card>
// //       <UserTableToolbar
// //         numSelected={selected.length}
// //         filterName={filterName}
// //         onFilterName={handleFilterByName}
// //         onExportExcel={handleExportExcel}
// //       />
// //       <TableContainer>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Артикул</TableCell>
// //               <TableCell>Полка</TableCell>
// //               <TableCell>На складе</TableCell>
// //               <TableCell>Отгрузить</TableCell>
// //               <TableCell>Действия</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {!loading && data.length > 0 ? (
// //               data.map((row) => (
// //                 <TableRow key={row.id}>
// //                   <TableCell>{row.product}</TableCell>
// //                   <TableCell>
// //                     {row.in_shelf.length > 0 ? row.in_shelf.join(', ') : 'Нет данных'}
// //                   </TableCell>
// //                   <TableCell>{row.in_warehouse}</TableCell>
// //                   <TableCell>{row.shipment}</TableCell>
// //                   <TableCell>
// //                     <Button
// //                       variant="contained"
// //                       color="warning"
// //                       onClick={() => handleSubmitProduction(row)} // передаем весь объект row
// //                     >
// //                       <BsCheck2 />
// //                     </Button>
// //                   </TableCell>
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell colSpan={5} align="center">
// //                   Загрузка данных...
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //       <TablePagination
// //         rowsPerPageOptions={[100, 500, 1000]}
// //         component="div"
// //         count={totalProducts}
// //         rowsPerPage={rowsPerPage}
// //         page={page}
// //         onPageChange={handleChangePage}
// //         onRowsPerPageChange={handleChangeRowsPerPage}
// //       />
// //     </Card>
// //   );
// // }

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Card,
//   Button,
// } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { axiosInstance } from 'src/api/api';
// import UserTableToolbar from './user-table-toolbar';
// import { BsCheck2 } from 'react-icons/bs';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import { format } from 'date-fns'; // Импортируем функцию форматирования даты

// export default function ShipmentTab() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(100);
//   const [data, setData] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [selected, setSelected] = useState([]);
//   const [filterName, setFilterName] = useState('');
//   const [sort, setSort] = useState(''); // Для сортировки
//   const [service, setService] = useState(''); // Для фильтра по сервисам
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');

//         const response = await axiosInstance.get(
//           `companies/${idCompany}/shipment/?page_size=${rowsPerPage}&page=${page + 1}&sort=${sort}&service=${service}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const results = response.data.results || [];

//         // Обновляем данные и количество товаров
//         setData(results);
//         setTotalProducts(response.data.product_count || 0);

//         setLoading(false);
//         console.log(response.data);
//       } catch (err) {
//         console.error('Ошибка при получении данных:', err.message);
//       }
//     };

//     fetchData();
//   }, [rowsPerPage, page, sort, service]); // Добавили зависимость от сортировки и фильтра

//   const handleFilterByName = (event) => {
//     setPage(0);
//     setFilterName(event.target.value);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSortChange = (event) => {
//     setSort(event.target.value);
//   };

//   const handleServiceChange = (event) => {
//     setService(event.target.value);
//   };

//   const handleSubmitProduction = async (product) => {
//     try {
//       const token = JSON.parse(localStorage.getItem('token')).access;
//       const idCompany = localStorage.getItem('selectedCompany');

//       const shelfIds = product.in_shelf.map((shelf) => shelf.id);

//       const response = await axiosInstance.post(
//         `companies/${idCompany}/shipment-history/`,
//         {
//           shelf_ids: shelfIds,
//           shipment_id: product.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('Успешная отправка:', response.data);
//     } catch (err) {
//       console.error('Ошибка при отправке данных:', err.message);
//     }
//   };

//   const handleExportExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Shipments');

//     worksheet.columns = [
//       { header: 'Артикул', key: 'product', width: 20 },
//       { header: 'Полка', key: 'in_shelf', width: 30 },
//       { header: 'На складе', key: 'in_warehouse', width: 15 },
//       { header: 'Отгрузить', key: 'shipment', width: 15 },
//     ];

//     data.forEach((row) => {
//       worksheet.addRow({
//         product: row.product,
//         in_shelf: row.in_shelf.join(', '),
//         in_warehouse: row.in_warehouse,
//         shipment: row.shipment,
//       });
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     saveAs(new Blob([buffer]), `shipments_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
//   };

//   return (
//     <Card>
//       <UserTableToolbar
//         numSelected={selected.length}
//         filterName={filterName}
//         onFilterName={handleFilterByName}
//         onExportExcel={handleExportExcel}
//         sort={sort}
//         handleSortChange={handleSortChange}
//         service={service}
//         handleServiceChange={handleServiceChange}
//       />
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Артикул</TableCell>
//               <TableCell>Полка</TableCell>
//               <TableCell>На складе</TableCell>
//               <TableCell>Отгрузить</TableCell>
//               <TableCell>Действия</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {!loading && data.length > 0 ? (
//               data.map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{row.product}</TableCell>
//                   <TableCell>
//                     {row.in_shelf.length > 0 ? row.in_shelf.join(', ') : 'Нет данных'}
//                   </TableCell>
//                   <TableCell>{row.in_warehouse}</TableCell>
//                   <TableCell>{row.shipment}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color="warning"
//                       onClick={() => handleSubmitProduction(row)}
//                     >
//                       <BsCheck2 />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   Загрузка данных...
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[100, 500, 1000]}
//         component="div"
//         count={totalProducts}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Card>
//   );
// }

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { axiosInstance } from 'src/api/api';
import UserTableToolbar from './user-table-toolbar';
import { BsCheck2 } from 'react-icons/bs';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

export default function ShipmentTab() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [sort, setSort] = useState('');
  const [service, setService] = useState('');
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      const response = await axiosInstance.get(
        `companies/${idCompany}/shipment/?page_size=${rowsPerPage}&page=${
          page + 1
        }&search=${filterName}&sort=${sort}&service=${service}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const results = response.data.results || [];

      setData(results);
      setTotalProducts(response.data.product_count || 0);
      setLoading(false);
    } catch (err) {
      console.error('Ошибка при получении данных:', err.message);
    }
  };

  const handleSubmitProduction = async (product) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      // Извлекаем только id полок из in_shelf
      const shelfIds = product.in_shelf.map((shelf) => shelf.id);

      // Отправляем POST запрос с правильным shipment_id и shelf_ids
      const response = await axiosInstance.post(
        `companies/${idCompany}/shipment-history/`,
        {
          shelf_ids: shelfIds, // массив id полок
          shipment_id: product.id, // id продукта как shipment_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Успешная отправка:', response.data);
      // Обновите интерфейс, если необходимо
    } catch (err) {
      console.error('Ошибка при отправке данных:', err.message);
    }
  };

  const handleSubmitAllProduction = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      const allShipmentRequests = data.map((product) => {
        const shelfIds = product.in_shelf.map((shelf) => shelf.id);
        return axiosInstance.post(
          `companies/${idCompany}/shipment-history/`,
          {
            shelf_ids: shelfIds,
            shipment_id: product.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });

      // Ожидаем завершения всех запросов
      const responses = await Promise.all(allShipmentRequests);
      console.log('Все товары успешно отправлены:', responses);
    } catch (err) {
      console.error('Ошибка при массовой отправке:', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rowsPerPage, page]);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleServiceChange = (event) => {
    setService(event.target.value);
  };

  const handleSearchClick = () => {
    setPage(0); // Сброс страницы при новом поиске
    fetchData(); // Отправка запроса при нажатии кнопки "Поиск"
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Shipments');

    worksheet.columns = [
      { header: 'Артикул', key: 'product', width: 20 },
      { header: 'Полка', key: 'in_shelf', width: 30 },
      { header: 'На складе', key: 'in_warehouse', width: 15 },
      { header: 'Отгрузить', key: 'shipment', width: 15 },
    ];

    data.forEach((row) => {
      worksheet.addRow({
        product: row.product,
        in_shelf: row.in_shelf.join(', '),
        in_warehouse: row.in_warehouse,
        shipment: row.shipment,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `shipments_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmSubmit = () => {
    handleSubmitAllProduction();
    handleCloseDialog();
  };

  return (
    <Card>
      <UserTableToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        sort={sort}
        handleSortChange={handleSortChange}
        service={service}
        handleServiceChange={handleServiceChange}
        onSearch={handleSearchClick} // Передаем функцию для поиска
        onExportExcel={handleExportExcel}
        handleSubmitAllProduction={handleSubmitAllProduction}
        onOpenDialog={handleOpenDialog}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell>Полка</TableCell>
              <TableCell>На складе</TableCell>
              <TableCell>Отгрузить</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>
                    {row.in_shelf.length > 0
                      ? row.in_shelf.map((shelf) => shelf.shelf_name).join(', ')
                      : 'Нет данных'}
                  </TableCell>

                  <TableCell>{row.in_warehouse}</TableCell>
                  <TableCell>{row.shipment}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleSubmitProduction(row)}
                    >
                      <BsCheck2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Загрузка данных...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[100, 500, 1000]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Подтверждение</DialogTitle>
        <DialogContent>
          <p>Вы уверены, что хотите отправить все товары?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
