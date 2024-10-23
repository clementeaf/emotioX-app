import { Box } from '@mui/material'
import FormNameAndEnable from '../../../core-ui/Forms/FormNameAndEnable'
import FormSorteable from '../../../core-ui/Forms/FormSorteable'

export default function index() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
      bgcolor: 'white',
    }}>
      <FormNameAndEnable />
      <FormSorteable />
    </Box>
  )
}
