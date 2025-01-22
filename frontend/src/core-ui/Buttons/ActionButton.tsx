import { Button } from "@mui/material";
import { ActionButtonProps } from "../../types/types";

export const ActionButton: React.FC<ActionButtonProps> = ({ step, handleNext, stepsLength }) => (
    <Button
      variant="contained"
      onClick={handleNext}
      sx={{ width: '395px', height: '40px', mt: 3, mb: 4, bgcolor: 'blue', textTransform: 'initial' }}
    >
      {step === stepsLength - 1 ? 'Create Research' : 'Next'}
    </Button>
  );