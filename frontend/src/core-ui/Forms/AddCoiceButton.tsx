import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

export function AddChoiceButton({handleAddChoice}: {handleAddChoice: () => void}) {
    return (
        <Box sx={{ width: '100%'}}>
             <Button
                onClick={handleAddChoice}
                variant="contained"
                sx={{
                    bgcolor: '#7199E6',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    mt: 2,
                    width: '158px',
                    height: '40px',
                    px: 2,
                    '&:hover': {
                        bgcolor: '#3b6cb7',
                    },
                }}
            >
                <Typography fontSize={14} fontWeight={400} lineHeight='22px' textAlign='center'>Add another choice</Typography>
            </Button>

            {/* Opciones adicionales */}
            <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel control={<Checkbox />} label="Show 'Other' option" />
                <FormControlLabel control={<Checkbox />} label="Randomize the order of questions" />
            </Box>
        </Box>
    )
}