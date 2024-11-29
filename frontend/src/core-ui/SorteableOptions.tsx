import React, { useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import { EligibilityInput } from "./ElegibilityInput";
// import { DndContext, closestCenter, useSensor, useSensors, PointerSensor, DragEndEvent } from "@dnd-kit/core";
// import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
import { useScreenerStore } from "../store/useScreenerStore";

export const SorteableOptions = React.memo(function SorteableOptions() {
  const {
    sorteableQuestions,
    addSorteableQuestion,
    updateSorteableQuestion,
    // setSorteableQuestionsOrder,
    questions,
  } = useScreenerStore();

  const questionType = questions[0]?.questionType || "Multiple choice";
  // const sensors = useSensors(useSensor(PointerSensor));

  // Manejar la reorganización de los elementos
  // const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
  //     if (!over || active.id === over.id) return;

  //     const oldIndex = sorteableQuestions.findIndex((item) => item.id === active.id);
  //     const newIndex = sorteableQuestions.findIndex((item) => item.id === over.id);

  //     if (oldIndex === -1 || newIndex === -1) return;

  //     const updatedOrder = arrayMove(sorteableQuestions, oldIndex, newIndex);
  //     setSorteableQuestionsOrder(updatedOrder);
  // }, [sorteableQuestions, setSorteableQuestionsOrder]);

  // Añadir una nueva opción
  const handleAddChoice = useCallback(() => {
    if (questionType === "Single choice" && sorteableQuestions.length >= 1) {
      return;
    }

    const newId = (sorteableQuestions.length + 1).toString();
    const newQuestion = {
      id: newId,
      option1: `Option ${newId}`,
      selection: ["Qualify", "Disqualify"],
      required: false,
    };
    addSorteableQuestion(newQuestion);
  }, [questionType, sorteableQuestions, addSorteableQuestion]);

  const handleDelete = useCallback(
    (id: string) => {
      if (!sorteableQuestions.some((q) => q.id === id)) {
        console.warn(`Question with ID ${id} not found.`);
        return;
      }

      // Usar el setter de Zustand para trabajar con el estado actual
      useScreenerStore.setState((state) => {
        const updatedSorteableQuestions = state.sorteableQuestions.filter((q) => q.id !== id);

        if (updatedSorteableQuestions.length === 1) {

          return {
            sorteableQuestions: updatedSorteableQuestions,
            questions: state.questions.map((q, index) =>
              index === 0 ? { ...q, questionType: "Single choice" } : q
            ),
          };
        }

        // Caso general: simplemente actualizamos sorteableQuestions
        return { sorteableQuestions: updatedSorteableQuestions };
      });
    },
    [sorteableQuestions]
  );



  const filteredQuestions =
    questionType === "Single choice" ? sorteableQuestions.slice(0, 1) : sorteableQuestions;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography color="#8C8C8C" fontSize={14} fontWeight={400} lineHeight="22px">
        Choices (Press ENTER for new line or paste a list)
      </Typography>
      {/* <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={filteredQuestions} strategy={verticalListSortingStrategy}> */}
      <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        {filteredQuestions.map((item) => (
          <SortableItem
            key={item.id}
            question={item}
            onUpdate={(updatedData) => updateSorteableQuestion(item.id, updatedData)}
            onDelete={() => handleDelete(item.id)}
            disableDelete={filteredQuestions.length === 1} // Nueva propiedad de control
          />
        ))}
      </Box>
      {/* </SortableContext>
            </DndContext> */}
      <AddChoiceButton
        handleAddChoice={handleAddChoice}
        disabled={questionType === "Single choice" && sorteableQuestions.length >= 1}
      />
    </Box>
  );
});

// Componente para cada opción
const SortableItem = React.memo(function SortableItem({
  question,
  onUpdate,
  onDelete,
  disableDelete,
}: {
  question: {
    id: string;
    option1: string;
    placeholder?: string; // Placeholder opcional
    selection: string[];
    required: boolean;
  };
  onUpdate: (updatedData: Partial<typeof question>) => void;
  onDelete: () => void;
  disableDelete: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        bgcolor: "#fff",
        p: 1,
        gap: 2,
        borderRadius: "4px",
        border: "1px solid #e0e0e0",
        width: "804px",
      }}
    >
      {/* Campo de texto con placeholder */}
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          variant="outlined"
          value={question.option1} // Siempre refleja el valor actual
          placeholder={question.placeholder || `Option`} // Placeholder dinámico
          onChange={(e) => onUpdate({ option1: e.target.value })} // Actualiza el estado
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: 14,
              "& fieldset": { borderColor: "#E0E0E0" },
            },
          }}
        />
      </Box>

      {/* Componente de selección */}
      <EligibilityInput
        value={question.selection[0]}
        onChange={(newEligibility) =>
          onUpdate({ selection: [newEligibility, ...question.selection.slice(1)] })
        }
      />

      {/* Botón de eliminación */}
      <Button
        sx={{ color: disableDelete ? "gray" : "red", ml: 2 }}
        onClick={disableDelete ? undefined : onDelete}
        disabled={disableDelete}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
});



function AddChoiceButton({
  handleAddChoice,
  disabled,
}: {
  handleAddChoice: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleAddChoice}
      disabled={disabled}
      sx={{ mt: 2 }}
    >
      Add Choice
    </Button>
  );
}
