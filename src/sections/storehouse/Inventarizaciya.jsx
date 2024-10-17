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
//   Chip,
//   IconButton,
//   TextField,
// } from '@mui/material';
// import InventoryTableToolbar from './InventoryTableToolbar';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
// import { CiEdit } from "react-icons/ci";
// import { MdOutlineDone } from 'react-icons/md';

// const Inventarizaciya = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newLocations, setNewLocations] = useState({});
//   const [editing, setEditing] = useState(null);
//   const [newTotalFact, setNewTotalFact] = useState({});

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

//   // Function to handle edit click
//   const handleEditClick = (id, totalFact) => {
//     setEditing(id); // Track which row is being edited
//     setNewTotalFact((prev) => ({ ...prev, [id]: totalFact })); // Initialize new total_fact value for the row
//   };

//   // Function to save the edited total_fact
//   const handleSaveClick = async (id, productId) => {
//     const token = JSON.parse(localStorage.getItem('token')).access;
//     const idCompany = localStorage.getItem('selectedCompany');

//     try {
//       // Send PUT request to update total_fact value for the product
//       await axiosInstance.put(`companies/${id}/inventory/`, {
//         total_fact: newTotalFact[id], // Use product id from the row
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Update the data locally
//       setData((prev) =>
//         prev.map((item) =>
//           item.id === id ? { ...item, total_fact: newTotalFact[id] } : item
//         )
//       );
//       setEditing(null); // Exit edit mode
//     } catch (error) {
//       console.error('Failed to update total_fact:', error);
//     }
//   };

//   const handleNewTotalFactChange = (id, value) => {
//     setNewTotalFact((prev) => ({ ...prev, [id]: value }));
//   };

//   const groupDataByVendorCode = (data) => {
//     const groupedData = {};

//     data.forEach(item => {
//       const vendorCode = item.product.vendor_code;
//       if (!groupedData[vendorCode]) {
//         groupedData[vendorCode] = {
//           product: item.product,
//           total: 0,
//           total_fact: item.total_fact,
//           shelfs: new Set(),
//           id: item.id,
//         };
//       }
//       groupedData[vendorCode].total += item.total;
//       item.shelfs.forEach(shelf => groupedData[vendorCode].shelfs.add(shelf.shelf_name));
//     });

//     Object.values(groupedData).forEach(item => {
//       item.shelfs = Array.from(item.shelfs);
//     });

//     return Object.values(groupedData);
//   };

//   const handleExportExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Inventory');

//     worksheet.addRow(['Код товара', 'Местоположение', 'Количество', 'Итого', 'Итого фактически']);

//     groupedData.forEach(row => {
//       worksheet.addRow([
//         row.product.vendor_code,
//         row.shelfs.join(', '),
//         row.total,
//         row.total,
//         row.total_fact,
//       ]);
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     saveAs(blob, 'inventory.xlsx');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const groupedData = groupDataByVendorCode(data);

//   return (
//     <div>
//       <InventoryTableToolbar onExportExcel={handleExportExcel} />
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
//             {groupedData.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell>{row.product.vendor_code}</TableCell>
//                 <TableCell>
//                   {row.shelfs.map((shelf, shelfIndex) => (
//                     <Chip key={shelfIndex} label={shelf} style={{ margin: '4px' }} />
//                   ))}
//                 </TableCell>
//                 <TableCell>{row.total}</TableCell>
//                 <TableCell>{row.total}</TableCell>
//                 <TableCell>
//                   {editing === row.id ? (
//                     <>
//                       <TextField
//                         value={newTotalFact[row.id] || ''}
//                         onChange={(e) => handleNewTotalFactChange(row.id, e.target.value)}
//                         size="small"
//                       />
//                       <IconButton onClick={() => handleSaveClick(row.id, row.product.product_id)}>
//                       <MdOutlineDone />

//                       </IconButton>
//                     </>
//                   ) : (
//                     <>
//                       {row.total_fact}
//                       <IconButton onClick={() => handleEditClick(row.id, row.total_fact)}>
//                       <CiEdit />

//                       </IconButton>
//                     </>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
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
  TextField,
  Tooltip,
  Chip,
} from '@mui/material';
import InventoryTableToolbar from './InventoryTableToolbar';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDone } from 'react-icons/md';

const Inventarizaciya = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [newTotalFact, setNewTotalFact] = useState({});

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

  const handleEditClick = (id, totalFact) => {
    setEditing(id);
    setNewTotalFact((prev) => ({ ...prev, [id]: totalFact }));
  };

  const handleSaveClick = async (id) => {
    const token = JSON.parse(localStorage.getItem('token')).access;
    const idCompany = localStorage.getItem('selectedCompany');

    try {
      await axiosInstance.put(
        `companies/${id}/inventory/`,
        {
          total_fact: newTotalFact[id],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData((prev) =>
        prev.map((item) => (item.id === id ? { ...item, total_fact: newTotalFact[id] } : item))
      );
      setEditing(null);
    } catch (error) {
      console.error('Failed to update total_fact:', error);
    }
  };

  const handleNewTotalFactChange = (id, value) => {
    setNewTotalFact((prev) => ({ ...prev, [id]: value }));
  };

  const groupDataByVendorCode = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const vendorCode = item.product.vendor_code;
      if (!groupedData[vendorCode]) {
        groupedData[vendorCode] = {
          product: item.product,
          total_fact: item.total_fact,
          shelfs: [],
        };
      }
      item.shelfs.forEach((shelf) => {
        groupedData[vendorCode].shelfs.push({
          shelf_name: shelf.shelf_name,
          stock: shelf.stock,
          id: item.id,
        });
      });
    });

    return Object.values(groupedData);
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventory');

    worksheet.addRow(['Код товара', 'Местоположение', 'Количество', 'Итого фактически']);

    groupedData.forEach((row) => {
      row.shelfs.forEach((shelf) => {
        worksheet.addRow([row.product.vendor_code, shelf.shelf_name, shelf.stock, row.total_fact]);
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'inventory.xlsx');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const groupedData = groupDataByVendorCode(data);

  return (
    <div>
      <InventoryTableToolbar onExportExcel={handleExportExcel} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Код товара</TableCell>
              <TableCell>Местоположение</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Итого фактически</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedData.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell rowSpan={row.shelfs.length + 1}>{row.product.vendor_code}</TableCell>
                </TableRow>
                {row.shelfs.map((shelf, shelfIndex) => (
                  <TableRow key={shelfIndex}>
                    <TableCell>
                      {/* {shelf.shelf_name} */}

                      <Tooltip title={shelf.shelf_name} key={index}>
                        <Chip
                          label={shelf.shelf_name}
                          variant="outlined"
                          style={{ marginRight: 4, marginTop: 0 }}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>{shelf.stock}</TableCell>
                    <TableCell>
                      {editing === shelf.id ? (
                        <>
                          <TextField
                            value={newTotalFact[shelf.id] || ''}
                            onChange={(e) => handleNewTotalFactChange(shelf.id, e.target.value)}
                            size="small"
                          />
                          <IconButton onClick={() => handleSaveClick(shelf.id)}>
                            <MdOutlineDone />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          {/* {row.total_fact} */}
                          {shelf.stock}
                          <IconButton onClick={() => handleEditClick(shelf.id, row.total_fact)}>
                            <CiEdit />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Inventarizaciya;
