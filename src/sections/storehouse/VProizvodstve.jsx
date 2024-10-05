// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   TextField,
//   Typography,
//   Paper,
// } from '@mui/material';
// import { axiosInstance } from 'src/api/api';
// import UserTableVP from './user-table-vp';
// import { BsCheck2 } from 'react-icons/bs';

// const VProizvodstve = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [productionValues, setProductionValues] = useState({});
//   const [filterName, setFilterName] = useState('');
//   const [numSelected, setNumSelected] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');

//         const response = await axiosInstance.get(`companies/${idCompany}/prodcution/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data.results);

//         // Initialize production values for each product
//         const initialProductionValues = response.data.results.reduce((acc, row) => {
//           acc[row.id] = row.produced || ''; // Default to empty string
//           return acc;
//         }, {});
//         setProductionValues(initialProductionValues);

//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleProductionValueChange = (id, value) => {
//     setProductionValues({
//       ...productionValues,
//       [id]: value, // Store the input value
//     });
//   };

//   const handleSubmitProduced = async (id) => {
//     try {
//       const token = JSON.parse(localStorage.getItem('token')).access;
//       const idCompany = localStorage.getItem('selectedCompany');
//       const url = `companies/${id}/update-prodcution/`;

//       // Get the production value, fallback to product value if empty
//       const productionValue =
//         productionValues[id] !== '' ? productionValues[id] : data.find((row) => row.id === id)?.manufacture;

//       await axiosInstance.patch(
//         url,
//         {
//           produced: Number(productionValue), // Send as number
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('Успешно обновлено количество для производства:', id);
//     } catch (error) {
//       console.error('Ошибка при обновлении количества для производства:', error);
//     }
//   };

//   const handleSubmitAllProduction = async () => {
//     try {
//       const token = JSON.parse(localStorage.getItem('token')).access;
//       const idCompany = localStorage.getItem('selectedCompany');
  
//       const filteredProductionValues = Object.keys(productionValues)
//         .filter((id) => productionValues[id] && productionValues[id] > 0)
//         .map((id) => ({
//           id, // Идентификатор продукта
//           value: productionValues[id] || data.find((row) => row.id === id)?.manufacture,
//         }));
  
//       if (filteredProductionValues.length === 0) {
//         console.log('Нет данных для отправки');
//         return;
//       }
  
//       const requests = filteredProductionValues.map(({ id, value }) => {
//         const url = `companies/${id}/update-prodcution/`; // Здесь нужно добавить id продукта
  
//         return axiosInstance.patch(
//           url,
//           {
//             produced: Number(value), // Отправляем значение как число
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       });
  
//       await Promise.all(requests);
  
//       console.log('Успешно отправлены данные для выбранных значений');
//       setProductionValues({});
//     } catch (error) {
//       console.error('Ошибка при отправке данных:', error);
//     }
//   };
  

//   const handleSearch = (event) => {
//     setFilterName(event.target.value);
//   };

//   const filteredData = data.filter((item) =>
//     item.product.toLowerCase().includes(filterName.toLowerCase())
//   );

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography>Error: {error}</Typography>;

//   return (
//     <div>
//       <UserTableVP
//         numSelected={numSelected}
//         filterName={filterName}
//         onFilterName={handleSearch}
//         onSubmitAllProduction={handleSubmitAllProduction}
//       />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Продукт</TableCell>
//               <TableCell>Нужно произвести</TableCell>
//               <TableCell>Произведено</TableCell>
//               <TableCell>Действия</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.product}</TableCell>
//                 <TableCell>{row.manufacture}</TableCell>
//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={productionValues[row.id] !== undefined ? productionValues[row.id] : ''}
//                     onChange={(e) => handleProductionValueChange(row.id, e.target.value)}
//                     placeholder={row.manufacture}
//                     variant="outlined"
//                     fullWidth
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleSubmitProduced(row.id)}
//                   >
//                     <BsCheck2 />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default VProizvodstve;


// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   TextField,
//   Typography,
//   Paper,
// } from '@mui/material';
// import { axiosInstance } from 'src/api/api';
// import UserTableVP from './user-table-vp';
// import { BsCheck2, BsCheck2All } from 'react-icons/bs';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import { format } from 'date-fns';

// const VProizvodstve = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [productionValues, setProductionValues] = useState({});
//   const [filterName, setFilterName] = useState('');
//   const [sortDirection, setSortDirection] = useState('asc'); // Add state for sorting
//   const [sort, setSort] = useState('');

