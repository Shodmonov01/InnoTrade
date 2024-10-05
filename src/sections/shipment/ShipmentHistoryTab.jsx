// // // import {
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   TablePagination,
// // //   Card,
// // // } from '@mui/material';
// // // import { useState } from 'react';
// // // import { data } from './data';

// // // export default function ShipmentHistoryTab() {
// // //   const [page, setPage] = useState(0);
// // //   const [rowsPerPage, setRowsPerPage] = useState(5);

// // //   const handleChangePage = (event, newPage) => {
// // //     setPage(newPage);
// // //   };

// // //   const handleChangeRowsPerPage = (event) => {
// // //     setRowsPerPage(parseInt(event.target.value, 10));
// // //     setPage(0);
// // //   };

// // //   const currentData = data['История отгрузок'];
// // //   const displayedData = currentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

// // //   return (
// // //     <Card>
// // //       <TableContainer>
// // //         <Table>
// // //           <TableHead>
// // //             <TableRow>
// // //               <TableCell>Артикул</TableCell>
// // //               <TableCell>Полка</TableCell>
// // //               <TableCell>Количество отгружено</TableCell>
// // //               <TableCell>Дата отгрузки</TableCell>
// // //             </TableRow>
// // //           </TableHead>
// // //           <TableBody>
// // //             {displayedData.map((row) => (
// // //               <TableRow key={row.id}>
// // //                 <TableCell>{row.id}</TableCell>
// // //                 <TableCell>{row['Полка']}</TableCell>
// // //                 <TableCell>{row['Количество отгружено']}</TableCell>
// // //                 <TableCell>{row['Дата отгрузки']}</TableCell>
// // //               </TableRow>
// // //             ))}
// // //           </TableBody>
// // //         </Table>
// // //       </TableContainer>
// // //       <TablePagination
// // //         rowsPerPageOptions={[5, 10, 25]}
// // //         component="div"
// // //         count={currentData.length}
// // //         rowsPerPage={rowsPerPage}
// // //         page={page}
// // //         onPageChange={handleChangePage}
// // //         onRowsPerPageChange={handleChangeRowsPerPage}
// // //       />
// // //     </Card>
// // //   );
// // // }


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
// // import { useState, useEffect } from 'react';
// // import { axiosInstance } from 'src/api/api';

// // export default function ShipmentHistoryTab() {
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(100);
// //   const [data, setData] = useState([]);
// //   const [totalProducts, setTotalProducts] = useState(0);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem('token')).access;
// //         const idCompany = localStorage.getItem('selectedCompany');

// //         const response = await axiosInstance.get(
// //           `companies/${idCompany}/shipment-history/?page_size=${rowsPerPage}&page=${page + 1}`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         setData(response.data.results || []);
// //         setTotalProducts(response.data.product_count || 0);
// //         setLoading(false);
// //         console.log(response.data);
// //       } catch (err) {
// //         console.error('Error fetching data:', err.message);
// //       }
// //     };

// //     fetchData();
// //   }, [rowsPerPage, page]);

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

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
// //             {!loading && data.length > 0 ? (
// //               data.map((row) => (
// //                 <TableRow key={row.id}>
// //                   <TableCell>{row.id}</TableCell>
// //                   <TableCell>{row['Полка']}</TableCell>
// //                   <TableCell>{row['Количество отгружено']}</TableCell>
// //                   <TableCell>{row['Дата отгрузки']}</TableCell>
// //                 </TableRow>
// //               ))
// //             ) : (
// //               <TableRow>
// //                 <TableCell colSpan={4} align="center">
// //                   Loading data...
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
//   OutlinedInput,
//   InputAdornment,
// } from '@mui/material';
// import { useState, useEffect } from 'react';
// import { axiosInstance } from 'src/api/api';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import { format } from 'date-fns'; // to format dates if needed
// import Iconify from 'src/components/iconify';

// export default function ShipmentHistoryTab() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(100);
//   const [data, setData] = useState([]);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [filterName, setFilterName] = useState('');
  

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

//   // Получение уникальных дат для заголовка и их сортировка в обратном порядке
//   const uniqueDates = data.length > 0
//     ? Array.from(new Set(data.flatMap(row => Object.keys(row.data)))).sort((a, b) => new Date(b) - new Date(a))
//     : [];


//     const handleExcelExport = async () => {
//       const workbook = new ExcelJS.Workbook();
//       const worksheet = workbook.addWorksheet('Shipment History');
  
//       // Adding headers
//       worksheet.addRow(['Артикул', ...uniqueDates]);
  
