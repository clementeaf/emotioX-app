import { Stack, Typography } from "@mui/material";
import { ClientSelector } from "../../../core-ui/Selectors/ClientSelector";

export function TopRow() {
    return (
      <Stack sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        width: '1115px',
      }}>
        <Typography fontWeight={600} fontSize={16} lineHeight='24px' color='#262626' width='200px'>Research History</Typography>
        <Stack sx={{
          width: '823px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}>
          <Typography fontWeight={400} fontSize={14} lineHeight='22px' color='#262626' width='100%'>The performance of recent customer’ studies based on the Perceived Value Map (cost-benefit) benchmark</Typography>
          <ClientSelector />
        </Stack>
      </Stack>
    )
  }