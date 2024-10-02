// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { axiosInstance } from 'src/api/api';

// export default function ShippingPriority() {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch data from the API
//   const fetchData = async () => {
//     setIsLoading(true);
//     setError(null); // Сбрасываем ошибку перед новым запросом
//     try {
//       const token = JSON.parse(localStorage.getItem('token'))?.access;
//       const idCompany = localStorage.getItem('selectedCompany');

//       // Проверим, что и token, и idCompany существуют
//       if (!token) {
//         throw new Error('Токен не найден. Авторизация не выполнена.');
//       }
//       if (!idCompany) {
//         throw new Error('Компания не выбрана.');
//       }

//       const url = `/companies/${idCompany}/priority/`;

//       const response = await axiosInstance.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setData(response.data.results);
//     } catch (error) {
//       setError(error.message || 'Произошла ошибка при запросе данных.');
//       console.error('Ошибка при получении данных:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (isLoading) return <p>Загрузка...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Регион</TableCell>
//             <TableCell>Время в пути (дн)</TableCell>
//             <TableCell>Поступит через (дн)</TableCell>
//             <TableCell>Продажи (шт)</TableCell>
//             <TableCell>Доля продаж (%)</TableCell>
//             <TableCell>Доля отгрузки (%)</TableCell>
//             <TableCell>Приоритет отгрузки</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.region_name}</TableCell>
//               <TableCell>{row.travel_days}</TableCell>
//               <TableCell>{row.arrive_days}</TableCell>
//               <TableCell>{row.sales}</TableCell>
//               <TableCell>{(row.sales_share * 100).toFixed(2)}%</TableCell>
//               <TableCell>{(row.shipments_share * 100).toFixed(2)}%</TableCell>
//               <TableCell>{row.shipping_priority.toFixed(2)}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { axiosInstance } from 'src/api/api';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { PiMicrosoftExcelLogo } from 'react-icons/pi'; // Предполагаю, что иконка из этого пакета

export default function ShippingPriority() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Fetch data from the API
  const fetchData = async () => {
    setIsLoading(true);
    setError(null); // Сбрасываем ошибку перед новым запросом
    try {
      const token = JSON.parse(localStorage.getItem('token'))?.access;
      const idCompany = localStorage.getItem('selectedCompany');

      // Проверим, что и token, и idCompany существуют
      if (!token) {
        throw new Error('Токен не найден. Авторизация не выполнена.');
      }
      if (!idCompany) {
        throw new Error('Компания не выбрана.');
      }

      const url = `/companies/${idCompany}/priority/`;

      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.results);
    } catch (error) {
      setError(error.message || 'Произошла ошибка при запросе данных.');
      console.error('Ошибка при получении данных:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Функция для экспорта в Excel
  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Приоритет отгрузки');

      // Добавляем заголовки
      worksheet.columns = [
        { header: 'Регион', key: 'region_name', width: 20 },
        { header: 'Время в пути (дн)', key: 'travel_days', width: 15 },
        { header: 'Поступит через (дн)', key: 'arrive_days', width: 20 },
        { header: 'Продажи (шт)', key: 'sales', width: 15 },
        { header: 'Доля продаж (%)', key: 'sales_share', width: 20 },
        { header: 'Доля отгрузки (%)', key: 'shipments_share', width: 20 },
        { header: 'Приоритет отгрузки', key: 'shipping_priority', width: 20 }
      ];

      // Добавляем данные
      data.forEach(row => {
        worksheet.addRow({
          region_name: row.region_name,
          travel_days: row.travel_days,
          arrive_days: row.arrive_days,
          sales: row.sales,
          sales_share: (row.sales_share * 100).toFixed(2) + '%',
          shipments_share: (row.shipments_share * 100).toFixed(2) + '%',
          shipping_priority: row.shipping_priority.toFixed(2),
        });
      });

      // Стилизация заголовков
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      // Генерация файла и его скачивание
      const buffer = await workbook.xlsx.writeBuffer();
      const fileName = `Приоритет_отгрузки_${format(new Date(), 'dd-MM-yyyy')}.xlsx`;
      saveAs(new Blob([buffer]), fileName);

    } catch (error) {
      console.error('Ошибка при экспорте в Excel:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
<div className='m-3'>
<Button
        variant="contained"
        color="inherit"
        startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
        onClick={handleExportToExcel}
        disabled={isExporting}
      >
        {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
      </Button>
</div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Регион</TableCell>
              <TableCell>Время в пути (дн)</TableCell>
              <TableCell>Поступит через (дн)</TableCell>
              <TableCell>Продажи (шт)</TableCell>
              <TableCell>Доля продаж (%)</TableCell>
              <TableCell>Доля отгрузки (%)</TableCell>
              <TableCell>Приоритет отгрузки</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.region_name}</TableCell>
                <TableCell>{row.travel_days}</TableCell>
                <TableCell>{row.arrive_days}</TableCell>
                <TableCell>{row.sales}</TableCell>
                <TableCell>{(row.sales_share * 100).toFixed(2)}%</TableCell>
                <TableCell>{(row.shipments_share * 100).toFixed(2)}%</TableCell>
                <TableCell>{row.shipping_priority.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
