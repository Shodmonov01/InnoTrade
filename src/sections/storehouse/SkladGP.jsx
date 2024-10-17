// // import React, { useEffect, useState } from 'react';
// // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip, Tooltip, TextField, Button } from '@mui/material';
// // import { format, subDays } from 'date-fns';
// // import { axiosInstance } from 'src/api/api';
// // import UserTableGp from './user-table-gp';
// // import ExcelJS from 'exceljs';
// // import { saveAs } from 'file-saver';

// // const SkladGP = () => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [filterName, setFilterName] = useState('');
// //   const [startDate, setStartDate] = useState('');
// //   const [endDate, setEndDate] = useState('');

// //   // Формируем последние 6 дат
// //   const getLastDates = () => {
// //     const dates = [];
// //     for (let i = 0; i < 6; i++) {
// //       dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
// //     }
// //     return dates;
// //   };

// //   const lastDates = getLastDates();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem('token')).access;
// //         const idCompany = localStorage.getItem('selectedCompany');
        
// //         // Формируем URL для запроса
// //         let url = `/companies/${idCompany}/finished-products/?`;

// //         // Добавляем параметры фильтрации
// //         if (startDate && endDate) {
// //           const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
// //           const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
// //           url += `&date_from=${formattedStartDate}&date_to=${formattedEndDate}`;
// //         }
// //         if (filterName) {
// //           url += `&article=${filterName}`;
// //         }

// //         const response = await axiosInstance.get(url, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setData(response.data.results);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [filterName, startDate, endDate]);

// //   // Группировка данных по продуктам
// //   const groupedData = data.reduce((acc, productItem) => {
// //     const productName = productItem.product;
// //     Object.entries(productItem.data).forEach(([shelfName, dateData]) => {
// //       if (!acc[productName]) {
// //         acc[productName] = {
// //           shelves: [],
// //           dates: {},
// //         };
// //       }
// //       acc[productName].shelves.push(shelfName);
// //       acc[productName].dates = { ...acc[productName].dates, ...dateData };
// //     });
// //     return acc;
// //   }, {});

// //   const handleSearch = (event) => {
// //     setFilterName(event.target.value);
// //   };

// //   // Реализация экспорта в Excel
// //   const handleExportExcel = async () => {
// //     const workbook = new ExcelJS.Workbook();
// //     const worksheet = workbook.addWorksheet('Finished Products');

// //     // Добавляем заголовки
// //     worksheet.addRow(['Продукт', 'Полки', ...lastDates]);

// //     // Добавляем данные
// //     Object.entries(groupedData).forEach(([productName, productDetails]) => {
// //       const row = [productName, productDetails.shelves.join(', ')];
// //       lastDates.forEach((date) => {
// //         row.push(productDetails.dates[date] !== undefined ? productDetails.dates[date] : '-');
// //       });
// //       worksheet.addRow(row);
// //     });

