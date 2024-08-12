// // import React, { useEffect, useState } from 'react';
// // import { Button } from '@mui/material';
// // import { Link } from 'react-router-dom';
// // import { axiosCompanyInstance } from 'src/api/api';

// // function Company() {
// //   const [companies, setCompanies] = useState([]);

// //   useEffect(() => {
// //     const fetchCompanies = async () => {
// //       try {
// //         const token = JSON.parse(localStorage.getItem('token')).access;
// //         console.log(token);
// //         const response = await axiosCompanyInstance.get('/companies/login', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         // console.log(response.data);
// //         setCompanies(response.data);
// //       } catch (error) {
// //         console.error('Failed to fetch companies', error);
// //       }
// //     };

// //     fetchCompanies();
// //   }, []);

// //   return (
// //     <div className="flex justify-evenly items-center h-[100vh] mx-auto">
// //       {companies.map((company) => (
// //         <Link key={company.id} to={`/`}>
// //           <Button variant="outlined">{company.name}</Button>
// //         </Link>
// //       ))}
// //     </div>
// //   );
// // }

// // export default Company;


// import React, { useEffect, useState } from 'react';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { axiosCompanyInstance } from 'src/api/api';

// function Company() {
//   const [companies, setCompanies] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem('token')).access;
//         const response = await axiosCompanyInstance.get('/companies/login', {
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
//     localStorage.setItem('selectedCompany', JSON.stringify(company));
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

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { axiosCompanyInstance } from 'src/api/api';

function Company() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token')).access;
        const response = await axiosCompanyInstance.get('/companies/login', {
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
    localStorage.setItem('selectedCompany', JSON.stringify(company));
    navigate('/'); 
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
