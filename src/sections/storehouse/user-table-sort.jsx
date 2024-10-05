

// import PropTypes from 'prop-types';
// import React from 'react';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import Iconify from 'src/components/iconify';
// import { MenuItem, Select } from '@mui/material';

// export default function UserTableSort({
//   filterName,
//   onFilterName,  sort, onSortChange
// }) {
//   return (
//     <Toolbar
//       sx={{
//         height: 96,
//         display: 'flex',
//         justifyContent: 'space-between',
//         p: (theme) => theme.spacing(0, 1, 0, 3),
//       }}
//     >
//       <div>
//         <OutlinedInput
//           value={filterName}
//           onChange={onFilterName}
//           placeholder="Поиск"
//           startAdornment={
//             <InputAdornment position="start">
//               <Iconify
//                 icon="eva:search-fill"
//                 sx={{ color: 'text.disabled', width: 20, height: 20 }}
//               />
//             </InputAdornment>
//           }
//         />
//       </div>

//       <div>
//       <Select
//         value={sort}
//         onChange={(e) => onSortChange(e.target.value)} // Обновлено
//         displayEmpty
//         inputProps={{ 'aria-label': 'Sort' }}
//         sx={{ mb: 0, px: 6 }}
//       >
//         <MenuItem value="">Без сортировки</MenuItem>
//         <MenuItem value="1">Больше продаж</MenuItem>
//         <MenuItem value="-1">Меньше продаж</MenuItem>
//         <MenuItem value="A-Z">От A до Z</MenuItem>
//         <MenuItem value="Z-A">От Z до A</MenuItem>
//       </Select>
//       </div>
//     </Toolbar>
//   );
// }

// UserTableSort.propTypes = {
//   filterName: PropTypes.string,
//   onFilterName: PropTypes.func.isRequired,
//   sort: PropTypes.string.isRequired, // Добавлено
//   onSortChange: PropTypes.func.isRequired, // Добавлено
// };


import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { MenuItem, Select, Button, CircularProgress } from '@mui/material';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';

export default function UserTableSort({
  filterName,
  onFilterName,
  sort,
  onSortChange,
  onExcelExport, // Add this prop
  loading, // Add this prop for loading state
}) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
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

      <div>
        <Select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Sort' }}
          sx={{ mb: 0, px: 6 }}
        >
          <MenuItem value="">Без сортировки</MenuItem>
          <MenuItem value="1">Больше продаж</MenuItem>
          <MenuItem value="-1">Меньше продаж</MenuItem>
          <MenuItem value="A-Z">От A до Z</MenuItem>
          <MenuItem value="Z-A">От Z до A</MenuItem>
        </Select>
      </div>

      <div>
        {/* <Button
          variant="contained"
          onClick={onExcelExport}
          disabled={loading} // Disable while loading
     7777777   >
          {loading ? <CircularProgress size={24} /> : 'Экспорт в Excel'}
        </Button> */}
        <Button
        variant="contained"
        color="inherit"
        onClick={onExcelExport}
        startIcon={<PiMicrosoftExcelLogo />}
        sx={{ padding: '15px 26px' }}
      >
        Экспорт в Excel
      </Button>
      </div>
    </Toolbar>
  );
}

UserTableSort.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func.isRequired,
  sort: PropTypes.string,
  onSortChange: PropTypes.func.isRequired,
  onExcelExport: PropTypes.func.isRequired, // Add this prop
  loading: PropTypes.bool.isRequired, // Add this prop
};
