// import PropTypes from 'prop-types';
// import React from 'react';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import Tooltip from '@mui/material/Tooltip';
// import Iconify from 'src/components/iconify';
// import { format } from 'date-fns';
// import { Button, CircularProgress } from '@mui/material';

// export default function UserTableToolbar({
//   numSelected,
//   filterName,
//   onFilterName,
//   startDate,
//   endDate,
//   onStartDateChange,
//   onEndDateChange,
//   onSearch, // добавляем функцию поиска
//   isLoading, // добавляем состояние загрузки
// }) {
//   const handleStartDateChange = (event) => {
//     const date = event.target.value;
//     onStartDateChange(new Date(date)); // Convert string to Date object
//   };

//   const handleEndDateChange = (event) => {
//     const date = event.target.value;
//     onEndDateChange(new Date(date)); // Convert string to Date object
//   };

//   return (
//     <Toolbar
//       sx={{
//         height: 96,
//         display: 'flex',
//         gap: 10,
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
//           <>
//             <OutlinedInput
//               value={filterName}
//               onChange={onFilterName}
//               placeholder="Поиск"
//               startAdornment={
//                 <InputAdornment position="start">
//                   <Iconify
//                     icon="eva:search-fill"
//                     sx={{ color: 'text.disabled', width: 20, height: 20 }}
//                   />
//                 </InputAdornment>
//               }
//             />
//           </>
//         )}
//       </div>

//       <div style={{ display: 'flex', gap: '8px' }} className="border rounded-lg p-3.5">
//         <input
//           type="date"
//           value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
//           onChange={handleStartDateChange}
//         />
//         <span>—</span>
//         <input
//           type="date"
//           value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
//           onChange={handleEndDateChange}
//         />
//       </div>

//       <Button onClick={onSearch} disabled={isLoading}>
//         {isLoading ? <CircularProgress size={24} /> : 'Поиск'}
//       </Button>
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
//   onSearch: PropTypes.func,
//   isLoading: PropTypes.bool,
// };


import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import Iconify from 'src/components/iconify';
import { format } from 'date-fns';
import { Button, CircularProgress, Select, MenuItem } from '@mui/material';

export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
  isLoading,
  sort, // Добавляем состояние сортировки
  setSort, // Добавляем функцию для изменения сортировки
}) {
  const handleStartDateChange = (event) => {
    const date = event.target.value;
    onStartDateChange(new Date(date)); // Convert string to Date object
  };

  const handleEndDateChange = (event) => {
    const date = event.target.value;
    onEndDateChange(new Date(date)); // Convert string to Date object
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        gap: 10,
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )} */}
      <div>
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <>
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
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '8px' }} className="border rounded-lg p-3.5">
        <input
          type="date"
          value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
          onChange={handleStartDateChange}
        />
        <span>—</span>
        <input
          type="date"
          value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
          onChange={handleEndDateChange}
        />
      </div>

      {/* Добавляем Select для сортировки */}
      <Select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort' }}
        sx={{ mb: 0, px: 6 }}
      >
        <MenuItem value="">Без сортировки</MenuItem>
        <MenuItem value="1">Больше</MenuItem>
        <MenuItem value="-1">Меньше</MenuItem>
        <MenuItem value="A-Z">От A до Z</MenuItem>
        <MenuItem value="Z-A">От Z до A</MenuItem>
      </Select>

      <Button onClick={onSearch} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Поиск'}
      </Button>
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onSearch: PropTypes.func,
  isLoading: PropTypes.bool,
  sort: PropTypes.string, // Пропсы для сортировки
  setSort: PropTypes.func, // Пропсы для функции изменения сортировки
};