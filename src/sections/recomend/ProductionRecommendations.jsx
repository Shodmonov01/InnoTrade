// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// // import { axiosInstance } from 'src/api/api';

// // export default function ProductionRecommendations() {
// //   const [data, setData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true); // Для отслеживания состояния загрузки

// //   const fetchData = async () => {
// //     setIsLoading(true); // Начало загрузки
// //     try {
// //       const token = JSON.parse(localStorage.getItem('token')).access;
// //       const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage

// //       const url = `/companies/${idCompany}/recomend/`;
// //       const response = await axiosInstance.get(url, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
      
// //       setData(response.data.results); // Установка данных в состояние
// //     } catch (error) {
// //       console.error("Ошибка при загрузке данных:", error);
// //     } finally {
// //       setIsLoading(false); // Завершение загрузки
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData(); // Вызов функции загрузки данных при монтировании компонента
// //   }, []);

// //   if (isLoading) {
// //     return <div>Загрузка...</div>; // Можно добавить индикатор загрузки
// //   }

// //   return (
// //     <TableContainer>
// //       <Table>
// //         <TableHead>
// //           <TableRow>
// //             {/* <TableCell>Артикул</TableCell> */}
// //             <TableCell>Продукт</TableCell>
// //             <TableCell>Количество</TableCell>
// //             <TableCell>Осталось дней</TableCell>
// //             <TableCell>Заявка на производство</TableCell>
// //           </TableRow>
// //         </TableHead>
// //         <TableBody>
// //           {data.map((row) => (
// //             <TableRow key={row.id}>
// //               {/* <TableCell>{row.id}</TableCell> */}
// //               <TableCell>{row.product}</TableCell>
// //               <TableCell>{row.quantity}</TableCell>
// //               <TableCell>{row.days_left}</TableCell>
// //               <TableCell>{row.application_for_production}</TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </TableContainer>
// //   );
// // }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Grid } from '@mui/material';
// // import * as XLSX from 'xlsx';
// import UserTableToolbar from './user-table-toolbar';
// import { axiosInstance } from 'src/api/api';

// export default function ProductionRecommendations() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filterName, setFilterName] = useState(''); // Для фильтрации данных
//   const [selected, setSelected] = useState([]); // Для подсчета выбранных

//   const fetchData = async () => {
//     setIsLoading(true);
//     try {
//       const token = JSON.parse(localStorage.getItem('token')).access;
//       const idCompany = localStorage.getItem('selectedCompany'); 

//       const url = `/companies/${idCompany}/recomend/`;
//       const response = await axiosInstance.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       setData(response.data.results);
//     } catch (error) {
//       console.error("Ошибка при загрузке данных:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleFilterByName = (event) => {
//     setFilterName(event.target.value); // Обновление фильтра
//   };

//   // const exportToExcel = () => {
//   //   const worksheet = XLSX.utils.json_to_sheet(data);
//   //   const workbook = XLSX.utils.book_new();
//   //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Рекомендации');
//   //   XLSX.writeFile(workbook, 'recommendations.xlsx');
//   // };

//   if (isLoading) {
//     return <div>Загрузка...</div>;
//   }

//   return (
//     <div>
//       <div className='flex items-center'>
//       <UserTableToolbar
//         numSelected={selected.length}
//         filterName={filterName}
//         onFilterName={handleFilterByName}
//       />

     
        
//           <Button variant="contained" color="primary" onClick={() => console.log("Подсчет")}>
//             Подсчет
//           </Button>
        
        
//           <Button variant="contained" color="secondary" onClick={() => console.log("Настройки")}>
//             Настройки
//           </Button>
        
       
//           {/* <Button variant="contained" color="default" onClick={exportToExcel}>
//             Экспорт в Excel
//           </Button> */}
        
      
//       </div>

//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Артикул</TableCell>
//               <TableCell>Продукт</TableCell>
//               <TableCell>Количество</TableCell>
//               <TableCell>Осталось дней</TableCell>
//               <TableCell>Заявка на производство</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data
//               .filter(row => row.product.toLowerCase().includes(filterName.toLowerCase())) // Фильтрация по названию продукта
//               .map((row) => (
//                 <TableRow key={row.id}>
//                   <TableCell>{row.id}</TableCell>
//                   <TableCell>{row.product}</TableCell>
//                   <TableCell>{row.quantity}</TableCell>
//                   <TableCell>{row.days_left}</TableCell>
//                   <TableCell>{row.application_for_production}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import UserTableToolbar from './user-table-toolbar';
import { axiosInstance } from 'src/api/api';

export default function ProductionRecommendations() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [selected, setSelected] = useState([]);
  const [productionValues, setProductionValues] = useState({}); // Для хранения измененных значений

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany'); 

      const url = `/companies/${idCompany}/recomend/`;
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setData(response.data.results);
      // Инициализация значений для каждого recommendation
      const initialProductionValues = response.data.results.reduce((acc, row) => {
        acc[row.id] = row.application_for_production || ''; // Если нет значения, то пустая строка
        return acc;
      }, {});
      setProductionValues(initialProductionValues);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleProductionValueChange = (id, value) => {
    setProductionValues({
      ...productionValues,
      [id]: value, // Обновляем значение для конкретного id
    });
  };

  const handleSubmitProduction = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `/companies/${idCompany}/prodcution/`;

      await axiosInstance.post(
        url,
        {
          recommendations_id: id,
          application_for_production: productionValues[id], // Значение для данного recommendation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Успешно отправлено на производство:", id);
    } catch (error) {
      console.error("Ошибка при отправке данных на производство:", error);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
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
              <TableCell>Продукт</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Осталось дней</TableCell>
              <TableCell>Заявка на производство</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter(row => row.product.toLowerCase().includes(filterName.toLowerCase()))
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.days_left}</TableCell>
                  <TableCell>
                    <input
                      type="number"
                      value={productionValues[row.id]} // Значение берется из состояния
                      onChange={(e) => handleProductionValueChange(row.id, e.target.value)} // Обновляем значение при изменении
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleSubmitProduction(row.id)} // Отправляем данные на сервер
                    >
                      В работу
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
