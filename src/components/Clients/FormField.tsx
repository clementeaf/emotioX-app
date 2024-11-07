import React from "react";
import { TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Checkbox, Rating, Box, Typography, Button } from "@mui/material";
import { useFormStore } from "../../store/useFormStore";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface FormFieldProps {
  id: string;
  type: string;
  content: string;
  options?: string[];
  images?: string[];
  scale?: number;
  placeholder?: string;
  maxLength?: number;
  maxSelections?: number;
  hideLabel?: boolean;  // Nuevo prop para controlar la visibilidad del FormLabel
}

const FormField: React.FC<FormFieldProps> = ({ id, type, content, options, images, scale, placeholder, maxLength, maxSelections, hideLabel }) => {
  const { responses, setResponse } = useFormStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(id, event.target.value);
  };

  const handleCheckboxChange = (option: string) => {
    const currentValues = Array.isArray(responses[id]) ? (responses[id] as string[]) : [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((val) => val !== option)
      : [...currentValues, option];

    if (!maxSelections || newValues.length <= maxSelections) {
      setResponse(id, newValues);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const currentOptions = (responses[id] as string[]) || options || [];
    const reorderedOptions = Array.from(currentOptions);
    const [movedItem] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, movedItem);
    setResponse(id, reorderedOptions);
  };

  const renderFieldContent = () => {
    switch (type) {
      case "textField":
        return (
          <TextField
            label={!hideLabel ? content : undefined}
            value={responses[id] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        );

      case "radio":
        return (
          <FormControl component="fieldset" margin="normal">
            {!hideLabel && <FormLabel component="legend">{content}</FormLabel>}
            <RadioGroup value={responses[id] || ""} onChange={handleChange}>
              {options?.map((option) => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "checkbox":
        return (
          <FormControl component="fieldset" margin="normal">
            {!hideLabel && <FormLabel component="legend">{content}</FormLabel>}
            {options?.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={(responses[id] as string[])?.includes(option) || false}
                    onChange={() => handleCheckboxChange(option)}
                  />
                }
                label={option}
              />
            ))}
          </FormControl>
        );

      case "rating":
        return (
          <Box component="fieldset" borderColor="transparent" margin="normal">
            {!hideLabel && <FormLabel component="legend">{content}</FormLabel>}
            <Rating
              name={id}
              value={typeof responses[id] === "number" ? responses[id] : 0}
              onChange={(_, value) => setResponse(id, value || 0)}
              max={scale || 5}
            />
          </Box>
        );

      case "scale":
        return (
          <FormControl component="fieldset" margin="normal">
            {!hideLabel && <FormLabel component="legend">{content}</FormLabel>}
            <RadioGroup value={responses[id] || ""} onChange={handleChange} row>
              {options?.map((option, index) => (
                <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "multiSelect":
        return (
          <FormControl component="fieldset" margin="normal">
            {!hideLabel && <FormLabel component="legend">{content}</FormLabel>}
            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
              {options?.map((option) => (
                <Button
                  key={option}
                  variant={(responses[id] as string[])?.includes(option) ? "contained" : "outlined"}
                  color={(responses[id] as string[])?.includes(option) ? "primary" : "inherit"}
                  onClick={() => handleCheckboxChange(option)}
                  size="small"
                >
                  {option}
                </Button>
              ))}
            </Box>
          </FormControl>
        );

      case "textArea":
        return (
          <TextField
            label={!hideLabel ? content : undefined}
            placeholder={placeholder}
            value={responses[id] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            inputProps={{ maxLength }}
          />
        );

      case "imageChoice":
        return (
          <Box>
            {!hideLabel && <FormLabel component="legend">{content}</FormLabel>}
            <Box display="flex" gap={2} mt={1}>
              {images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`option-${index}`}
                  onClick={() => setResponse(id, image)}
                  style={{
                    border: responses[id] === image ? "2px solid blue" : "1px solid gray",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100px",
                    height: "auto"
                  }}
                />
              ))}
            </Box>
          </Box>
        );

      case "prioritize":
        return (
          <Box margin="normal">
            {!hideLabel && <FormLabel component="legend">{content}</FormLabel>}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="options">
                {(provided) => (
                  <Box ref={provided.innerRef} {...provided.droppableProps}>
                    {(responses[id] as string[] || options)?.map((option, index) => (
                      <Draggable key={option} draggableId={option} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              padding: 1,
                              marginBottom: 1,
                              border: "1px solid #ccc",
                              borderRadius: 2,
                            }}
                          >
                            <Typography variant="body2">{index + 1}. {option}</Typography>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        );

      case "text":
        return <Typography variant="body1">{content}</Typography>;

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "300px",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      {renderFieldContent()}
    </Box>
  );
};

export default FormField;
