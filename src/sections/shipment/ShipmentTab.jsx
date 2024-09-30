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

// export default function ShipmentTab() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(100);
//   const [data, setData] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [selected, setSelected] = useState([]);
//   const [filterName, setFilterName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [regions, setRegions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');

//         const response = await axiosInstance.get(
//           `companies/${idCompany}/shipment/?page_size=${rowsPerPage}&page=${page + 1}`,
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
//   }, [rowsPerPage, page]);

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

//   return (
//     <Card>
//       <UserTableToolbar
//         numSelected={selected.length}
//         filterName={filterName}
//         onFilterName={handleFilterByName}
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
//                       onClick={() => handleSubmitProduction(row.id)}
//                     >
//                       <BsCheck2 />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
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
} from '@mui/material';
import { useState, useEffect } from 'react';
import { axiosInstance } from 'src/api/api';
import UserTableToolbar from './user-table-toolbar';
import { BsCheck2 } from 'react-icons/bs';

export default function ShipmentTab() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');

        const response = await axiosInstance.get(
          `companies/${idCompany}/shipment/?page_size=${rowsPerPage}&page=${page + 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const results = response.data.results || [];

        // Обновляем данные и количество товаров
        setData(results);
        setTotalProducts(response.data.product_count || 0);

        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error('Ошибка при получении данных:', err.message);
      }
    };

    fetchData();
  }, [rowsPerPage, page]);

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

  // Функция для отправки POST запроса с нужными параметрами
  // const handleSubmitProduction = async (productId, shipmentId, shelfIds) => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('token')).access;
  //     const idCompany = localStorage.getItem('selectedCompany');

  //     // Отправляем POST запрос с нужными параметрами
  //     const response = await axiosInstance.post(
  //       `companies/${idCompany}/shipment-history/`,
  //       {
  //         shelf_ids: shelfIds, // Массив полок
  //         shipment_id: shipmentId, // Идентификатор отгрузки
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log('Успешная отправка:', response.data);
  //     // Обновление интерфейса или вывод сообщения об успехе
  //   } catch (err) {
  //     console.error('Ошибка при отправке данных:', err.message);
  //   }
  // };

  // const handleSubmitProduction = async (productId, shipmentId, shelfData) => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('token')).access;
  //     const idCompany = localStorage.getItem('selectedCompany');

  //     // Извлекаем только id из массива shelfData
  //     const shelfIds = shelfData.map((shelf) => shelf.id);

  //     // Отправляем POST запрос с нужными параметрами
  //     const response = await axiosInstance.post(
  //       `companies/${idCompany}/shipment-history/`,
  //       {
  //         shelf_ids: shelfIds, // Массив id полок
  //         shipment_id: shipmentId, // Идентификатор отгрузки
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log('Успешная отправка:', response.data);
  //     // Обновление интерфейса или вывод сообщения об успехе
  //   } catch (err) {
  //     console.error('Ошибка при отправке данных:', err.message);
  //   }
  // };

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

  return (
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
                    {row.in_shelf.length > 0 ? row.in_shelf.join(', ') : 'Нет данных'}
                  </TableCell>
                  <TableCell>{row.in_warehouse}</TableCell>
                  <TableCell>{row.shipment}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleSubmitProduction(row)} // передаем весь объект row
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
    </Card>
  );
}
