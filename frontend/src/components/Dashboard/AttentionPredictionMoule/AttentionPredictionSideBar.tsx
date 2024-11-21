import { Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import logoWhite from '../../../assets/logoWhite.png';
import imageSelected from '../../../assets/imageSelected.png';
import imageNotSelected from '../../../assets/imageNotSelected.png';
import { useBehaviouralResearchStore } from '../../../store/useBehaviouralResearchStore';

export default function AttentionPredictionSideBar() {
  const tasks = useBehaviouralResearchStore((state) => state.tasks);
  const setHighlightedTask = useBehaviouralResearchStore((state) => state.setHighlightedTask);

  return (
    <Box sx={{ width: 250, backgroundColor: 'white', borderRight: `1px solid ${grey[200]}`, p: 2 }}>
      <Typography fontWeight={700} fontSize="14px" mb={2} color="#252BE6" align="center">
        Attention prediction results
      </Typography>
      <div style={{ height: '1px', width: '90%', backgroundColor: "#252BE6", margin: 'auto' }} />

      <Typography variant="body2" color={grey[500]} mb={2} mt={3} ml={1}>
        Images to predict
      </Typography>

      <List sx={{ width: '220px' }}>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            component="li"
            onClick={() => setHighlightedTask(task.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: task.isHighlighted ? "#252BE6" : grey[800],
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
            <ListItemText primary={task.label} />
            <img
              src={task.isHighlighted ? imageSelected : imageNotSelected}
              alt={task.isHighlighted ? 'Selected Icon' : 'Not Selected Icon'}
              style={{ width: '16px' }}
            />
          </ListItem>
        ))}
      </List>

      {/* Sección final con botón */}
      <Box mt={4} textAlign="center" width="170px" bgcolor="blue" p={2} borderRadius={1}>
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
