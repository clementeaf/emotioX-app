import { Box, Typography } from "@mui/material";
import { TechniqueDescription } from "./Forms/TechniqueDescription";
import { TitleRow } from "./Forms/TitleRow";
import { QuestionTitleInput } from "./Forms/QuestionTitleInput";
import { SorteableOptions } from "./SorteableOptions";

export function ScreenerScreenContainer() {
    return (
      <Box sx={{
        display: 'flex',
        maxWidth: 1134,
        height: '100%',
        gap: 3,
      }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
            maxWidth: '844px',
            bgcolor: 'white',
            height: 'auto',
            maxHeight: '580px',
        }}>
            <TitleRow title='1.0.- Screener' />
            <Box sx={{ width: '100%', maxWidth: '804px', mt: 2 }}>
              <Box sx={{ width: '100%', height: 'auto', px: 2 }}>
                <Typography sx={{ fontWeight: 400, fontSize: 14, lineHeight: '22px', mb: 2,}}>1.1.- Question _italic_ **bold** - bullet list 1. ordered list</Typography>
                <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
                <SorteableOptions />
              </Box>
            </Box>
        </Box>
        <TechniqueDescription />
      </Box>
    )
  }