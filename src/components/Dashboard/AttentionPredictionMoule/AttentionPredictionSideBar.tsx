import { Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import logoWhite from '../../assets/logoWhite.png';
import imageSelected from '../../assets/imageSelected.png';
import imageNotSelected from '../../assets/imageNotSelected.png';

const images = ['Image 001', 'Image 002', 'Image 003', 'Image 004'];

export default function AttentionPredictionSideBar() {
  const [selectedImage, setSelectedImage] = useState('Image 001');

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Box sx={{ width: 250, backgroundColor: 'white', borderRight: `1px solid ${grey[200]}`, p: 0 }}>
      <Typography fontWeight={700} fontSize='14px' mb={2} mr={3} color="#252BE6" align="center">
        Attention prediction results
      </Typography>
      <div style={{ height: '1px', width: '90%', backgroundColor: "#252BE6" }} />

      <Typography variant="body2" color={grey[500]} mb={2} mt={3} ml={1}>
        Images to predict
      </Typography>

      <List>
        {images.map((image, index) => (
          <ListItem
            key={index}
            component="li"
            onClick={() => handleImageSelect(image)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: selectedImage === image ? "#252BE6" : grey[800],
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '22px',
              borderBottom: `1px solid ${grey[200]}`,
              '&:hover': {
                color: 'primary.main',
              },
              padding: '8px 16px',
              backgroundColor: 'transparent',
            }}
          >
            <ListItemText primary={image} />
            <img
              src={selectedImage === image ? imageSelected : imageNotSelected}
              alt={selectedImage === image ? 'Selected Icon' : 'Not Selected Icon'}
              style={{ width: '16px' }}
            />
          </ListItem>
        ))}
      </List>

      {/* Sección final con botón */}
      <Box mt={4} textAlign="center" width='170px' bgcolor='blue' p={2}>
        <img src={logoWhite} alt="Logo" style={{ width: '118.36px' }} />
        <Typography fontWeight={400} fontSize={13} color={grey[400]} my={0.5}>
          Research’s view saved and ready to share with client
        </Typography>
        <Button variant="contained" color="primary" fullWidth>
          <Typography textTransform="initial">Share report</Typography>
        </Button>
      </Box>
    </Box>
  );
}
