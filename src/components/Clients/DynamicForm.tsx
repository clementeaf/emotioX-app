import React, { useState } from "react";
import FormField from "./FormField";
import { Button, Container, Typography } from "@mui/material";

interface FieldConfig {
  id: string;
  type: string;
  content: string;
  options?: string[];
  images?: string[];
  scale?: number;
  buttonText: string;
  placeholder?: string;
  maxLength?: number;
  maxSelections?: number;
}

interface DynamicFormProps {
  formConfig: FieldConfig[];
  onSubmit: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formConfig, onSubmit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < formConfig.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onSubmit();
    }
  };

  const currentField = formConfig[currentIndex];

  return (
    <Container maxWidth="sm">
      {/* Título de la pregunta */}
      <Typography variant="h5" gutterBottom>
        {currentField.content}
      </Typography>

      {/* Renderizar FormField solo si el tipo no es "text" */}
      {currentField.type !== "text" && (
        <FormField {...currentField} hideLabel />
      )}

      {/* Botón de continuación */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleNext} 
        fullWidth 
        sx={{ mt: 2 }}
      >
        {currentField.buttonText || "Next"}
      </Button>
    </Container>
  );
};

export default DynamicForm;
