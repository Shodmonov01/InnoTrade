// // import PropTypes from 'prop-types';
// // import React, { useState } from 'react';
// // import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// // import IconButton from '@mui/material/IconButton';
// // import OutlinedInput from '@mui/material/OutlinedInput';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import Tooltip from '@mui/material/Tooltip';
// // import Iconify from 'src/components/iconify';
// // import { format } from 'date-fns'; // Импортируем функцию форматирования даты из date-fns
// // import { Button } from '@mui/material';

// // export default function UserTableToolbar({
// //   numSelected,
// //   filterName,
// //   onFilterName,
// //   startDate,
// //   endDate,
// //   onStartDateChange,
// //   onEndDateChange,
// // }) {
// //   // Функции для управления изменениями дат
// //   const handleStartDateChange = (event) => {
// //     const date = event.target.value;
// //     onStartDateChange(date); // Передаем выбранную дату в родительский компонент
// //   };

// //   const handleEndDateChange = (event) => {
// //     const date = event.target.value;
// //     onEndDateChange(date); // Передаем выбранную дату в родительский компонент
// //   };

// //   return (
// //     <Toolbar
// //       sx={{
// //         height: 96,
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         p: (theme) => theme.spacing(0, 1, 0, 3),
// //         ...(numSelected > 0 && {
// //           color: 'primary.main',
// //           bgcolor: 'primary.lighter',
// //         }),
// //       }}
// //     >
// //       <div>
// //         {numSelected > 0 ? (
// //           <Typography component="div" variant="subtitle1">
// //             {numSelected} selected
// //           </Typography>
// //         ) : (
// //           <>
// //             <OutlinedInput
// //               value={filterName}
// //               onChange={onFilterName}
// //               placeholder="Поиск"
// //               startAdornment={
// //                 <InputAdornment position="start">
// //                   <Iconify
// //                     icon="eva:search-fill"
// //                     sx={{ color: 'text.disabled', width: 20, height: 20 }}
// //                   />
// //                 </InputAdornment>
// //               }
// //             />
// //           </>
// //         )}
// //       </div>

// //       {/* <div style={{ display: 'flex', gap: '8px' }} className="border rounded-lg p-3.5">
// //         <input
// //           type="date"
// //           // value={format(startDate, 'yyyy-MM-dd')}
// //           onChange={handleStartDateChange}
// //         />
// //         <span>—</span>
// //         <input
// //           type="date"
// //           // value={format(endDate, 'yyyy-MM-dd')}
// //           onChange={handleEndDateChange}
// //         />
// //       </div> */}

// //       <div>
// //         {numSelected > 0 ? (
// //           <Tooltip title="Delete">
// //             <IconButton>
// //               <Iconify icon="eva:trash-2-fill" />
// //             </IconButton>
// //           </Tooltip>
// //         ) : (
// //           <Tooltip title="Filter list">
// //             <IconButton>
// //               <Iconify icon="ic:round-filter-list" />
// //             </IconButton>
// //           </Tooltip>
// //         )}
// //         <Button variant="contained" color="warning">
// //           В работу
// //         </Button>
// //       </div>
// //     </Toolbar>
// //   );
// // }

// // UserTableToolbar.propTypes = {
// //   numSelected: PropTypes.number,
// //   filterName: PropTypes.string,
// //   onFilterName: PropTypes.func,
// //   startDate: PropTypes.instanceOf(Date),
// //   endDate: PropTypes.instanceOf(Date),
// //   onStartDateChange: PropTypes.func,
// //   onEndDateChange: PropTypes.func,
// // };

// import PropTypes from 'prop-types';
// import React from 'react';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import Tooltip from '@mui/material/Tooltip';
// import Iconify from 'src/components/iconify';
// import { Button } from '@mui/material';

// export default function UserTableToolbar({
//   numSelected,
//   filterName,
//   onFilterName,
//   onSubmitAllProduction, // Новый пропс для массовой отправки
// }) {
//   return (
//     <Toolbar
//       sx={{
//         height: 96,
//         display: 'flex',
//         justifyContent: 'space-between',
//         p: (theme) => theme.spacing(0, 1, 0, 3),
//         ...(numSelected > 0 && {
//           color: 'primary.main',
//           bgcolor: 'primary.lighter',
//         }),
//       }}
//     >
//       <div>
//         {numSelected > 0 ? (
//           <Typography component="div" variant="subtitle1">
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <OutlinedInput
//             value={filterName}
//             onChange={onFilterName}
//             placeholder="Поиск"
//             startAdornment={
//               <InputAdornment position="start">
//                 <Iconify
//                   icon="eva:search-fill"
//                   sx={{ color: 'text.disabled', width: 20, height: 20 }}
//                 />
//               </InputAdornment>
//             }
//           />
//         )}
//       </div>

//       <div>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton>
//               <Iconify icon="eva:trash-2-fill" />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton>
//               <Iconify icon="ic:round-filter-list" />
//             </IconButton>
//           </Tooltip>
//         )}
//         <Button variant="contained" color="warning" onClick={onSubmitAllProduction}>
//           В работу
//         </Button>
//       </div>
//     </Toolbar>
//   );
// }

// UserTableToolbar.propTypes = {
//   numSelected: PropTypes.number,
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func,
//   onSubmitAllProduction: PropTypes.func.isRequired, // Указываем, что передача функции обязательна
// };

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import Iconify from 'src/components/iconify';
import { Button, MenuItem, Select } from '@mui/material';
import { BsCheck2All } from 'react-icons/bs';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';

export default function UserTableVP({
  numSelected,
  filterName,
  onFilterName,
  onSubmitAllProduction,
  onSortChange,
  sort,
  handleExportToExcel,
}) {
  const [sortField, setSortField] = useState('product'); // Поле сортировки
  const [sortDirection, setSortDirection] = useState('asc'); // Направление сортировки

  const handleSortChange = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    onSortChange(sortField, newDirection);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <div>
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Поиск"
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      </div>

      <Select
        value={sort} // Controlled select for sorting
        onChange={(e) => onSortChange(e.target.value)} // Handle sort change
        displayEmpty
        inputProps={{ 'aria-label': 'Sort' }}
      >
        <MenuItem value="">Без сортировки</MenuItem>
        <MenuItem value="1">Больше продаж</MenuItem>
        <MenuItem value="-1">Меньше продаж</MenuItem>
        <MenuItem value="A-Z">От A до Z</MenuItem>
        <MenuItem value="Z-A">От Z до A</MenuItem>
      </Select>

      <Button
        variant="contained"
        color="inherit"
        onClick={handleExportToExcel}
        startIcon={<PiMicrosoftExcelLogo />}
        sx={{ padding: '15px 26px' }}
      >
        Экспорт в Excel
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={onSubmitAllProduction}
        sx={{ padding: '18px 26px' }}
      >
        <BsCheck2All />
      </Button>
    </Toolbar>
  );
}

UserTableVP.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onSubmitAllProduction: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired, // Обязательный пропс для кнопки поиска
};
