import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import { axiosInstance } from 'src/api/api'; // убедитесь, что правильно настроен axiosInstance

// Стили для модального окна
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function InventoryTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onExportExcel
}) {
  const [open, setOpen] = useState(false); // Для открытия и закрытия модального окна
  const [productID, setProductID] = useState(''); // Поле для ввода ID продукта
  const [shelfName, setShelfName] = useState(''); // Поле для ввода названия полки
  const [stock, setStock] = useState(''); // Поле для ввода количества на складе
  const [error, setError] = useState(''); // Для отображения ошибок

  // Функции для управления датами
  const handleStartDateChange = (event) => {
    onStartDateChange(event.target.value);
  };

  const handleEndDateChange = (event) => {
    onEndDateChange(event.target.value);
  };

  // Открытие и закрытие модального окна
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Функция для отправки данных на API
  const handleSubmit = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      
      const response = await axiosInstance.post(`companies/${idCompany}/inventory/`, {
        product_id: productID,
        shelf_name: shelfName,
        stock: stock,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response.data);
      handleClose(); // Закрываем модальное окно после успешного добавления
    } catch (err) {
      setError(err.message);
      console.error('Error adding product:', err);
    }
  };

  return (
    <>
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
          {numSelected > 0 ? (
            <Typography component="div" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
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
          )}
        </div>
        <Button variant="contained" onClick={onExportExcel}> {/* Call the export function */}
        Export to Excel
      </Button>

        {/* <div style={{ display: 'flex', gap: '8px' }} className="border rounded-lg p-3.5">
          <input
            type="date"
            onChange={handleStartDateChange}
          />
          <span>—</span>
          <input
            type="date"
            onChange={handleEndDateChange}
          />
        </div> */}

        <Button variant="contained" onClick={handleOpen}>
          Добавить Товар
        </Button>
      </Toolbar>

      {/* Модальное окно для добавления товара */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Добавить новый товар
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="ID Продукта"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Название Полки"
            value={shelfName}
            onChange={(e) => setShelfName(e.target.value)}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Количество на складе"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Отправить
          </Button>
        </Box>
      </Modal>
    </>
  );
}

InventoryTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
};
