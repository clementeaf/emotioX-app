import { Box, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useLocation, Link } from 'react-router-dom';
import homeIcon from '../assets/Home.png';

export default function Breadcrumb() {
  const location = useLocation();

  const pathNames: { [key: string]: string } = {
    dashboard: 'Dashboard',
    newResearch: 'New Research',
    'attention-prediction': 'Prediction of visual attention',
    'UserEmotion-team': "UserEmotion's Team",
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <Stack
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 1,
        bgcolor: 'white',
        height: '40px',
        minHeight: '40px',  // Asegura una altura mínima de 40px
        border: `1px solid ${grey[200]}`,
        pl: 2,
        py: 1,
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={homeIcon} alt="Home icon" style={{ height: '20px', width: '20px', marginBottom: '0px' }} />
      </Box>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
                fontWeight={200}
                color={isLast ? grey[700] : grey[500]}
                fontSize={14}
                px={1}
              >
                {isLast ? (
                  pathNames[segment] || segment
                ) : (
                  <Link to={path} style={{ textDecoration: 'none', color: grey[500] }}>
                    {pathNames[segment] || segment}
                  </Link>
                )}
              </Typography>
              {!isLast && <Typography sx={{ color: grey[500] }}>/</Typography>}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
}
