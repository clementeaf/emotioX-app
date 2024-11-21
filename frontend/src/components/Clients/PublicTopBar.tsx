import { Box, Typography } from "@mui/material";
import happyFace from "../../assets/happyFace.png";
import CustomDropdown from "../../core-ui/Selectors/CustomDropdown";

export function PublicTopBar() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            height: '64px',
            bgcolor: '#4318FF',
            color: 'white',
        }}>
            <Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><img src={happyFace} alt='happyFace' style={{ width: '21.53px', marginRight: '10px' }}/>Emotio<p style={{ fontWeight: 'lighter', marginLeft: '4px', color: 'whitesmoke' }}>X</p></Typography>
            <Typography>This is a preview. Your response will not be saved.</Typography>
            <CustomDropdown />
        </Box>
    )
}