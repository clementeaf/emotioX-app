import { Box, Typography } from '@mui/material'
import InvestigationTitleRequirement from '../../../../core-ui/Forms/InvestigationTitleRequirement'
import { FormSorteableWithMultipleImg, FormSorteableWithSwitch, FormSorteableWithSwitchNoImg, LinearScaleForm } from '../../../../core-ui/Forms/FormSorteable'
import { SingleForm } from '../../../../core-ui/Forms/SingleForm'

export default function CognitiveTaskView() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 3 }}>
      <Box sx={{ display: 'flex', width: '845px', bgcolor: 'white', flexDirection: 'column', pb: 2 }}>
        <InvestigationTitleRequirement
          title='6.0.- Cognitive task'
        />
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{
              opacity: 0.45,
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '22px',
              width: '100%'
            }}
          >
            In this section you can go deeper in the understanding of the participants by using declarative questions oriented to the working memory and comprhension of the previous elements exposed
          </Typography>
        </Box>
        <SingleForm
          question="6.1.- Question _italic_ **bold** - bullet list 1. ordered list"
          isRequired={true}
          showConditionally={true}
          placeholder="Ask something"
          fileUploadLabel="Click to Upload"
          deviceFrameOptions={['No Frame', 'Device Frame']}
        />
        <SingleForm
          question="6.2.- Question _italic_ **bold** - bullet list 1. ordered list"
          isRequired={true}
          showConditionally={true}
          placeholder="Ask something"
          fileUploadLabel="Click to Upload"
          deviceFrameOptions={['No Frame', 'Device Frame']}
        />
        <FormSorteableWithSwitch question='6.3.- Question _italic_ **bold** - bullet list 1. ordered list' />
        <FormSorteableWithSwitch question='6.4.- Question _italic_ **bold** - bullet list 1. ordered list' />
        <LinearScaleForm
          question="6.5.- Question _italic_ **bold** - bullet list 1. ordered list"
          isRequired={true}
          fileUploadLabel="Click to Upload"
          deviceFrameOptions={['No Frame', 'Device Frame']}
        />
        <FormSorteableWithSwitchNoImg question='6.6.- Question _italic_ **bold** - bullet list 1. ordered list' />
        <FormSorteableWithMultipleImg question='6.7.- Question _italic_ **bold** - bullet list 1. ordered list' />
        <FormSorteableWithMultipleImg question='6.8.- Question _italic_ **bold** - bullet list 1. ordered list' />
      </Box>
    </Box>
  )
}