// const handleSortChange = (value) => {
//   setSort(value); // Устанавливаем новое значение сортировки
// };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');

//         const response = await axiosInstance.get(`companies/${idCompany}/prodcution/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data.results);

//         const initialProductionValues = response.data.results.reduce((acc, row) => {
//           acc[row.id] = row.produced || ''; // Default to empty string
//           return acc;
//         }, {});
//         setProductionValues(initialProductionValues);

//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleProductionValueChange = (id, value) => {
//     setProductionValues({
//       ...productionValues,
//       [id]: value, // Store the input value
//     });
//   };

//   const handleSubmitProduced = async (id) => {
//     try {
//       const token = JSON.parse(localStorage.getItem('token')).access;
//       const idCompany = localStorage.getItem('selectedCompany');
//       const url = `companies/${id}/update-prodcution/`;

//       const productionValue =
//         productionValues[id] !== '' ? productionValues[id] : data.find((row) => row.id === id)?.manufacture;

//       await axiosInstance.patch(
//         url,
//         {
//           produced: Number(productionValue),
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('Успешно обновлено количество для производства:', id);
//     } catch (error) {
//       console.error('Ошибка при обновлении количества для производства:', error);
//     }
//   };

//   const handleSubmitAllProduction = async () => {
//     try {
//       const token = JSON.parse(localStorage.getItem('token')).access;
//       const idCompany = localStorage.getItem('selectedCompany');

//       const filteredProductionValues = Object.keys(productionValues)
//         .filter((id) => productionValues[id] && productionValues[id] > 0)
//         .map((id) => ({
//           id,
//           value: productionValues[id] || data.find((row) => row.id === id)?.manufacture,
//         }));

//       if (filteredProductionValues.length === 0) {
//         console.log('Нет данных для отправки');
//         return;
//       }

//       const requests = filteredProductionValues.map(({ id, value }) => {
//         const url = `companies/${id}/update-prodcution/`;

//         return axiosInstance.patch(
//           url,
//           {
//             produced: Number(value),
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       });

//       await Promise.all(requests);

//       console.log('Успешно отправлены данные для выбранных значений');
//       setProductionValues({});
//     } catch (error) {
//       console.error('Ошибка при отправке данных:', error);
//     }
//   };

//   // Sorting function
//   const handleSort = () => {
//     const sortedData = [...data].sort((a, b) => {
//       const comparison = a.product.localeCompare(b.product);
//       return sortDirection === 'asc' ? comparison : -comparison;
//     });
//     setData(sortedData);
//     setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc')); // Toggle sort direction
//   };

//   const handleSearch = (event) => {
//     setFilterName(event.target.value);
//   };

//   const filteredData = data.filter((item) =>
//     item.product.toLowerCase().includes(filterName.toLowerCase())
//   );

//   // Excel export functionality
//   const exportToExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Production Data');

//     worksheet.columns = [
//       { header: 'Продукт', key: 'product', width: 30 },
//       { header: 'Нужно произвести', key: 'manufacture', width: 20 },
//       { header: 'Произведено', key: 'produced', width: 20 },
//     ];

//     filteredData.forEach((row) => {
//       worksheet.addRow({
//         product: row.product,
//         manufacture: row.manufacture,
//         produced: productionValues[row.id] !== undefined ? productionValues[row.id] : row.manufacture,
//       });
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], { type: 'application/octet-stream' });
//     saveAs(blob, 'production_data.xlsx');
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');
        
//         let url = `companies/${idCompany}/production/?`;
    
//         if (sort) {
//           url += `&sort=${sort}`;
//         }
    
//         const response = await axiosInstance.get(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
    
//         setData(response.data.results);
    
//         // Инициализация значений для производства
//         const initialProductionValues = response.data.results.reduce((acc, row) => {
//           acc[row.id] = row.produced || '';
//           return acc;
//         }, {});
//         setProductionValues(initialProductionValues);
    
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
    

//     useEffect(() => {
//       fetchData();
//     }, [sort]); // Зависимость от сортировки
    
//   // const handleSortChange = (field, direction) => {
//   //   setSortField(field);
//   //   setSortDirection(direction);
//   // };

//   const handleExportToExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Продукция');
  
//     worksheet.columns = [
//       { header: 'Продукт', key: 'product', width: 30 },
//       { header: 'Нужно произвести', key: 'manufacture', width: 20 },
//       { header: 'Произведено', key: 'produced', width: 20 },
//     ];
  
//     data.forEach((item) => {
//       worksheet.addRow({
//         product: item.product,
//         manufacture: item.manufacture,
//         produced: productionValues[item.id] || item.manufacture,
//       });
//     });
  
//     const buffer = await workbook.xlsx.writeBuffer();
//     const fileName = `Производство_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
//     saveAs(new Blob([buffer]), fileName);
//   };
  

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography>Error: {error}</Typography>;

//   return (
//     <div>
//       <div> <Button variant="contained" onClick={handleExportToExcel}>
//       Экспорт в Excel
//     </Button></div>
//       <UserTableVP
//         numSelected={numSelected}
//         filterName={filterName}
//         onFilterName={handleSearch}
//         onSubmitAllProduction={handleSubmitAllProduction}
//         onSortChange={handleSortChange} // Передаем функцию для сортировки
//       />
//       <Button variant="contained" color="primary" onClick={handleSort}>
//         Сортировать
//       </Button>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Продукт</TableCell>
//               <TableCell>Нужно произвести</TableCell>
//               <TableCell>Произведено</TableCell>
//               <TableCell>Действия</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.product}</TableCell>
//                 <TableCell>{row.manufacture}</TableCell>
//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={productionValues[row.id] !== undefined ? productionValues[row.id] : ''}
//                     onChange={(e) => handleProductionValueChange(row.id, e.target.value)}
//                     placeholder={row.manufacture}
//                     variant="outlined"
//                     fullWidth
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleSubmitProduced(row.id)}
//                   >
//                     <BsCheck2 />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default VProizvodstve;


import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  TablePagination,
} from '@mui/material';
import { axiosInstance } from 'src/api/api';
import UserTableVP from './user-table-vp';
import { BsCheck2 } from 'react-icons/bs';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

const VProizvodstve = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productionValues, setProductionValues] = useState({});
  const [filterName, setFilterName] = useState('');
  const [sort, setSort] = useState('');

  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1); // Сохраняем общее количество страниц
const [perPage, setPerPage] = useState(10); // Количество элементов на странице