//       // Adding data rows
//       data.forEach((row) => {
//         const rowData = [row.product];
//         uniqueDates.forEach((date) => {
//           rowData.push(row.data[date] || 0); // Push the data for each date
//         });
//         worksheet.addRow(rowData);
//       });
  
//       // Generate Excel file and save it
//       const buffer = await workbook.xlsx.writeBuffer();
//       saveAs(new Blob([buffer]), `ShipmentHistory_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
//     };

//   return (
//     <Card>
//       <div className='p-5'>

//       <OutlinedInput
//             value={filterName}
//             // onChange={onFilterName}
//             placeholder="Поиск"
//             startAdornment={
//               <InputAdornment position="start" sx={{ mb: 0, px: 1 }}>
//                 <Iconify
//                   icon="eva:search-fill"
//                   sx={{ color: 'text.disabled', width: 20, height: 20 }}
//                 />
//               </InputAdornment>
//             }
//           />

// <div style={{ display: 'flex', gap: '8px' }} className="border rounded-lg p-3.5">
//         <input
//           type="date"
//           value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
//           onChange={handleStartDateChange}
//         />
//         <span>—</span>
//         <input
//           type="date"
//           value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
//           onChange={handleEndDateChange}
//         />
//       </div>

//       <Button
//             variant="contained"
//             color="primary"
//             onClick={onSearch}
//             sx={{ padding: '15px 36px', fontSize: '15px' }}
//           >
//             Поиск
//           </Button>
//       <Button variant="contained" color="primary" onClick={handleExcelExport}>
//         Export to Excel
//       </Button>
//       </div>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Артикул</TableCell>
//               {uniqueDates.map((date) => (
//                 <TableCell key={date}>{date}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {!loading && data.length > 0 ? (
//               data.map((row) => (
//                 <TableRow key={row.product}>
//                   <TableCell>{row.product}</TableCell>
//                   {uniqueDates.map((date) => (
//                     <TableCell key={`${row.product}-${date}`}>
//                       {row.data[date] || 0}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={uniqueDates.length + 1} align="center">
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
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { axiosInstance } from 'src/api/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns'; // to format dates if needed
import Iconify from 'src/components/iconify';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';

export default function ShipmentHistoryTab() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [data, setData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isExporting, setIsExporting] = useState(false);


  useEffect(() => {
    fetchData();
  }, [rowsPerPage, page]);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');

      const params = new URLSearchParams();
      params.append('page_size', rowsPerPage);
      params.append('page', page + 1);

      if (filterName) {
        params.append('article', filterName);
      }
      if (startDate) {
        params.append('date_from', startDate.toISOString().split('T')[0]);
      }
      if (endDate) {
        params.append('date_to', endDate.toISOString().split('T')[0]);
      }

      const response = await axiosInstance.get(
        `companies/${idCompany}/shipment-history/?${params.toString()}`,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const uniqueDates = data.length > 0
    ? Array.from(new Set(data.flatMap(row => Object.keys(row.data)))).sort((a, b) => new Date(b) - new Date(a))
    : [];

  const handleExcelExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Shipment History');

    worksheet.addRow(['Артикул', ...uniqueDates]);

    data.forEach((row) => {
      const rowData = [row.product];
      uniqueDates.forEach((date) => {
        rowData.push(row.data[date] || 0);
      });
      worksheet.addRow(rowData);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `ShipmentHistory_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  const onSearch = () => {
    setPage(0);
    setLoading(true);
    fetchData();
  };

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };
  
  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };
  
  const onFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };
  

  return (
    <Card>
      <div className='p-5 flex justify-between'>
        <OutlinedInput
          value={filterName}
          onChange={onFilterNameChange}
          placeholder="Поиск по артикулу"
          startAdornment={
            <InputAdornment position="start" sx={{ mb: 0, px: 1 }}>
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />

        <div style={{ display: 'flex', gap: '8px' }} className="border rounded-lg p-3.5">
          <input
            type="date"
            value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
            onChange={handleStartDateChange}
          />
          <span>—</span>
          <input
            type="date"
            value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
            onChange={handleEndDateChange}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={onSearch}
          sx={{ padding: '15px 36px', fontSize: '15px' }}
        >
          Поиск
        </Button>
        {/* <Button variant="contained" color="primary" onClick={handleExcelExport}>
          Export to Excel
        </Button> */}

        <Button
            variant="contained"
            color="inherit"
            startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
            onClick={handleExcelExport}
            disabled={isExporting}
            sx={{ padding: '15px 26px' }}
          >
            {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
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
