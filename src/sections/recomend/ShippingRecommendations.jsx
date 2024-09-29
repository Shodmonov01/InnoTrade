// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   Paper,
// //   Typography,
// // } from '@mui/material';
// // import { axiosInstance } from 'src/api/api';

// // export default function ShippingRecommendations() {
// //   const [data, setData] = useState([]);
// //   const [totalProducts, setTotalProducts] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(100); // Количество строк на страницу по умолчанию
// //   const [page, setPage] = useState(0); // Текущая страница
// //   const [loading, setLoading] = useState(true);
// //   const [regions, setRegions] = useState([]); // Список филиалов

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem('token')).access;
// //         const idCompany = localStorage.getItem('selectedCompany');

// //         const response = await axiosInstance.get(
// //           `companies/${idCompany}/supplier/?page_size=${rowsPerPage}&page=${page + 1}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         setData(response.data.results || []);
// //         setTotalProducts(response.data.product_count || 0);

// //         // Получаем уникальный список филиалов для заголовков
// //         const uniqueRegions = [
// //           ...new Set(response.data.results.flatMap((row) => row.data.map((region) => region.region_name)))
// //         ];
// //         setRegions(uniqueRegions);

// //         setLoading(false);
// //         console.log(response.data);
// //       } catch (err) {
// //         console.error('Ошибка при получении данных:', err.message);
// //       }
// //     };

// //     fetchData();
// //   }, [rowsPerPage, page]);

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0); // Сбрасываем на первую страницу при изменении количества строк на странице
// //   };

// //   if (loading) {
// //     return <p>Загрузка...</p>;
// //   }

// //   return (
// //     <Paper>
// //       <TableContainer style={{ overflowX: 'auto' }}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Артикул</TableCell>
// //               {regions.map((region) => (
// //                 <TableCell key={region}>{region}</TableCell>
// //               ))}
// //             </TableRow>
// //             <TableRow>
// //               <TableCell />
// //               {regions.map((region) => (
// //                 <TableCell key={region}>Количество</TableCell>
// //               ))}
// //             </TableRow>
// //             <TableRow>
// //               <TableCell />
// //               {regions.map((region) => (
// //                 <TableCell key={region}>Осталось дней</TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {data.map((row) => (
// //               <TableRow key={row.product}>
// //                 <TableCell>{row.product}</TableCell>
// //                 {regions.map((region) => {
// //                   const regionData = row.data.find((r) => r.region_name === region);
// //                   return (
// //                     <TableCell key={region}>
// //                       {regionData ? (
// //                         <>
// //                           <Typography>{regionData.quantity}</Typography>
// //                           <Typography>{regionData.days_left}</Typography>
// //                         </>
// //                       ) : (
// //                         <Typography>Нет данных</Typography>
// //                       )}
// //                     </TableCell>
// //                   );
// //                 })}
// //               </TableRow>
// //             ))}
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
// //     </Paper>
// //   );
// // }


// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Paper,
//   Typography,
// } from '@mui/material';
// import { axiosInstance } from 'src/api/api';

// export default function ShippingRecommendations() {
//   const [data, setData] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(100); // Количество строк на страницу по умолчанию
//   const [page, setPage] = useState(0); // Текущая страница
//   const [loading, setLoading] = useState(true);
//   const [regions, setRegions] = useState([]); // Список филиалов

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');

//         const response = await axiosInstance.get(
//           `companies/${idCompany}/supplier/?page_size=${rowsPerPage}&page=${page + 1}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setData(response.data.results || []);
//         setTotalProducts(response.data.product_count || 0);

//         // Получаем уникальный список филиалов для заголовков
//         const uniqueRegions = [
//           ...new Set(response.data.results.flatMap((row) => row.data.map((region) => region.region_name))),
//         ];
//         setRegions(uniqueRegions);

//         setLoading(false);
//         console.log(response.data);
//       } catch (err) {
//         console.error('Ошибка при получении данных:', err.message);
//       }
//     };

//     fetchData();
//   }, [rowsPerPage, page]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Сбрасываем на первую страницу при изменении количества строк на странице
//   };

//   if (loading) {
//     return <p>Загрузка...</p>;
//   }

//   return (
//     <Paper>
//       <TableContainer style={{ overflowX: 'auto' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell rowSpan={2}>Артикул</TableCell>
//               {regions.map((region) => (
//                 <TableCell key={region} colSpan={2} align="center">
//                   {region}
//                 </TableCell>
//               ))}
//             </TableRow>
//             <TableRow>
//               {regions.map((region) => (
//                 <>
//                   <TableCell key={`${region}-quantity`} align="center">
//                     Количество
//                   </TableCell>
//                   <TableCell key={`${region}-days_left`} align="center">
//                     Осталось дней
//                   </TableCell>
//                 </>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.product}>
//                 <TableCell>{row.product}</TableCell>
//                 {regions.map((region) => {
//                   const regionData = row.data.find((r) => r.region_name === region);
//                   return (
//                     <>
//                       <TableCell key={`${region}-quantity`} align="center">
//                         {regionData ? regionData.quantity : '0'}
//                       </TableCell>
//                       <TableCell key={`${region}-days_left`} align="center">
//                         {regionData ? regionData.days_left : '0'}
//                       </TableCell>
//                     </>
//                   );
//                 })}
//               </TableRow>
//             ))}
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
//     </Paper>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
} from '@mui/material';
import { axiosInstance } from 'src/api/api';

export default function ShippingRecommendations() {
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100); // Количество строк на страницу по умолчанию
  const [page, setPage] = useState(0); // Текущая страница
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]); // Список филиалов

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');

        const response = await axiosInstance.get(
          `companies/${idCompany}/supplier/?page_size=${rowsPerPage}&page=${page + 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.results || []);
        setTotalProducts(response.data.product_count || 0);

        // Получаем уникальный список филиалов для заголовков
        const uniqueRegions = [
          ...new Set(response.data.results.flatMap((row) => row.data.map((region) => region.region_name))),
        ];
        setRegions(uniqueRegions);

        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error('Ошибка при получении данных:', err.message);
      }
    };

    fetchData();
  }, [rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Сбрасываем на первую страницу при изменении количества строк на странице
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <Paper>
      <TableContainer style={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell 
                rowSpan={2} 
                style={{
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#fff',
                  zIndex: 1,
                }}
              >
                Артикул
              </TableCell>
              {regions.map((region) => (
                <TableCell key={region} colSpan={2} align="center">
                  {region}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {regions.map((region) => (
                <>
                  <TableCell key={`${region}-quantity`} align="center">
                    Количество
                  </TableCell>
                  <TableCell key={`${region}-days_left`} align="center">
                    Осталось дней
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.product}>
                <TableCell 
                  style={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: '#fff',
                    zIndex: 1,
                  }}
                >
                  {row.product}
                </TableCell>
                {regions.map((region) => {
                  const regionData = row.data.find((r) => r.region_name === region);
                  return (
                    <>
                      <TableCell key={`${region}-quantity`} align="center">
                        {regionData ? regionData.quantity : '0'}
                      </TableCell>
                      <TableCell key={`${region}-days_left`} align="center">
                        {regionData ? regionData.days_left : '0'}
                      </TableCell>
                    </>
                  );
                })}
              </TableRow>
            ))}
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
    </Paper>
  );
}
