import { Box, FormControlLabel, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AntSwitch } from "../Switch";

export function TitleRow({title}: {title: string}) {
    return (
        <Box sx={{
            width: '100%',
            height: '54px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${grey[300]}`,
        }}>
            <Typography ml={2}>{title}</Typography>
            <FormControlLabel
                sx={{ mr: 2 }}
                control={<AntSwitch />}
                label={<Typography fontSize='14px' fontWeight={400} color='#8C8C8C'>Required</Typography>}
                labelPlacement="start"
                />
        </Box>
    )
}
