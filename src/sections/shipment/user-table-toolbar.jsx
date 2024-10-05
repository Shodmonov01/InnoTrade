// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import Tooltip from '@mui/material/Tooltip';
// import Iconify from 'src/components/iconify';
// import { Button, Card, CircularProgress, MenuItem, Select } from '@mui/material';
// import { PiMicrosoftExcelLogo } from 'react-icons/pi';
// import { BsCheck2All } from 'react-icons/bs';

// export default function UserTableToolbar({
//   numSelected,
//   filterName,
//   onFilterName,
//   onStartDateChange,
//   onEndDateChange,
//   onExportExcel,
//   isExporting,
//   sort,
//   handleSortChange,
// }) {
//   // Функции для управления изменениями дат

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
//       <OutlinedInput
//         value={filterName}
//         onChange={onFilterName}
//         placeholder="Поиск"
//         startAdornment={
//           <InputAdornment position="start" sx={{ mb: 0, px: 1 }}>
//             <Iconify
//               icon="eva:search-fill"
//               sx={{ color: 'text.disabled', width: 20, height: 20 }}
//             />
//           </InputAdornment>
//         }
//       />

//       <Select
//         value={sort}
//         onChange={handleSortChange} // Call the new function
//         displayEmpty
//         inputProps={{ 'aria-label': 'Sort' }}
//         sx={{ mb: 0, px: 5 }}
//       >
//         <MenuItem value="">Без сортировки</MenuItem>
//         <MenuItem value="1">Больше продаж</MenuItem>
//         <MenuItem value="-1">Меньше продаж</MenuItem>
//         <MenuItem value="A-Z">От A до Z</MenuItem>
//         <MenuItem value="Z-A">От Z до A</MenuItem>
//       </Select>
//       <Select
//         value={sort}
//         onChange={handleSortChange} // Call the new function
//         displayEmpty
//         inputProps={{ 'aria-label': 'Sort' }}
//         sx={{ mb: 0, px: 5 }}
//       >
//         <MenuItem value="">Все сервисы</MenuItem>
//         <MenuItem value="wildberries">wildberries</MenuItem>
//         <MenuItem value="ozon">ozon</MenuItem>
//         <MenuItem value="yandexmarket">yandexmarket</MenuItem>
//       </Select>

//       <Button variant="contained" sx={{ padding: '15px 26px' }}>
//         Поиск
//       </Button>

//       <Button
//         variant="contained"
//         color="inherit"
//         startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
//         onClick={onExportExcel}
//         disabled={isExporting}
//         sx={{ padding: '15px 26px' }}
//       >
//         {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
//       </Button>

// <Button variant="contained" color="warning" sx={{ padding: '15px 26px' }}>
//   <BsCheck2All size={24} />
// </Button>
//     </Toolbar>
//   );
// }

// UserTableToolbar.propTypes = {
//   numSelected: PropTypes.number,
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func,
//   startDate: PropTypes.instanceOf(Date),
//   endDate: PropTypes.instanceOf(Date),
//   onStartDateChange: PropTypes.func,
//   onEndDateChange: PropTypes.func,
//   onExportExcel: PropTypes.func,
// };

import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, Select, MenuItem, CircularProgress } from '@mui/material';
import Iconify from 'src/components/iconify';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { BsCheck2All } from 'react-icons/bs';

export default function UserTableToolbar({
  filterName,
  onFilterName,
  sort,
  handleSortChange,
  service,
  handleServiceChange,
  onSearch, // Функция для отправки поиска
  onExportExcel,
  isExporting,
  onOpenDialog
}) {
  return (
    // <Toolbar sx={{ height: 156,  p: 3 }}>
      <div className='flex flex-col p-5 gap-5'>
        <div className='flex justify-between'>
          {' '}
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Поиск"
            startAdornment={
              <InputAdornment position="start" sx={{ mb: 0, px: 1 }}>
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <Select value={sort} onChange={handleSortChange} displayEmpty sx={{ mb: 0, px: 5 }}>
            <MenuItem value="">
              <em>Сортировать</em>
            </MenuItem>
            <MenuItem value="sales">Больше продаж</MenuItem>
            <MenuItem value="az">От A до Z</MenuItem>
            <MenuItem value="za">От Z до A</MenuItem>
          </Select>
          <Select value={service} onChange={handleServiceChange} displayEmpty sx={{ mb: 0, px: 5 }}>
            <MenuItem value="">
              <em>Все сервисы</em>
            </MenuItem>
            <MenuItem value="wildberries">Wildberries</MenuItem>
            <MenuItem value="ozon">Ozon</MenuItem>
            <MenuItem value="yandexmarket">YandexMarket</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={onSearch}
            sx={{ padding: '15px 36px', fontSize: '15px' }}
          >
            Поиск
          </Button>
        </div>

        <div className='flex justify-between'>
          <Button
            variant="contained"
            color="inherit"
            startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
            onClick={onExportExcel}
            disabled={isExporting}
            sx={{ padding: '15px 26px' }}
          >
            {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
          </Button>
          {/* <Button variant="contained" color="warning" sx={{ padding: '15px 26px' }} onClick={handleSubmitAllProduction}>
            <BsCheck2All size={24} />
          </Button> */}
          <Button variant="contained" color="warning" sx={{ padding: '15px 26px' }} onClick={onOpenDialog}>
          <BsCheck2All size={24} />
        </Button>
          
        </div>
      </div>
    // </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  sort: PropTypes.string,
  handleSortChange: PropTypes.func,
  service: PropTypes.string,
  handleServiceChange: PropTypes.func,
  onSearch: PropTypes.func,
  onExportExcel: PropTypes.func,
  isExporting: PropTypes.bool,
};
