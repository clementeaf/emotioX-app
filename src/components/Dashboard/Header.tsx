import { Toolbar, Typography, Box, IconButton, Badge, InputBase, Stack } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import Vector from "../../assets/Vector.png";
import avatar from '../../assets/avatar.png';

export default function Header() {
  return (
    <Stack sx={{ backgroundColor: '#FFFFF', color: '#000', borderBottom: `1px solid ${grey[200]}`, width: '1180px', height: '60px' }}>
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
        <img src={Vector} alt="vector" style={{ marginRight: '20px'}} />
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFF', border: `1px solid ${grey[200]}`, p: 1, borderRadius: 1, width: '100%' }}>
          <SearchIcon />
          <InputBase placeholder="Search" sx={{ width: '885px' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', ml: '100px' }}>
          <IconButton size="large" aria-label="show new notifications" color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Stack sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            ml: 2,
            gap: 1,
          }}>
            <img src={avatar} alt='avatar' style={{ width: '32px', }} />
            <Typography variant="body1" sx={{ p: 0 }}>
              Username
            </Typography>
          </Stack>
        </Box>
      </Toolbar>
    </Stack>
  );
}
