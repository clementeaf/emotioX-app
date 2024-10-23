import React from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

interface CustomCardProps {
  title: string;
  status: string;
  percentage: number;
  description: string;
  bgColor: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, status, percentage, description, bgColor }) => {
  return (
    <Card sx={{ backgroundColor: bgColor, borderRadius: 2, width: '368px', height: '138px', p: 2, color: 'white', position: 'relative' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        {/* Parte superior: título e indicador */}
        <Box>
          <Typography variant="body1" fontWeight={400} sx={{ fontSize: '18px' }}>
            {title}
          </Typography>
          <Typography variant="h3" fontWeight={700} sx={{ fontSize: '32px', mt: 1 }}>
            {status}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '16px', mt: 2 }}>
            {description}
          </Typography>
        </Box>

        <Box sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', display: 'inline-flex' }}>
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={100}
            thickness={6}
            sx={{
                color: 'white',
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" component="div" color="white" fontSize={28}>
              {`${percentage}%`}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
