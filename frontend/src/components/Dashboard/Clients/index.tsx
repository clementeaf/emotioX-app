import { Box, Typography } from "@mui/material";
import Breadcrumb from "../../Breadcrumb";
import back from '../../../assets/back.png';
import { ChatMessage } from "./ChatMessage";

export default function Clients() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      gap: 2,
    }}>
      <Breadcrumb />

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',gap: 2, width: '100%', maxWidth: 1134 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={back} alt="back" />
          <Typography>Clients</Typography>
        </Box>
        <ChatMessage
          name="Universidad del Desarrollo"
          message="What is the best design in the dimension of Affordance & Signifiers' benchmark?"
        />
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 2,
        width: '100%',
        maxWidth: 1134,
        height: '100%',
        maxHeight: 678,
      }}>
        {/** Colored Plot Chart */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          width: '100%',
          maxWidth: 768,
          height: '100%',
          maxHeight: 627,
          bgcolor: 'white',
          border: `1px solid ${'#E0E0E0'}`,
          borderRadius: 1,
        }}>
        </Box>

        {/** Text Column */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          width: '100%',
          maxWidth: 343,
          height: '100%',
          maxHeight: 627,
          bgcolor: 'white',
          border: `1px solid ${'#E0E0E0'}`,
          borderRadius: 1,
        }}>
        </Box>
      </Box>
      
      {/** ADS */}
      <Box sx={{ width: 1134, height: 281, bgcolor: 'lightblue', borderRadius: 2}}></Box>

      {/** Latest Projects */}
      <Box sx={{ width: 1134, height: 340, bgcolor: 'white', borderRadius: 2, border: `1px solid ${'#E0E0E0'}`}}></Box>
    </Box>
  )
}
