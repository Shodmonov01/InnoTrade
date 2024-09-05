import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from 'src/api/api';

function Company() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const response = await axiosInstance.get('/companies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response.data);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanySelect = (company) => {
    // Сохраняем ID выбранной компании в localStorage
    localStorage.setItem('selectedCompany', company.id);
    navigate('/'); // Перенаправляем на главную страницу или панель управления
  };

  return (
    <div className="flex justify-evenly items-center h-[100vh] mx-auto">
      {companies.map((company) => (
        <Button key={company.id} variant="outlined" onClick={() => handleCompanySelect(company)}>
          {company.name}
        </Button>
      ))}
    </div>
  );
}

export default Company;

// import React, { useEffect, useState } from 'react';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from 'src/api/api'; // Use axiosInstance for fetching companies

// function Company() {
//   const [companies, setCompanies] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const response = await axiosInstance.get('/companies', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCompanies(response.data);
//       } catch (error) {
//         console.error('Failed to fetch companies', error);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   const handleCompanySelect = (company) => {
//     // Get the existing selected companies from localStorage or initialize an empty array
//     const existingCompanies = JSON.parse(localStorage.getItem('selectedCompany')) || [];
    
//     // Add the new company to the array if it is not already present
//     if (!existingCompanies.some(c => c.id === company.id)) {
//       existingCompanies.push(company);
//       localStorage.setItem('selectedCompany', JSON.stringify(existingCompanies));
//     }
    
//     navigate('/'); // Navigate to the default page or dashboard
//   };

//   return (
//     <div className="flex justify-evenly items-center h-[100vh] mx-auto">
//       {companies.map((company) => (
//         <Button key={company.id} variant="outlined" onClick={() => handleCompanySelect(company)}>
//           {company.name}
//         </Button>
//       ))}
//     </div>
//   );
// }

// export default Company;

