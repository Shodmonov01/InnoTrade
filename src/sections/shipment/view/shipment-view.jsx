

// import { useState } from 'react';
// import { Button, Card, Stack, Typography, Container } from '@mui/material';
// import { PiMicrosoftExcelLogo } from 'react-icons/pi';
// import ShipmentTab from '../ShipmentTab';
// import ShipmentHistoryTab from '../ShipmentHistoryTab';


// const tabs = ['Отгрузить', 'История отгрузок'];

// export default function ShipmentView() {
//   const [currentTab, setCurrentTab] = useState('Отгрузить');

//   const handleTabChange = (tab) => {
//     setCurrentTab(tab);
//   };

//   return (
//     <Container>
//       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//         <Typography variant="h4">Отгрузки</Typography>
// {/* 
//         <Button variant="contained" color="inherit" startIcon={<PiMicrosoftExcelLogo />}>
//           Экспорт в EXCEL
//         </Button> */}
//       </Stack>

//       <Card className="p-4 flex gap-4 mb-5">
//         {tabs.map((tab) => (
//           <Button key={tab} variant="contained" color="inherit" onClick={() => handleTabChange(tab)}>
//             {tab}
//           </Button>
//         ))}
//       </Card>

//       {currentTab === 'Отгрузить' ? <ShipmentTab /> : <ShipmentHistoryTab />}
//     </Container>
//   );
// }


import { useState } from 'react';
import { Button, Card, Stack, Typography, Container, Tabs, Tab, Box } from '@mui/material';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import ShipmentTab from '../ShipmentTab';
import ShipmentHistoryTab from '../ShipmentHistoryTab';

export default function ShipmentView() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Отгрузки</Typography>
      </Stack>

      <Card className="p-4 mb-5 ">
        <Tabs className='w-1/2' value={currentTab} onChange={handleTabChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
          <Tab label="Отгрузить" />
          <Tab label="История отгрузок" />
        </Tabs>
      </Card>

      <Box mt={2}>
        {currentTab === 0 ? <ShipmentTab /> : <ShipmentHistoryTab />}
      </Box>
    </Container>
  );
}
