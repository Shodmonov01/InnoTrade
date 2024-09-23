// import React, { useEffect, useState } from 'react';
// import { axiosInstance } from 'src/api/api';

// const Inventarizaciya = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;     const idCompany = localStorage.getItem('selectedCompany'); // Получаем ID компании из localStorage
//         const response = await axiosInstance.get(`companies/${idCompany}/inventory/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h2>Инвентаризация</h2>
//       {/* Отображение данных */}
//       <pre>{JSON.stringify(data, null, 2)}</pre>
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
  TextField,
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
        setData(response.data.results); // Устанавливаем только результаты
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
      <InventoryTableToolbar
        // numSelected={selected.length}
        // filterName={filterName}
        // onFilterName={handleFilterName}
        // startDate={startDate}
        // endDate={endDate}
        // onStartDateChange={setStartDate}
        // onEndDateChange={setEndDate}
      />
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
                {row.shelfs.map((shelf, shelfIndex) => (
                  <React.Fragment key={shelfIndex}>
                    <TableCell>{row.product.vendor_code}</TableCell> {/* Код товара */}
                    <TableCell>
                      {shelf.shelf_name}
                      <IconButton
                        onClick={() => handleAddNewLocation(shelf.id)}
                        size="small"
                        color="primary"
                      >
                        <AiOutlinePlus />
                      </IconButton>
                      <TextField
                        size="small"
                        value={newLocations[shelf.id] || ''}
                        onChange={(e) => handleNewLocationChange(shelf.id, e.target.value)}
                        placeholder="Новое место"
                      />
                    </TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.total_fact}</TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Inventarizaciya;
