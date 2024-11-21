import React from "react";
import { TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Checkbox, Rating, Box, Typography, Button } from "@mui/material";
import { useFormStore } from "../../store/useFormStore";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface OptionObject {
  label: string;
  action: string;
}

interface FormFieldProps {
  id: string;
  type: string;
  content: string;
  options?: string[] | OptionObject[];
  images?: string[];
  scale?: number;
  placeholder?: string;
  maxLength?: number;
  maxSelections?: number;
  hideLabel?: boolean;
  progress?: {
    step: number;
    totalSteps: number;
    percentage: number;
  };
  icon?: string;
  imageUrl?: string;
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
              {options?.map((option, index) => (
                <FormControlLabel
                  key={typeof option === "string" ? option : `option-${index}`}
                  value={typeof option === "string" ? option : (option as unknown as { value: string }).value || ''}
                  control={<Radio />}
                  label={typeof option === "string" ? option : (option as unknown as { label: string }).label || ''}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case "checkbox":
        return (
          <FormControl component="fieldset" margin="normal">
            {!hideLabel && <FormLabel component="legend">{content}</FormLabel>}
            {options?.map((option, index) => (
              <FormControlLabel
                key={typeof option === "string" ? option : `option-${index}`}
                control={
                  <Checkbox
                    checked={(responses[id] as string[])?.includes(typeof option === "string" ? option : (option as unknown as { value: string }).value || '') || false}
                    onChange={() => handleCheckboxChange(typeof option === "string" ? option : (option as unknown as { value: string }).value || '')}
                  />
                }
                label={typeof option === "string" ? option : (option as unknown as { label: string }).label || ''}
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
                <FormControlLabel key={index} value={typeof option === 'string' ? option : (option as { label: string }).label} control={<Radio />} label={typeof option === 'string' ? option : (option as { label: string }).label} />
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
                  key={typeof option === 'string' ? option : (option as { label: string }).label}
                  variant={(responses[id] as string[])?.includes(typeof option === 'string' ? option : (option as { label: string }).label) ? "contained" : "outlined"}
                  color={(responses[id] as string[])?.includes(typeof option === 'string' ? option : (option as { label: string }).label) ? "primary" : "inherit"}
                  onClick={() => handleCheckboxChange(typeof option === 'string' ? option : (option as { label: string }).label)}
                  size="small">
                  {typeof option === 'string' ? option : (option as { label: string }).label}
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

      case "classification":
        return (
          <Typography variant="h4" align="center">
            {content}
          </Typography>
        );

      case "feedback":
        return (
          <Typography variant="h4" align="center" color={content === "oops!" ? "error" : "success"}>
            {content}
          </Typography>
        );

      case "instruction":
        return (
          <Box>
            <Typography variant="body1" paragraph>
              {content}
            </Typography>
            <Box display="flex" justifyContent="center" gap={2}>
              {(options as OptionObject[]).map(({ label }) => (
                <Button key={label} variant="contained">
                  {label}
                </Button>
              ))}
            </Box>
          </Box>
        );

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
