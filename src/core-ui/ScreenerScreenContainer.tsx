import { Box, Typography } from "@mui/material";
import { TechniqueDescription } from "./Forms/TechniqueDescription";
import { TitleRow } from "./Forms/TitleRow";
import { QuestionTitleInput } from "./Forms/QuestionTitleInput";

export function ScreenerScreenContainer() {
    return (
      <Box sx={{
        display: 'flex',
        gap: 3,
      }}>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
        }}>
            <TitleRow title='1.0.- Screener' />
            <Typography sx={{ fontWeight: 400, fontSize: 14, lineHeight: '22px'}}>1.1.- Question _italic_ **bold** - bullet list 1. ordered list</Typography>
            <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => { }} onQuestionTypeChange={() => { }} onRequiredToggle={() => { }} />
        </Box>
        <TechniqueDescription />
      </Box>
    )
  }