import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import { axiosAccountInstance } from 'src/api/api';
import { MdUploadFile } from 'react-icons/md';

const UserAddModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    username: '',
    chat_id: '',
    groups: [],
    password: '',
    avatar: null,
  });

  useEffect(() => {
    if (open) {
      const fetchRoles = async () => {
        try {
          const response = await axiosAccountInstance.get('/gorups');
          console.log('Fetched roles:', response.data);
          setRoles(response.data);
        } catch (error) {
          console.error('Failed to fetch roles', error);
        }
      };

      fetchRoles();
    }
  }, [open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGroupChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      groups: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'avatar' && formData.avatar) {
          formDataToSend.append('avatar', formData.avatar);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      await axiosAccountInstance.post('/create', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onClose();
    } catch (error) {
      console.error('Failed to create user', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          margin: 'auto',
          padding: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          mt: 8,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Добавить Пользователя
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{ width: 56, height: 56, mr: 2 }}
                src={formData.avatar ? URL.createObjectURL(formData.avatar) : ''}
              />
              <Button
                variant="outlined"
                component="label"
                startIcon={<MdUploadFile />}
              >
                Загрузить Аватар
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
            <TextField
              fullWidth
              label="Телефон"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Имя пользователя"
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Chat ID"
              name="chat_id"
              type="number"
              value={formData.chat_id}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Роли</InputLabel>
              <Select
                multiple
                value={formData.groups}
                onChange={handleGroupChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Пароль"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={onClose}>
                Отмена
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Сохранить
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default UserAddModal;
