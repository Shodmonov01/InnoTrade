import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { axiosInstance } from 'src/api/api';
import { MdDeleteOutline } from 'react-icons/md'; // Иконка для удаления
import { AiOutlineArrowRight } from 'react-icons/ai'; // Иконка для перехода

const VProizvodstve = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [producedValues, setProducedValues] = useState({}); // Для хранения значений produced

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const idCompany = localStorage.getItem('selectedCompany');

        const response = await axiosInstance.get(`companies/${idCompany}/prodcution/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.results);

        // Инициализация значений produced для каждого товара
        const initialProducedValues = response.data.results.reduce((acc, row) => {
          acc[row.id] = row.produced || 0; // Если нет значения, то 0
          return acc;
        }, {});
        setProducedValues(initialProducedValues);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProducedChange = (id, value) => {
    setProducedValues({
      ...producedValues,
      [id]: parseInt(value, 10), // Преобразуем значение в число
    });
  };

  const handleSubmitProduced = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token')).access;
      const idCompany = localStorage.getItem('selectedCompany');
      const url = `companies/${id}/update-prodcution/`;

      await axiosInstance.patch(
        url,
        {
          produced: producedValues[id], // Значение отправляется как число
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Успешно обновлено произведенное количество для:", id);
    } catch (error) {
      console.error("Ошибка при обновлении произведенного количества:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>В производстве</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Продукт</TableCell>
              <TableCell>Нужно произвести</TableCell>
              <TableCell>Произведено</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.manufacture}</TableCell>
                <TableCell>
                  {/* Инпут для изменения количества произведенного */}
                  <input
                    type="number"
                    value={producedValues[row.id]} // Значение из состояния
                    onChange={(e) => handleProducedChange(row.id, e.target.value)} // Изменяем значение и преобразуем в число
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmitProduced(row.id)} // Отправляем данные на сервер
                  >
                    Обновить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VProizvodstve;
