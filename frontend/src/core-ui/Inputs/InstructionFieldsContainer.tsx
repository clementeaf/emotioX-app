import React, { useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export interface InstructionFieldProps {
  id: number;
  label: string;
  placeholder: string;
  maxChars: number;
  value: string;
  onChange: (value: string) => void;
}

export function InstructionFieldsContainer({
  textAreas,
}: {
  textAreas: InstructionFieldProps[];
}) {
  useEffect(() => {
    // Cargar datos persistentes desde localStorage
    const savedData = localStorage.getItem("textAreas");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.forEach((field: any) => {
        const existingField = textAreas.find((ta) => ta.id === field.id);
        if (existingField) {
          existingField.onChange(field.value);
        }
      });
    }
  }, []);

  useEffect(() => {
    // Guardar datos en localStorage cada vez que cambian los valores
    const dataToPersist = textAreas.map((field) => ({
      id: field.id,
      value: field.value,
    }));
    localStorage.setItem("textAreas", JSON.stringify(dataToPersist));
  }, [textAreas]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        ml: 2,
        width: "100%",
        maxWidth: "798px",
        alignItems: "flex-start",
      }}
    >
      {textAreas.map((field) => (
        <InstructionField
          key={field.id}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
          maxChars={field.maxChars}
          value={field.value}
          onChange={field.onChange}
        />
      ))}
    </Box>
  );
}

function InstructionField({
  label,
  placeholder,
  maxChars,
  value,
  onChange,
}: InstructionFieldProps) {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= maxChars) {
      onChange(inputText);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
      <Typography sx={{ fontSize: 14, fontWeight: 500, color: grey[900] }}>
        {label}
      </Typography>
      <TextField
        multiline
        minRows={4}
        maxRows={6}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={handleTextChange}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            padding: 1,
            "& textarea": {
              fontSize: 14,
              color: grey[700],
              opacity: 0.8,
            },
          },
        }}
      />
      <Typography
        sx={{ fontSize: 12, color: grey[500], placeSelf: "flex-end" }}
      >
        {value.length} / {maxChars}
      </Typography>
    </Box>
  );
}
