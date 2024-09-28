// // import React, { useEffect, useState } from 'react';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Button,
// // } from '@mui/material';
// // import { axiosInstance } from 'src/api/api';
// // import UserTableVP from './user-table-vp';
// // import { BsCheck2 } from 'react-icons/bs';

// // const VProizvodstve = () => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [producedValues, setProducedValues] = useState({}); // To store produced values
// //   const [filterName, setFilterName] = useState(''); // For search filter
// //   const [numSelected, setNumSelected] = useState(0); // To track selected items

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem('token')).access;
// //         const idCompany = localStorage.getItem('selectedCompany');

// //         const response = await axiosInstance.get(`companies/${idCompany}/prodcution/`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         setData(response.data.results);

// //         // Initialize produced values for each product
// //         const initialProducedValues = response.data.results.reduce((acc, row) => {
// //           acc[row.id] = row.produced || 0; // Default to 0 if no value
// //           return acc;
// //         }, {});
// //         setProducedValues(initialProducedValues);

// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const handleProducedChange = (id, value) => {
// //     setProducedValues({
// //       ...producedValues,
// //       [id]: parseInt(value, 10), // Convert value to number
// //     });
// //   };

// //   const handleSubmitProduced = async (id) => {
// //     try {
// //       const token = JSON.parse(localStorage.getItem('token')).access;
// //       const idCompany = localStorage.getItem('selectedCompany');
// //       const url = `companies/${id}/update-prodcution/`;

// //       await axiosInstance.patch(
// //         url,
// //         {
// //           produced: producedValues[id], // Send the value as a number
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       console.log('Successfully updated produced quantity for:', id);
// //     } catch (error) {
// //       console.error('Error updating produced quantity:', error);
// //     }
// //   };

// //   // Function to submit all production changes at once
// //   const handleSubmitAllProduction = async () => {
// //     try {
// //       const token = JSON.parse(localStorage.getItem('token')).access;
// //       const idCompany = localStorage.getItem('selectedCompany');
// //       const url = `companies/${id}/update-prodcution/`;

// //       const filteredProductionValues = Object.keys(producedValues)
// //         .filter((id) => producedValues[id] && producedValues[id] > 0)
// //         .map((id) => ({ id, value: producedValues[id] }));

// //       if (filteredProductionValues.length === 0) {
// //         console.log('No data to submit');
// //         return;
// //       }

// //       const requests = filteredProductionValues.map(({ id, value }) => {
// //         return axiosInstance.patch(
// //           url,
// //           {
// //             recommendations_id: id,
// //             application_for_production: value,
// //           },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );
// //       });

// //       await Promise.all(requests);

// //       console.log('Successfully submitted data for selected values');
// //       // Clear produced values after submission
// //       setProducedValues({});
// //     } catch (error) {
// //       console.error('Error submitting data:', error);
// //     }
// //   };

// //   const handleSearch = (event) => {
// //     setFilterName(event.target.value);
// //   };

// //   const filteredData = data.filter((item) =>
// //     item.product.toLowerCase().includes(filterName.toLowerCase())
// //   );

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>Error: {error}</p>;

// //   return (
// //     <div>
// //       <UserTableVP
// //         numSelected={numSelected}
// //         filterName={filterName}
// //         onFilterName={handleSearch}
// //         onSubmitAllProduction={handleSubmitAllProduction}
// //       />
// //       <TableContainer>
// //         <Table>
// //           <TableHead>
// //             <TableRow>
// //               <TableCell>Продукт</TableCell>
// //               <TableCell>Нужно произвести</TableCell>
// //               <TableCell>Произведено</TableCell>
// //               <TableCell>Действия</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {filteredData.map((row) => (
// //               <TableRow key={row.id}>
// //                 <TableCell>{row.product}</TableCell>
// //                 <TableCell>{row.manufacture}</TableCell>
// //                 <TableCell>
// //                   <input
// //                     type="number"
// //                     value={producedValues[row.id]} // Value from state
// //                     onChange={(e) => {
// //                       handleProducedChange(row.id, e.target.value);
// //                       setNumSelected(
// //                         filteredData.filter((item) => item.id === row.id && e.target.value > 0)
// //                           .length
// //                       );
// //                     }}
// //                   />
// //                 </TableCell>
// //                 <TableCell>
// //                   <Button
// //                     variant="contained"
// //                     color="primary"
// //                     onClick={() => handleSubmitProduced(row.id)} // Send data to server
// //                   >
// //                     <BsCheck2 />
// //                   </Button>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>
// //     </div>
// //   );
// // };

// // export default VProizvodstve;


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
//   const [producedValues, setProducedValues] = useState({});
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

//         const initialProducedValues = response.data.results.reduce((acc, row) => {
//           acc[row.id] = row.produced || ''; // Default to empty string for input field
//           return acc;
//         }, {});
//         setProducedValues(initialProducedValues);

