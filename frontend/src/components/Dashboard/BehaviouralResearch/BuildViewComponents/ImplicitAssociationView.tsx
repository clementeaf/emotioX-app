import { Box, Typography, Button, Alert } from "@mui/material";
import InvestigationTitleRequirement from "../../../../core-ui/Forms/InvestigationTitleRequirement";
import { useImplicitAssociationStore } from "../../../../store/useImplicitAssociationStore";
import { ImageCardUploaderContainer } from "../../../../core-ui/Cards/ImageCardUploaderContainer";
import { InstructionFieldsContainer } from "../../../../core-ui/Inputs/InstructionFieldsContainer";
import TestConfiguration from "../../../../core-ui/TestConfiguration";
import { useState } from "react";

export default function ImplicitAssociationView() {
    const required = useImplicitAssociationStore((state) => state.required);
    const setRequired = useImplicitAssociationStore((state) => state.setRequired);

    const targets = useImplicitAssociationStore((state) => state.targets);
    const updateTargetName = useImplicitAssociationStore((state) => state.updateTargetName);
    const updateTargetImage = useImplicitAssociationStore((state) => state.updateTargetImage);

    const textAreas = useImplicitAssociationStore((state) => state.textAreas);
    const updateTextArea = useImplicitAssociationStore((state) => state.updateTextArea);

    const testConfigurations = useImplicitAssociationStore((state) => state.testConfigurations);
    const toggleTestConfiguration = useImplicitAssociationStore((state) => state.toggleTestConfiguration);

    const [error, setError] = useState<string | null>(null);

    const validateData = (): boolean => {
        if (!required) {
            setError(null);
            return true; // Si no es requerido, no hay validaciones adicionales.
        }

        if (
            !targets.every((target) => target.nameOfObject.trim() && target.imageUploaded) ||
            !textAreas.every((area) => area.value.trim())
        ) {
            setError("All targets must have a name and an uploaded image. All text areas must be filled.");
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = () => {
        if (!validateData()) return;

        const preparedData = required
            ? {
                targets: targets.map((target) => ({
                    id: target.id,
                    nameOfObject: target.nameOfObject,
                    imageUploaded: target.imageUploaded?.name ?? null,
                    imageFormat: target.imageFormat,
                })),
                textAreas: textAreas.map((area) => ({
                    id: area.id,
                    value: area.value,
                })),
                testConfigurations: testConfigurations.filter((config) => config.checked),
            }
            : {};

        console.log("Datos enviados al backend:", preparedData);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 3, minHeight: "100vh", alignItems: "flex-start" }}>
            <Box sx={{ display: "flex", width: "845px", bgcolor: "white", flexDirection: "column", pb: 2 }}>
                {/* Required Toggle */}
                <InvestigationTitleRequirement
                    title="3.0.- Implicit Association"
                    required={required}
                    onToggleRequired={setRequired}
                />

                <Box sx={{ p: 2 }}>
                    <Typography
                        sx={{
                            opacity: 0.45,
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: "22px",
                            width: "100%",
                        }}
                    >
                        Our Implicit Association Test is fully automated technology. You just need to add objects or attributes to be
                        tested.
                    </Typography>
                </Box>

                {/* Target Cards */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 3,
                        width: "100%",
                        ml: 2,
                        alignItems: "flex-start",
                    }}
                >
                    {targets.map((target) => (
                        <ImageCardUploaderContainer
                            key={target.id}
                            id={target.id}
                            nameOfObject={target.nameOfObject}
                            imageUploaded={target.imageUploaded}
                            imageFormat={target.imageFormat}
                            onNameChange={(name) => updateTargetName(target.id, name)}
                            onImageUpload={(id, file) => updateTargetImage(id, file)}
                        />

                    ))}
                </Box>

                {/* Text Areas */}
                <Box sx={{ mt: 4 }}>
                    <InstructionFieldsContainer
                        textAreas={textAreas.map((area) => ({
                            id: area.id,
                            label: area.label,
                            placeholder: "Enter text here...",
                            maxChars: 100,
                            value: area.value,
                            onChange: (value) => updateTextArea(area.id, value),
                        }))}
                    />

                </Box>

                {/* Test Configurations */}
                <Box sx={{ mt: 4 }}>
                    <TestConfiguration
                        options={testConfigurations}
                        onToggleOption={toggleTestConfiguration}
                    />
                </Box>

                {/* Error Alert */}
                {error && (
                    <Box sx={{ mt: 2 }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}

                {/* Submit Button */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
