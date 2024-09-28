// // // import React, { useEffect, useState } from 'react';
// // // import { axiosInstance } from 'src/api/api';

// // // const Inventarizaciya = () => {
// // //   const [data, setData] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const token = JSON.parse(localStorage.getItem('token')).access;     const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
// // //         const response = await axiosInstance.get(`companies/${idCompany}/inventory/`, {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         });
// // //         setData(response.data);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   if (loading) return <p>Loading...</p>;
// // //   if (error) return <p>Error: {error}</p>;

// // //   return (
// // //     <div>
// // //       <h2>Инвентаризация</h2>
// // //       {/* Отображение данных */}
// // //       <pre>{JSON.stringify(data, null, 2)}</pre>
// // //     </div>
// // //   );
// // // };

// // // export default Inventarizaciya;

// // import React, { useEffect, useState } from 'react';
// // import { axiosInstance } from 'src/api/api';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableRow,
// //   TableContainer,
// //   Paper,
// //   IconButton,
// //   TextField,
// // } from '@mui/material';
// // import { AiOutlinePlus } from 'react-icons/ai';
// // import InventoryTableToolbar from './InventoryTableToolbar';

// // const Inventarizaciya = () => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [newLocations, setNewLocations] = useState({});

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem('token')).access;
// //         const idCompany = localStorage.getItem('selectedCompany');
// //         const response = await axiosInstance.get(`companies/${idCompany}/inventory/`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setData(response.data.results); // Устанавливаем только результаты
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleAddNewLocation = (id) => {
// //     // Логика добавления нового места
// //     console.log(`Добавить новое место для ID: ${id}`);
// //   };

// //   const handleNewLocationChange = (id, value) => {
// //     setNewLocations((prev) => ({ ...prev, [id]: value }));
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   console.log(data);
  

// //   return (
// //     <div>
// //       <InventoryTableToolbar
// //         // numSelected={selected.length}
// //         // filterName={filterName}
// //         // onFilterName={handleFilterName}
// //         // startDate={startDate}
// //         // endDate={endDate}
// //         // onStartDateChange={setStartDate}
// //         // onEndDateChange={setEndDate}
// //       />
// //       <TableContainer component={Paper}>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Код товара</TableCell>
// //               <TableCell>Местоположение</TableCell>
// //               <TableCell>Количество</TableCell>
// //               <TableCell>Итого</TableCell>
// //               <TableCell>Итого фактически</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {data.map((row, index) => (
// //               <TableRow key={index}>
// //                 {row.shelfs.map((shelf, shelfIndex) => (
// //                   <React.Fragment key={shelfIndex}>
// //                     <TableCell>{row.product.vendor_code}</TableCell> {/* Код товара */}
// //                     <TableCell>
// //                       {shelf.shelf_name}
// //                       <IconButton
// //                         onClick={() => handleAddNewLocation(shelf.id)}
// //                         size="small"
// //                         color="primary"
// //                       >
// //                         <AiOutlinePlus />
// //                       </IconButton>
// //                       <TextField
// //                         size="small"
// //                         value={newLocations[shelf.id] || ''}
// //                         onChange={(e) => handleNewLocationChange(shelf.id, e.target.value)}
// //                         placeholder="Новое место"
// //                       />
// //                     </TableCell>
// //                     <TableCell>{row.total}</TableCell>
// //                     <TableCell>{row.total}</TableCell>
// //                     <TableCell>{row.total_fact}</TableCell>
// //                   </React.Fragment>
// //                 ))}
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </div>
// //   );
// // };

// // export default Inventarizaciya;


// import React, { useEffect, useState } from 'react';
// import { axiosInstance } from 'src/api/api';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Paper,
//   IconButton,
//   TextField,
// } from '@mui/material';
// import { AiOutlinePlus } from 'react-icons/ai';
// import InventoryTableToolbar from './InventoryTableToolbar';

// const Inventarizaciya = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newLocations, setNewLocations] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');
//         const response = await axiosInstance.get(`companies/${idCompany}/inventory/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data.results); // Устанавливаем только результаты
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddNewLocation = (id) => {
//     // Логика добавления нового места
//     console.log(`Добавить новое место для ID: ${id}`);
//   };

//   const handleNewLocationChange = (id, value) => {
//     setNewLocations((prev) => ({ ...prev, [id]: value }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   // Группировка данных по коду товара
//   const groupedData = data.reduce((acc, row) => {
//     const vendorCode = row.product.vendor_code;
//     if (!acc[vendorCode]) {
//       acc[vendorCode] = {
//         product: row.product,
//         shelfs: [],
//         total: row.total,
//         total_fact: row.total_fact,
//       };
//     }
//     acc[vendorCode].shelfs.push(...row.shelfs);
//     return acc;
//   }, {});

//   return (
//     <div>
//       <InventoryTableToolbar />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Код товара</TableCell>
//               <TableCell>Местоположение</TableCell>
//               <TableCell>Количество</TableCell>
//               <TableCell>Итого</TableCell>
//               <TableCell>Итого фактически</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Object.values(groupedData).map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell>{item.product.vendor_code}</TableCell>
//                 <TableCell>
//                   {item.shelfs.map((shelf, shelfIndex) => (
//                     <div key={shelfIndex}>
//                       {shelf.shelf_name} (Stock: {shelf.stock})
//                       <IconButton
//                         onClick={() => handleAddNewLocation(shelf.id)}
//                         size="small"
//                         color="primary"
//                       >
//                         <AiOutlinePlus />
//                       </IconButton>
//                       <TextField
//                         size="small"
//                         value={newLocations[shelf.id] || ''}
//                         onChange={(e) => handleNewLocationChange(shelf.id, e.target.value)}
//                         placeholder="Новое место"
//                       />
//                     </div>
//                   ))}
//                 </TableCell>
//                 <TableCell>{item.total}</TableCell>
//                 <TableCell>{item.total}</TableCell>
//                 <TableCell>{item.total_fact}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Inventarizaciya;


// import React, { useEffect, useState } from 'react';
// import { axiosInstance } from 'src/api/api';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableContainer,
//   Paper,
//   IconButton,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import { AiOutlinePlus } from 'react-icons/ai';
// import InventoryTableToolbar from './InventoryTableToolbar';

// const Inventarizaciya = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newLocations, setNewLocations] = useState({});
//   const [selectedShelf, setSelectedShelf] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const idCompany = localStorage.getItem('selectedCompany');
//         const response = await axiosInstance.get(`companies/${idCompany}/inventory/`, {
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
//   }, []);

//   const handleAddNewLocation = (productId, shelfId) => {
//     // Логика добавления нового места
//     console.log(`Добавить новое место для ID продукта: ${productId}, полка: ${shelfId}`);
//   };

//   const handleNewLocationChange = (id, value) => {
//     setNewLocations((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleShelfChange = (productId, shelfId) => {
//     setSelectedShelf((prev) => ({ ...prev, [productId]: shelfId }));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   // Группируем данные по продуктам и полкам
//   const groupedData = data.reduce((acc, row) => {
//     const productCode = row.product.vendor_code;
//     if (!acc[productCode]) {
//       acc[productCode] = {
//         shelfs: [],
//         total: row.total,
//         total_fact: row.total_fact,
//       };
//     }
//     acc[productCode].shelfs.push(...row.shelfs);
//     return acc;
//   }, {});

//   return (
//     <div>
//       <InventoryTableToolbar />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Код товара</TableCell>
//               <TableCell>Местоположение</TableCell>
//               <TableCell>Количество</TableCell>
//               <TableCell>Итого</TableCell>
//               <TableCell>Итого фактически</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Object.entries(groupedData).map(([productCode, productDetails]) => {
//               const uniqueShelves = Array.from(new Set(productDetails.shelfs.map(shelf => shelf.shelf_name)));

//               return (
//                 <TableRow key={productCode}>
//                   <TableCell>{productCode}</TableCell>
//                   <TableCell>
//                     <FormControl size="small" variant="outlined">
//                       <InputLabel>Выберите полку</InputLabel>
//                       <Select
//                         value={selectedShelf[productCode] || ''}
//                         onChange={(e) => handleShelfChange(productCode, e.target.value)}
//                       >
//                         {uniqueShelves.map((shelfName, index) => (
//                           <MenuItem key={index} value={shelfName}>{shelfName}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                     <IconButton
//                       onClick={() => handleAddNewLocation(productCode, selectedShelf[productCode])}
//                       size="small"
//                       color="primary"
//                     >
//                       <AiOutlinePlus />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>{productDetails.total}</TableCell>
//                   <TableCell>{productDetails.total}</TableCell>
//                   <TableCell>{productDetails.total_fact}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Inventarizaciya;


import React, { useEffect, useState } from 'react';
import { axiosInstance } from 'src/api/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';
import InventoryTableToolbar from './InventoryTableToolbar';

const Inventarizaciya = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLocations, setNewLocations] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');
        const response = await axiosInstance.get(`companies/${idCompany}/inventory/`, {
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
  }, []);

  const handleAddNewLocation = (id) => {
    // Логика добавления нового места
    console.log(`Добавить новое место для ID: ${id}`);
  };

  const handleNewLocationChange = (id, value) => {
    setNewLocations((prev) => ({ ...prev, [id]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <InventoryTableToolbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Код товара</TableCell>
              <TableCell>Местоположение</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Итого</TableCell>
              <TableCell>Итого фактически</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.product.vendor_code}</TableCell>
                <TableCell>
                  {row.shelfs.map((shelf, shelfIndex) => (
                    <Chip
                      key={shelfIndex}
                      label={shelf.shelf_name}
                      // onDelete={() => handleAddNewLocation(shelf.id)}
                      style={{ margin: '4px' }} // Добавляем отступ для красоты
                    />
                  ))}
                </TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.total_fact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Inventarizaciya;
