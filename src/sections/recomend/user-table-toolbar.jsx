import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  CircularProgress,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { BsCheck2All } from 'react-icons/bs';
import Iconify from 'src/components/iconify';

export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onSubmitAllProduction,
  sort,
  setSort,
  onExport,
  isExporting,
  handleCalculateClick,
  isLoading,
}) {
  const [localFilterName, setLocalFilterName] = useState('');

  const handleFilterChange = (event) => {
    setLocalFilterName(event.target.value);
  };

  const handleSearchClick = () => {
    onFilterName({ target: { value: localFilterName } }); // Вызываем функцию поиска с локальным значением
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  return (
    <Toolbar className="my-5 flex justify-between">
    
      <Button
        variant="contained"
        color="inherit"
        startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
        onClick={onExport}
        disabled={isExporting}
        sx={{ padding: '15px 26px' }}
      >
        {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
      </Button>
      
      <OutlinedInput
        value={localFilterName}
        onChange={handleFilterChange}
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

      {/* Кнопка для выполнения поиска */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchClick} // Обработчик клика по кнопке "Поиск"
        sx={{ padding: '15px 26px', marginLeft: 1 }} // Добавим немного отступа
      >
        Поиск
      </Button>
      <Select
        value={sort}
        onChange={handleSortChange} // Call the new function
        displayEmpty
        inputProps={{ 'aria-label': 'Sort' }}
        sx={{ mb: 0, px: 3 }}
      >
        <MenuItem value="">Без сортировки</MenuItem>
        <MenuItem value="1">Больше продаж</MenuItem>
        <MenuItem value="-1">Меньше продаж</MenuItem>
        <MenuItem value="A-Z">От A до Z</MenuItem>
        <MenuItem value="Z-A">От Z до A</MenuItem>
      </Select>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCalculateClick}
        disabled={isLoading} // Отключаем кнопку во время загрузки
        sx={{ padding: '15px 26px' }}
      >
        {isLoading ? 'Подсчёт...' : 'Подсчёт'}
      </Button>

      <Button
        variant="contained"
        // color="contained"
        onClick={onSubmitAllProduction}
        // disabled={numSelected === 0}
        sx={{ padding: '15px 26px' }}
      >
        <BsCheck2All size={24} />
      </Button>
    </Toolbar>
  );
}
