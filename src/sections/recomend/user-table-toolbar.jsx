import React from 'react';
import {
  Toolbar,
  Typography,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { BsCheck2All } from 'react-icons/bs';

export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onSubmitAllProduction,
  sort,
  setSort,
  onExport,   
  isExporting
}) {
  

  const handleSortChange = (event) => {
    setSort(event.target.value); // Call setSort passed from parent
  };
  return (
    <Toolbar>
      <Grid container spacing={2} alignItems="center" >
     <Grid item>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={onExport} // Обработчик для экспорта в Excel
          >
            Экспорт в Excel
          </Button> */}
                  <Button
          variant="contained"
          color="inherit"

          startIcon={isExporting ? <CircularProgress size={20} /> : <PiMicrosoftExcelLogo />}
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? 'Загрузка...' : 'Экспорт в Excel'}
        </Button>
        </Grid>
        <Grid item xs>
          <TextField
            variant="outlined"
            placeholder="Поиск"
            value={filterName}
            onChange={onFilterName}
            size="small"
            fullWidthпо
          />
        </Grid>
        <Grid item>
        <Select
        value={sort}
        onChange={handleSortChange} // Call the new function
        displayEmpty
        inputProps={{ 'aria-label': 'Sort' }}
        sx={{ mb: 0, px: 3}}
      >
        <MenuItem value="">Без сортировки</MenuItem>
        <MenuItem value="1">Больше продаж</MenuItem>
        <MenuItem value="-1">Меньше продаж</MenuItem>
        <MenuItem value="A-Z">От A до Z</MenuItem>
        <MenuItem value="Z-A">От Z до A</MenuItem>
      </Select>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            // color="contained"
            onClick={onSubmitAllProduction}
            // disabled={numSelected === 0}
          >
            <BsCheck2All />
          </Button>
        </Grid>
        
      </Grid>
    </Toolbar>
  );
}