//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleProducedChange = (id, value) => {
//     setProducedValues({
//       ...producedValues,
//       [id]: value, // Store string value, handle conversion later
//     });
//   };

//   const handleSubmitProduced = async (id) => {
//     try {
//       const token = JSON.parse(localStorage.getItem('token')).access;
//       const idCompany = localStorage.getItem('selectedCompany');
//       const url = `companies/${id}/update-prodcution/`;

//       const producedValue = producedValues[id] || data.find((row) => row.id === id)?.manufacture;

//       await axiosInstance.patch(
//         url,
//         {
//           produced: Number(producedValue), // Ensure number type
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('Successfully updated produced quantity for:', id);
//     } catch (error) {
//       console.error('Error updating produced quantity:', error);
//     }
//   };

//   const handleSubmitAllProduction = async () => {
//     try {
//       const token = JSON.parse(localStorage.getItem('token')).access;
//       const idCompany = localStorage.getItem('selectedCompany');
//       const url = `companies/${idCompany}/update-prodcution/`;

//       const filteredProductionValues = Object.keys(producedValues)
//         .filter((id) => producedValues[id] && producedValues[id] > 0)
//         .map((id) => ({
//           id,
//           value: producedValues[id] || data.find((row) => row.id === id)?.manufacture,
//         }));

//       if (filteredProductionValues.length === 0) {
//         console.log('No data to submit');
//         return;
//       }

//       const requests = filteredProductionValues.map(({ id, value }) => {
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

//       console.log('Successfully submitted data for selected values');
//       setProducedValues({});
//     } catch (error) {
//       console.error('Error submitting data:', error);
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
//               <TableCell>Product</TableCell>
//               <TableCell>Required to Produce</TableCell>
//               <TableCell>Produced</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.product}</TableCell>
//                 <TableCell>{row.manufacture}</TableCell>
//                 <TableCell>
//                   {/* <TextField
//                     type="number"
//                     value={producedValues[row.id]}
//                     onChange={(e) => handleProducedChange(row.id, e.target.value)}
//                     placeholder="Enter value"
//                   /> */}
//                                       <input
//                       type="number"
//                       value={productionValues[row.id] !== undefined ? productionValues[row.id] : ''} // Если есть значение в productionValues, берем его, иначе оставляем пусто
//                       onChange={(e) => handleProductionValueChange(row.id, e.target.value)} // Обновляем значение при изменении
//                       placeholder={row.quantity} // Дефолтное значение в placeholder, но не в value, чтобы позволить стереть его
//                       className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
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
} from '@mui/material';
import { axiosInstance } from 'src/api/api';
import UserTableVP from './user-table-vp';
import { BsCheck2 } from 'react-icons/bs';

const VProizvodstve = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productionValues, setProductionValues] = useState({});
  const [filterName, setFilterName] = useState('');
  const [numSelected, setNumSelected] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');

        const response = await axiosInstance.get(`companies/${idCompany}/prodcution/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.results);

        // Initialize production values for each product
        const initialProductionValues = response.data.results.reduce((acc, row) => {
          acc[row.id] = row.produced || ''; // Default to empty string
          return acc;
        }, {});
        setProductionValues(initialProductionValues);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductionValueChange = (id, value) => {
    setProductionValues({
      ...productionValues,
      [id]: value, // Store the input value
    });
  };

  const handleSubmitProduced = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `companies/${id}/update-prodcution/`;

      // Get the production value, fallback to product value if empty
      const productionValue =
        productionValues[id] !== '' ? productionValues[id] : data.find((row) => row.id === id)?.manufacture;

      await axiosInstance.patch(
        url,
        {
          produced: Number(productionValue), // Send as number
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

  const handleSubmitAllProduction = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
  
      const filteredProductionValues = Object.keys(productionValues)
        .filter((id) => productionValues[id] && productionValues[id] > 0)
        .map((id) => ({
          id, // Идентификатор продукта
          value: productionValues[id] || data.find((row) => row.id === id)?.manufacture,
        }));
  
      if (filteredProductionValues.length === 0) {
        console.log('Нет данных для отправки');
        return;
      }
  
      const requests = filteredProductionValues.map(({ id, value }) => {
        const url = `companies/${id}/update-prodcution/`; // Здесь нужно добавить id продукта
  
        return axiosInstance.patch(
          url,
          {
            produced: Number(value), // Отправляем значение как число
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      });
  
      await Promise.all(requests);
  
      console.log('Успешно отправлены данные для выбранных значений');
      setProductionValues({});
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };
  

  const handleSearch = (event) => {
    setFilterName(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.product.toLowerCase().includes(filterName.toLowerCase())
  );

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <UserTableVP
        numSelected={numSelected}
        filterName={filterName}
        onFilterName={handleSearch}
        onSubmitAllProduction={handleSubmitAllProduction}
      />
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmitProduced(row.id)}
                  >
                    <BsCheck2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VProizvodstve;
