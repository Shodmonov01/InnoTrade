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


//   const handleEditClick = (id, totalFact) => {
//     setEditing(id); // Track which row is being edited
//     setNewTotalFact((prev) => ({ ...prev, [id]: totalFact })); // Initialize new total_fact value for the row
//   };

//   const handleSaveClick = async (id) => {
//     const token = JSON.parse(localStorage.getItem('token')).access;
//     const idCompany = localStorage.getItem('selectedCompany');

//     try {
//       // Send PUT request to update total_fact value
//       await axiosInstance.put(`companies/${id}/inventory/`, {
//         total_fact: newTotalFact[id],
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

//   const handleNewLocationChange = (id, value) => {
//     setNewLocations((prev) => ({ ...prev, [id]: value }));
//   };

//   console.log(data);
  

//   const groupDataByVendorCode = (data) => {
//     const groupedData = {};

//     data.forEach(item => {
//       const vendorCode = item.product.vendor_code;
//       if (!groupedData[vendorCode]) {
//         groupedData[vendorCode] = {
//           product: item.product,
//           total: 0, // Total quantity initialization
//           total_fact: item.total_fact, // Assuming this is not aggregated and taken directly
//           shelfs: new Set(), // Use a Set for unique shelf names
//         };
//       }
//       groupedData[vendorCode].total += item.total; // Aggregate total quantities
//       item.shelfs.forEach(shelf => groupedData[vendorCode].shelfs.add(shelf.shelf_name)); // Add unique shelf names
//     });

//     // Convert Set back to Array for rendering
//     Object.values(groupedData).forEach(item => {
//       item.shelfs = Array.from(item.shelfs);
//     });

//     return Object.values(groupedData);
//   };

//   const handleExportExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Inventory');

//     // Add header row
//     worksheet.addRow(['Код товара', 'Местоположение', 'Количество', 'Итого', 'Итого фактически']);

//     // Add data rows
//     groupedData.forEach(row => {
//       worksheet.addRow([
//         row.product.vendor_code,
//         row.shelfs.join(', '),
//         row.total,
//         row.total,
//         row.total_fact,
//       ]);
//     });

//     // Export the Excel file
//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     saveAs(blob, 'inventory.xlsx');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const groupedData = groupDataByVendorCode(data);

//   return (
//     <div>
//       <InventoryTableToolbar 
//        onExportExcel={handleExportExcel}
//       />
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
//                     <Chip
//                       key={shelfIndex}
//                       label={shelf}
//                       style={{ margin: '4px' }} // Add margin for aesthetics
//                     />
//                   ))}
//                 </TableCell>
//                 <TableCell>{row.total}</TableCell> {/* Total aggregated quantity */}
//                 <TableCell>{row.total}</TableCell> {/* This could be adjusted if you have a specific logic */}
//                 {/* <TableCell>{row.total_fact}</TableCell> */}
//                 <TableCell>
//                   {editing === row.id ? (
//                     <>
//                       <TextField
//                         value={newTotalFact[row.id]}
//                         onChange={(e) => handleNewTotalFactChange(row.id, e.target.value)}
//                         size="small"
//                       />
//                       <IconButton onClick={() => handleSaveClick(row.id)}>
//                         сох
//                       </IconButton>
//                     </>
//                   ) : (
//                     <>
//                       {row.total_fact}
//                       <IconButton onClick={() => handleEditClick(row.id, row.total_fact)}>
//                         мз
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
  Chip,
  IconButton,
  TextField,
} from '@mui/material';
import InventoryTableToolbar from './InventoryTableToolbar';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDone } from 'react-icons/md';


const Inventarizaciya = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newLocations, setNewLocations] = useState({});
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

  // Function to handle edit click
  const handleEditClick = (id, totalFact) => {
    setEditing(id); // Track which row is being edited
    setNewTotalFact((prev) => ({ ...prev, [id]: totalFact })); // Initialize new total_fact value for the row
  };

  // Function to save the edited total_fact
  const handleSaveClick = async (id, productId) => {
    const token = JSON.parse(localStorage.getItem('token')).access;
    const idCompany = localStorage.getItem('selectedCompany');

    try {
      // Send PUT request to update total_fact value for the product
      await axiosInstance.put(`companies/${id}/inventory/`, {
        total_fact: newTotalFact[id], // Use product id from the row
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the data locally
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, total_fact: newTotalFact[id] } : item
        )
      );
      setEditing(null); // Exit edit mode
    } catch (error) {
      console.error('Failed to update total_fact:', error);
    }
  };

  const handleNewTotalFactChange = (id, value) => {
    setNewTotalFact((prev) => ({ ...prev, [id]: value }));
  };

  const groupDataByVendorCode = (data) => {
    const groupedData = {};

    data.forEach(item => {
      const vendorCode = item.product.vendor_code;
      if (!groupedData[vendorCode]) {
        groupedData[vendorCode] = {
          product: item.product,
          total: 0,
          total_fact: item.total_fact,
          shelfs: new Set(),
          id: item.id,
        };
      }
      groupedData[vendorCode].total += item.total;
      item.shelfs.forEach(shelf => groupedData[vendorCode].shelfs.add(shelf.shelf_name));
    });

    Object.values(groupedData).forEach(item => {
      item.shelfs = Array.from(item.shelfs);
    });

    return Object.values(groupedData);
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Inventory');

    worksheet.addRow(['Код товара', 'Местоположение', 'Количество', 'Итого', 'Итого фактически']);

    groupedData.forEach(row => {
      worksheet.addRow([
        row.product.vendor_code,
        row.shelfs.join(', '),
        row.total,
        row.total,
        row.total_fact,
      ]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
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
              <TableCell>Итого</TableCell>
              <TableCell>Итого фактически</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.product.vendor_code}</TableCell>
                <TableCell>
                  {row.shelfs.map((shelf, shelfIndex) => (
                    <Chip key={shelfIndex} label={shelf} style={{ margin: '4px' }} />
                  ))}
                </TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>{row.total}</TableCell>
                <TableCell>
                  {editing === row.id ? (
                    <>
                      <TextField
                        value={newTotalFact[row.id] || ''}
                        onChange={(e) => handleNewTotalFactChange(row.id, e.target.value)}
                        size="small"
                      />
                      <IconButton onClick={() => handleSaveClick(row.id, row.product.product_id)}>
                      <MdOutlineDone />

                      </IconButton>
                    </>
                  ) : (
                    <>
                      {row.total_fact}
                      <IconButton onClick={() => handleEditClick(row.id, row.total_fact)}>
                      <CiEdit />

                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Inventarizaciya;