// //     // Генерируем файл и скачиваем его
// //     const buffer = await workbook.xlsx.writeBuffer();
// //     saveAs(new Blob([buffer]), `SkladGP_${new Date().toISOString()}.xlsx`);
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   return (
// //     <div>
// //       <div className='flex justify-between items-center'>
// //         <UserTableGp
// //           filterName={filterName}
// //           onFilterName={handleSearch}
// //           onExportExcel={handleExportExcel} // Передаем функцию экспорта
// //         />
// //         <div className='flex gap-5'>
// //           <TextField
// //             type="date"
// //             label="Дата начала"
// //             value={startDate}
// //             onChange={(e) => setStartDate(e.target.value)}
// //             InputLabelProps={{ shrink: true }}
// //           />
// //           <TextField
// //             type="date"
// //             label="Дата конца"
// //             value={endDate}
// //             onChange={(e) => setEndDate(e.target.value)}
// //             InputLabelProps={{ shrink: true }}
// //           />
// //           <Button variant="contained" color="primary" onClick={() => { setStartDate(''); setEndDate(''); }}>
// //             Сбросить даты
// //           </Button>
// //         </div>
// //       </div>
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Продукт</TableCell>
// //               <TableCell>Полки</TableCell>
// //               {lastDates.map((date) => (
// //                 <TableCell key={date}>{date}</TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {Object.entries(groupedData).map(([productName, productDetails]) => (
// //               <TableRow key={productName}>
// //                 <TableCell>{productName}</TableCell>
// //                 <TableCell>
// //                   {productDetails.shelves.map((shelf, index) => (
// //                     <Tooltip title={shelf} key={index}>
// //                       <Chip label={shelf} variant="outlined" style={{ marginRight: 4, marginTop: 8 }} />
// //                     </Tooltip>
// //                   ))}
// //                 </TableCell>
// //                 {lastDates.map((date) => (
// //                   <TableCell key={date}>
// //                     {productDetails.dates[date] !== undefined ? productDetails.dates[date] : '-'}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </div>
// //   );
// // };

// // export default SkladGP;



// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from '@mui/material';
// import { format, subDays } from 'date-fns';
// import { axiosInstance } from 'src/api/api';
// import UserTableGp from './user-table-gp';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';

// const SkladGP = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterName, setFilterName] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   // Формируем последние 6 дат
//   const getLastDates = () => {
//     const dates = [];
//     for (let i = 0; i < 6; i++) {
//       dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
//     }
//     return dates;
//   };

//   const lastDates = getLastDates();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');
        
//         // Формируем URL для запроса
//         let url = `/companies/${idCompany}/finished-products/?`;

//         // Добавляем параметры фильтрации
//         if (startDate && endDate) {
//           const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
//           const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
//           url += `&date_from=${formattedStartDate}&date_to=${formattedEndDate}`;
//         }
//         if (filterName) {
//           url += `&article=${filterName}`;
//         }

//         const response = await axiosInstance.get(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data.results);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filterName, startDate, endDate]);

//   const handleSearch = (event) => {
//     setFilterName(event.target.value);
//   };

//   // Реализация экспорта в Excel
//   const handleExportExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Finished Products');

//     // Добавляем заголовки
//     worksheet.addRow(['Продукт', 'Полки', ...lastDates]);

//     // Добавляем данные
//     data.forEach((productItem) => {
//       Object.entries(productItem.data).forEach(([shelfName, dateData]) => {
//         const row = [productItem.product, shelfName];
//         lastDates.forEach((date) => {
//           row.push(dateData[date] !== undefined ? dateData[date] : '-');
//         });
//         worksheet.addRow(row);
//       });
//     });

//     // Генерируем файл и скачиваем его
//     const buffer = await workbook.xlsx.writeBuffer();
//     saveAs(new Blob([buffer]), `SkladGP_${new Date().toISOString()}.xlsx`);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <div className='flex justify-between items-center'>
//         <UserTableGp
//           filterName={filterName}
//           onFilterName={handleSearch}
//           onExportExcel={handleExportExcel} // Передаем функцию экспорта
//         />
//         <div className='flex gap-5'>
//           <TextField
//             type="date"
//             label="Дата начала"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             type="date"
//             label="Дата конца"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//           />
//           <Button variant="contained" color="primary" onClick={() => { setStartDate(''); setEndDate(''); }}>
//             Сбросить даты
//           </Button>
//         </div>
//       </div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Продукт</TableCell>
//               <TableCell>Полка</TableCell>
//               {lastDates.map((date) => (
//                 <TableCell key={date}>{date}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((productItem) => (
//               Object.entries(productItem.data).map(([shelfName, dateData]) => (
//                 <TableRow key={`${productItem.product}-${shelfName}`}>
//                   <TableCell>{productItem.product}</TableCell>
//                   <TableCell>{shelfName}</TableCell>
//                   {lastDates.map((date) => (
//                     <TableCell key={date}>
//                       {dateData[date] !== undefined ? dateData[date] : '-'}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default SkladGP;


import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Chip, Tooltip } from '@mui/material';
import { format, subDays } from 'date-fns';
import { axiosInstance } from 'src/api/api';
import UserTableGp from './user-table-gp';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const SkladGP = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Формируем последние 6 дат
  const getLastDates = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      dates.push(format(subDays(new Date(), i), 'yyyy-MM-dd'));
    }
    return dates;
  };

  const lastDates = getLastDates();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');
        
        // Формируем URL для запроса
        let url = `/companies/${idCompany}/finished-products/?`;

        // Добавляем параметры фильтрации
        if (startDate && endDate) {
          const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd');
          const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd');
          url += `&date_from=${formattedStartDate}&date_to=${formattedEndDate}`;
        }
        if (filterName) {
          url += `&article=${filterName}`;
        }

        const response = await axiosInstance.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [filterName, startDate, endDate]);

  const handleSearch = (event) => {
    setFilterName(event.target.value);
  };

  // Реализация экспорта в Excel
  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Finished Products');

    // Добавляем заголовки
    worksheet.addRow(['Продукт', 'Полки', ...lastDates]);

    // Добавляем данные
    data.forEach((productItem) => {
      Object.entries(productItem.data).forEach(([shelfName, dateData]) => {
        const row = [productItem.product, shelfName];
        lastDates.forEach((date) => {
          row.push(dateData[date] !== undefined ? dateData[date] : '-');
        });
        worksheet.addRow(row);
      });
    });

    // Генерируем файл и скачиваем его
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `SkladGP_${new Date().toISOString()}.xlsx`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className='flex justify-between items-center'>
        <UserTableGp
          filterName={filterName}
          onFilterName={handleSearch}
          onExportExcel={handleExportExcel} // Передаем функцию экспорта
        />
        <div className='flex gap-5'>
          <TextField
            type="date"
            label="Дата начала"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            label="Дата конца"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" onClick={() => { setStartDate(''); setEndDate(''); }}>
            Сбросить даты
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell>Полка</TableCell>
              {lastDates.map((date) => (
                 <TableCell key={date}>{date}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((productItem) => {
              const shelfEntries = Object.entries(productItem.data);
              const rowSpan = shelfEntries.length; // количество строк для объединения

              return shelfEntries.map(([shelfName, dateData], index) => (
                <TableRow key={`${productItem.product}-${shelfName}`}>
                  {index === 0 && (
                    <TableCell rowSpan={rowSpan} style={{ verticalAlign: 'top' }}>
                      {productItem.product}
                    </TableCell>
                  )}
                  <TableCell>

                  <Tooltip title={shelfName} key={index}>
                      <Chip label={shelfName} variant="outlined" style={{ marginRight: 4, marginTop: 0 }} />
                    </Tooltip>
                  </TableCell>
                  {lastDates.map((date) => (
                    <TableCell key={date}>
                      {dateData[date] !== undefined ? dateData[date] : '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SkladGP;
