// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   Card,
// // } from '@mui/material';
// // import { useState } from 'react';
// // import { data } from './data';

// // export default function ShipmentHistoryTab() {
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(5);

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const currentData = data['История отгрузок'];
// //   const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// //   return (
// //     <Card>
// //       <TableContainer>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Артикул</TableCell>
// //               <TableCell>Полка</TableCell>
// //               <TableCell>Количество отгружено</TableCell>
// //               <TableCell>Дата отгрузки</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {displayedData.map((row) => (
// //               <TableRow key={row.id}>
// //                 <TableCell>{row.id}</TableCell>
// //                 <TableCell>{row['Полка']}</TableCell>
// //                 <TableCell>{row['Количество отгружено']}</TableCell>
// //                 <TableCell>{row['Дата отгрузки']}</TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //       <TablePagination
// //         rowsPerPageOptions={[5, 10, 25]}
// //         component="div"
// //         count={currentData.length}
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
// } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { axiosInstance } from 'src/api/api';

// export default function ShipmentHistoryTab() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(100);
//   const [data, setData] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');

//         const response = await axiosInstance.get(
//           `companies/${idCompany}/shipment-history/?page_size=${rowsPerPage}&page=${page + 1}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setData(response.data.results || []);
//         setTotalProducts(response.data.product_count || 0);
//         setLoading(false);
//         console.log(response.data);
//       } catch (err) {
//         console.error('Error fetching data:', err.message);
//       }
//     };

//     fetchData();
//   }, [rowsPerPage, page]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Card>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Артикул</TableCell>
//               <TableCell>Полка</TableCell>
//               <TableCell>Количество отгружено</TableCell>
//               <TableCell>Дата отгрузки</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {!loading && data.length > 0 ? (
//               data.map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{row.id}</TableCell>
//                   <TableCell>{row['Полка']}</TableCell>
//                   <TableCell>{row['Количество отгружено']}</TableCell>
//                   <TableCell>{row['Дата отгрузки']}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   Loading data...
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
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns'; // to format dates if needed

export default function ShipmentHistoryTab() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');

        const response = await axiosInstance.get(
          `companies/${idCompany}/shipment-history/?page_size=${rowsPerPage}&page=${page + 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.results || []);
        setTotalProducts(response.data.product_count || 0);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };

    fetchData();
  }, [rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Получение уникальных дат для заголовка и их сортировка в обратном порядке
  const uniqueDates = data.length > 0
    ? Array.from(new Set(data.flatMap(row => Object.keys(row.data)))).sort((a, b) => new Date(b) - new Date(a))
    : [];


    const handleExcelExport = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Shipment History');
  
      // Adding headers
      worksheet.addRow(['Артикул', ...uniqueDates]);
  
      // Adding data rows
      data.forEach((row) => {
        const rowData = [row.product];
        uniqueDates.forEach((date) => {
          rowData.push(row.data[date] || 0); // Push the data for each date
        });
        worksheet.addRow(rowData);
      });
  
      // Generate Excel file and save it
      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer]), `ShipmentHistory_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
    };

  return (
    <Card>
      <div>
      <Button variant="contained" color="primary" onClick={handleExcelExport}>
        Export to Excel
      </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              {uniqueDates.map((date) => (
                <TableCell key={date}>{date}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.product}>
                  <TableCell>{row.product}</TableCell>
                  {uniqueDates.map((date) => (
                    <TableCell key={`${row.product}-${date}`}>
                      {row.data[date] || 0}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={uniqueDates.length + 1} align="center">
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
