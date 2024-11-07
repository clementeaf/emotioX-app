import React, { useState } from "react";
import FormField from "./FormField";
import { Button, Container, LinearProgress, Typography } from "@mui/material";

export interface OptionObject {
  label: string;
  action: string;
}

export interface Progress {
  step: number;
  totalSteps: number;
  percentage: number;
}

export interface FieldConfig {
  id: string;
  type: string;
  content: string;
  options?: string[] | OptionObject[];  // Permitir ambos tipos para options
  images?: string[];
  scale?: number;
  buttonText: string;
  placeholder?: string;
  maxLength?: number;
  maxSelections?: number;
  progress?: Progress;
  icon?: string;
  imageUrl?: string;
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
      {/* Barra de progreso si existe */}
      {currentField.progress && (
        <LinearProgress
          variant="determinate"
          value={currentField.progress.percentage}
          sx={{ mb: 2 }}
        />
      )}

      {/* Título de la pregunta */}
      <Typography variant="h5" gutterBottom>
        {currentField.content}
      </Typography>

      {/* Renderizar FormField solo si el tipo es interactivo */}
      {["textField", "radio", "checkbox", "rating", "scale", "multiSelect", "textArea", "imageChoice", "prioritize"].includes(currentField.type) && (
        <FormField {...currentField} hideLabel />
      )}

      {/* Renderizar botón para avanzar */}
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