const fetchData = async (currentPage = 1) => {
  try {
    const token = JSON.parse(localStorage.getItem('token')).access;
    const idCompany = localStorage.getItem('selectedCompany');
    let url = `companies/${idCompany}/prodcution/?page=${currentPage}&per_page=${perPage}`;

    if (sort) {
      url += `&sort=${sort}`;
    }

    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setData(response.data.results);
    setTotalPages(response.data.total_pages); // Устанавливаем общее количество страниц

    // Инициализация значений для производства
    const initialProductionValues = response.data.results.reduce((acc, row) => {
      acc[row.id] = row.produced || '';
      return acc;
    }, {});
    setProductionValues(initialProductionValues);

    setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};



// Эффект для загрузки данных с учётом пагинации
useEffect(() => {
  fetchData(page); // Передаем текущую страницу
}, [sort, page, perPage]);




  // Обработчик изменения сортировки
  const handleSortChange = (value) => {
    setSort(value); // Устанавливаем новое значение сортировки
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Обновляем текущую страницу
  };
  
  // Функция для получения данных с сервера
  // const fetchData = async () => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('token')).access;
  //     const idCompany = localStorage.getItem('selectedCompany');
  //     let url = `companies/${idCompany}/prodcution/?`;

  //     if (sort) {
  //       url += `&sort=${sort}`;
  //     }

  //     const response = await axiosInstance.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setData(response.data.results);

  //     // Инициализация значений для производства
  //     const initialProductionValues = response.data.results.reduce((acc, row) => {
  //       acc[row.id] = row.produced || '';
  //       return acc;
  //     }, {});
  //     setProductionValues(initialProductionValues);

  //     setLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //     setLoading(false);
  //   }
  // };

  // Эффект для загрузки данных и сортировки
  useEffect(() => {
    fetchData();
  }, [sort]);

  // Обработка изменения значения производства
  const handleProductionValueChange = (id, value) => {
    setProductionValues({
      ...productionValues,
      [id]: value, // Сохраняем значение ввода
    });
  };

  // Отправка изменения одного продукта
  const handleSubmitProduced = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const productionValue =
        productionValues[id] !== '' ? productionValues[id] : data.find((row) => row.id === id)?.manufacture;

      await axiosInstance.patch(
        `companies/${id}/update-prodcution/`,
        {
          produced: Number(productionValue),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Успешно обновлено количество для производства:', id);
    } catch (error) {
      console.error('Ошибка при обновлении количества для производства:', error);
    }
  };

  // Отправка данных для всех изменений
  // const handleSubmitAllProduction = async () => {
  //   try {
  //     const token = JSON.parse(localStorage.getItem('token')).access;
  //     const filteredProductionValues = Object.keys(productionValues)
  //       .filter((id) => productionValues[id] && productionValues[id] > 0)
  //       .map((id) => ({
  //         id,
  //         value: productionValues[id] || data.find((row) => row.id === id)?.manufacture,
  //       }));

  //     if (filteredProductionValues.length === 0) {
  //       console.log('Нет данных для отправки');
  //       return;
  //     }

  //     const requests = filteredProductionValues.map(({ id, value }) =>
  //       axiosInstance.patch(
  //         `companies/${id}/update-prodcution/`,
  //         {
  //           produced: Number(value),
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //     );

  //     await Promise.all(requests);
  //     console.log('Успешно отправлены данные для всех значений');
  //     setProductionValues({});
  //   } catch (error) {
  //     console.error('Ошибка при отправке данных:', error);
  //   }
  // };
  
  const handleSubmitAllProduction = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      let allProductionValues = [];
  
      // Собираем данные со всех страниц
      for (let i = 1; i <= totalPages; i++) {
        const response = await axiosInstance.get(
          `companies/${idCompany}/production/?page=${i}&per_page=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const pageValues = response.data.results.map((row) => ({
          id: row.id,
          value: productionValues[row.id] || row.manufacture, // Убедитесь, что поле `manufacture` существует
        }));
  
        allProductionValues = [...allProductionValues, ...pageValues];
      }
  
      const filteredProductionValues = allProductionValues.filter(({ value }) => value > 0);
  
      if (filteredProductionValues.length === 0) {
        console.log('Нет данных для отправки');
        return;
      }
  
      const requests = filteredProductionValues.map(({ id, value }) =>
        axiosInstance.patch(
          `companies/${idCompany}/update-production/`, // Исправлен путь
          {
            produced: Number(value),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      );
  
      await Promise.all(requests);
      console.log('Успешно отправлены данные для всех значений');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };
  

  // Обработка фильтрации по имени продукта
  const handleSearch = (event) => {
    setFilterName(event.target.value);
  };

  // Фильтрация данных по введенному значению
  const filteredData = data.filter((item) =>
    item.product.toLowerCase().includes(filterName.toLowerCase())
  );

  // Экспорт данных в Excel
  const handleExportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Продукция');

    worksheet.columns = [
      { header: 'Продукт', key: 'product', width: 30 },
      { header: 'Нужно произвести', key: 'manufacture', width: 20 },
      { header: 'Произведено', key: 'produced', width: 20 },
    ];

    filteredData.forEach((row) => {
      worksheet.addRow({
        product: row.product,
        manufacture: row.manufacture,
        produced: productionValues[row.id] !== undefined ? productionValues[row.id] : row.manufacture,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, `Производство_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <div>
        <Button variant="contained" onClick={handleExportToExcel}>
          Экспорт в Excel
        </Button>
      </div>
      <UserTableVP
        filterName={filterName}
        onFilterName={handleSearch}
        onSubmitAllProduction={handleSubmitAllProduction}
        onSortChange={handleSortChange} // Передаем функцию для сортировки
      />
      <Select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value)} // Обработчик изменения сортировки
        displayEmpty
        inputProps={{ 'aria-label': 'Sort' }}
      >
        <MenuItem value="">Без сортировки</MenuItem>
        <MenuItem value="1">Больше продаж</MenuItem>
        <MenuItem value="-1">Меньше продаж</MenuItem>
        <MenuItem value="A-Z">От A до Z</MenuItem>
        <MenuItem value="Z-A">От Z до A</MenuItem>
      </Select>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell>Нужно произвести</TableCell>
              <TableCell>Произведено</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.manufacture}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={productionValues[row.id] !== undefined ? productionValues[row.id] : ''}
                    onChange={(e) => handleProductionValueChange(row.id, e.target.value)}
                    placeholder={row.manufacture}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleSubmitProduced(row.id)}>
                    <BsCheck2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
  component="div"
  count={totalPages * perPage}
  page={page - 1}
  onPageChange={handleChangePage}
  rowsPerPage={perPage}
  onRowsPerPageChange={(event) => setPerPage(parseInt(event.target.value, 10))}
  rowsPerPageOptions={[10, 12, 20]}
/>
      </TableContainer>
    </div>
  );
};

export default VProizvodstve;
