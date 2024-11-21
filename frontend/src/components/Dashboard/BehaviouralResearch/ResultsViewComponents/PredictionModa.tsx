import { Box, Button, Checkbox, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import close from '../../../../assets/close.png';
import { ConfigurationPanelComponent } from "../../../../core-ui/ConfigurationPanelComponent";
import DiscardOptionsComponent from "../../../../core-ui/DiscardOptionsComponent";
import { HeatmapComponent } from "../../../../core-ui/HeatmapComponent";

export function PredictionModal({ handleClose }: { handleClose: () => void }) {
    return (
        <Stack sx={{
            position: 'absolute',
            zIndex: 10,
            top: '0px',
            bottom: '0px',
            right: '0px',
            left: '0px',
            bgcolor: 'rgba(128, 128, 128, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
                maxWidth: 1100,
                height: '100%',
                maxHeight: 840,
                bgcolor: 'white',
                borderRadius: 1,
                border: `1px solid #E0E0E0`,
            }}>
                <Box sx={{ width: '100%', borderBottom: `1px solid #E0E0E0`, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography m={2} color='#262626' fontWeight={500} fontSize={16}>Respondents ID’ settings</Typography>
                    <Button variant='text' sx={{ p: 0, m: 0 }} onClick={handleClose}>
                        <img src={close} alt='close' style={{ width: '14px' }} />
                    </Button>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 3.5
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        maxHeight: 840,
                        ml: 2,
                        mt: 2,
                    }}>
                        <ConfigurationPanelComponent />
                        <DiscardOptionsComponent />
                    </Box>

                    <Box>
                        <HeatmapComponent />
                        <RespondentTable />
                    </Box>
                </Box>
            </Box>
        </Stack>
    )
}

const data = [
    { id: '8623t587245972498592', calibration: 'Good', integrity: 'Poor' },
    { id: '86723487237950935930', calibration: 'Good', integrity: 'Regular' },
    { id: 'o0284579823743586034', calibration: 'Good', integrity: 'Good', selected: true },
    { id: '03856708240592374587', calibration: 'Good', integrity: 'Good' },
  ];
  
  const getStatusChip = (status: string) => {
    const colorMap: Record<string, { background: string; color: string }> = {
      Good: { background: '#DFF5DD', color: '#4CAF50' },
      Poor: { background: '#FFE5E6', color: '#FF5252' },
      Regular: { background: '#FFF4E5', color: '#FF9800' },
    };
  
    const { background, color } = colorMap[status] || { background: '#E0E0E0', color: '#9E9E9E' };
  
    return (
      <Chip
        label={status}
        sx={{
          backgroundColor: background,
          color: color,
          fontWeight: 'bold',
          height: '24px',
          fontSize: '0.875rem',
        }}
      />
    );
  };
  
  const RespondentTable: React.FC = () => {
    return (
      <TableContainer component={Paper} sx={{ overflowY: 'auto', maxHeight: 200, boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="respondent table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="default" />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">
                  Respondent ID
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" color="textSecondary" fontWeight="bold">
                  Calibr.
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2" color="textSecondary" fontWeight="bold">
                  Integ.
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} sx={{ backgroundColor: row.selected ? '#F4F6FA' : 'inherit' }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={row.selected || false}
                    sx={{
                      color: row.selected ? '#4A3AFF' : 'default',
                      '&.Mui-checked': {
                        color: '#4A3AFF',
                      },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textPrimary">
                    {row.id}
                  </Typography>
                </TableCell>
                <TableCell align="center">{getStatusChip(row.calibration)}</TableCell>
                <TableCell align="center">{getStatusChip(row.integrity)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };