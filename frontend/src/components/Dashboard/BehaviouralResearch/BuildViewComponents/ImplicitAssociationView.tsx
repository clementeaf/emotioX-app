import { Box, Typography } from "@mui/material";
import InvestigationTitleRequirement from "../../../../core-ui/Forms/InvestigationTitleRequirement";
import { useImplicitAssociationStore } from "../../../../store/useImplicitAssociationStore";
import { ImageCardUploaderContainer } from "../../../../core-ui/Cards/ImageCardUploaderContainer";
import { DimensionsInput } from "../../../../core-ui/Inputs/DimensionsInput";
import { CriteriaTable } from "../../../../core-ui/Tables/CriteriaTable";
import { InstructionFieldsContainer } from "../../../../core-ui/Inputs/InstructionFieldsContainer";
import TestConfiguration from "../../../../core-ui/TestConfiguration";

export default function ImplicitAssociationView() {
    const targets = useImplicitAssociationStore((state) => state.targets);
    const updateTargetImage = useImplicitAssociationStore((state) => state.updateTargetImage);
    const updateTargetTitleAssigned = useImplicitAssociationStore((state) => state.updateTargetTitleAssigned);
    const { sectionTitle, inputsAttributes } = useImplicitAssociationStore((state) => state.dimensionsName);
    const setDimensionInputData = useImplicitAssociationStore((state) => state.setDimensionInputData);
    const criteria = useImplicitAssociationStore((state) => state.criteria[0]);
    const setTimeSelection = useImplicitAssociationStore((state) => state.setTimeSelection);
    const updateTableData = useImplicitAssociationStore((state) => state.updateTableData);
    const toggleShowResults = useImplicitAssociationStore((state) => state.toggleShowResults);
    const excersiceInstructions = useImplicitAssociationStore((state) => state.excersiceInstructions);
    const testInstructions = useImplicitAssociationStore((state) => state.testInstructions);
    const setExerciseInstructions = useImplicitAssociationStore((state) => state.setExerciseInstructions);
    const setTestInstructions = useImplicitAssociationStore((state) => state.setTestInstructions);
    const testConfiguration = useImplicitAssociationStore((state) => state.testConfiguration);
    const setTestConfiguration = useImplicitAssociationStore((state) => state.setTestConfiguration);

    // Image Upload Handler
    const handleImageUpload = (id: number, file: File, format: string) => {
        updateTargetImage(id, file, format);
    };

    const handleSelectionChange = (id: number, selection: boolean) => {
        const updatedConfig = {
            ...testConfiguration,
            checkboxsSelection: testConfiguration.checkboxsSelection.map((option) =>
                option.id === id ? { ...option, selection } : option
            ),
        };
        setTestConfiguration(updatedConfig);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 3, minHeight: '100vh', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', width: '845px', bgcolor: 'white', flexDirection: 'column', pb: 2 }}>
                <InvestigationTitleRequirement
                    title='3.0.- Implicit Association'
                />
                <Box sx={{ p: 2 }}>
                    <Typography
                        sx={{
                            opacity: 0.45,
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: '22px',
                            width: '100%'
                        }}
                    >
                        Our Implicit Association Test is fully automated technology. You just need to do is add objects or attributes to be tested.
                    </Typography>
                </Box>

                {/* Objects Cards Container */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3,
                    width: '100%',
                    ml: 2,
                    alignItems: 'flex-start'
                }}>
                    {/* Object Card */}
                    {targets.map((target) => {
                        const { id, text, title, nameOfObject, titleAssigned, imageUploaded } = target;
                        return (
                            <ImageCardUploaderContainer
                                key={id}
                                id={id}
                                title={title}
                                text={text}
                                nameOfObject={nameOfObject}
                                titleAssigned={titleAssigned}
                                imageUploaded={imageUploaded}
                                updateTargetTitleAssigned={updateTargetTitleAssigned}
                                handleImageUpload={handleImageUpload}
                            />
                        )
                    })}
                </Box>

                <Box sx={{ width: '804px', height: '106px', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
                    <DimensionsInput
                        sectionTitle={sectionTitle}
                        inputsAttributes={inputsAttributes}
                        onInputChange={(id: number, value: string) => setDimensionInputData(id, value)}
                    />
                </Box>

                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    mt: 4,
                }}>
                    <CriteriaTable
                        timeSelection={criteria.timeSelection}
                        table={criteria.table}
                        showResults={criteria.showResults}
                        onTimeSelectionChange={(time) => setTimeSelection(time)}
                        onEditCell={(columnName, index, value) => {
                            const column = criteria.table.find((col) => col.columnName === columnName);
                            if (column) {
                                const updatedData = column.columnData.map((item, i) =>
                                    i === index ? value : item
                                );
                                updateTableData(columnName, updatedData);
                            }
                        }}
                        onToggleShowResults={(checked) => toggleShowResults(checked)}
                    />

                </Box>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <InstructionFieldsContainer
                        exerciseInstruction={excersiceInstructions}
                        testInstruction={testInstructions}
                        onExerciseChange={(text) =>
                            setExerciseInstructions({ ...excersiceInstructions, textAreaData: text })
                        }
                        onTestChange={(text) => setTestInstructions({ ...testInstructions, textAreaData: text })}
                    />
                </Box>

                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 2,
                }}>
                    <TestConfiguration
                        title={testConfiguration.title}
                        note={testConfiguration.note}
                        checkboxsSelection={testConfiguration.checkboxsSelection}
                        onSelectionChange={handleSelectionChange}
                    />
                </Box>
            </Box>
        </Box>
    )
};