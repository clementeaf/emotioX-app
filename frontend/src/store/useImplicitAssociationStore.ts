import { create } from 'zustand';

export type Target = {
    id: number;
    text: string;
    title: string;
    nameOfObject: string;
    titleAssigned: string;
    imageUploaded: File | null;
    imageFormat: string;
};

type InputAttribute = {
    id: number;
    title: string;
    inputData: string;
};

type DimensionName = {
    sectionTitle: string;
    inputsAttributes: InputAttribute[];
};

type TableData = {
    columnName: string;
    columnData: (string | number)[];
};

type Criteria = {
    timeSelection: 300 | 400 | 500;
    table: TableData[];
    showResults: {
        checkboxTitle: string;
        checkboxSelection: boolean;
    };
};

type Instructions = {
    title: string;
    textAreaData: string;
    placeHolder: string;
};

type CheckboxOption = {
    id: number;
    title: string;
    selection: boolean;
};

type TestConfiguration = {
    note: string;
    title: string;
    checkboxsSelection: CheckboxOption[];
};

type ImplicitAssociationProps = {
    stageName: string;
    configurationStageName: string;
    required: boolean;
    targets: Target[];
    dimensionsName: DimensionName;
    criteria: Criteria[];
    excersiceInstructions: Instructions;
    testInstructions: Instructions;
    testConfiguration: TestConfiguration;

    // Actions
    setStageName: (stageName: string) => void;
    setConfigurationStageName: (name: string) => void;
    setRequired: (required: boolean) => void;
    addTarget: (target: Target) => void;
    updateTarget: (id: number, updatedTarget: Partial<Target>) => void;
    updateTargetImage: (id: number, image: File, format: string) => void;
    updateTargetTitleAssigned: (id: number, titleAssigned: string) => void;
    setDimensionInputData: (id: number, inputData: string) => void;
    setExerciseInstructions: (instructions: Instructions) => void;
    setTestInstructions: (instructions: Instructions) => void;
    setTestConfiguration: (config: TestConfiguration) => void;
    setTimeSelection: (timeSelection: 300 | 400 | 500) => void;
    updateTableData: (columnName: string, columnData: (string | number)[]) => void;
    toggleShowResults: (checkboxSelection: boolean) => void;
};

export const useImplicitAssociationStore = create<ImplicitAssociationProps>((set) => ({
    stageName: 'ImplicitAssociation',
    configurationStageName: 'Build',
    required: true,
    targets: [
        {
            id: 1,
            text: 'You can use an image or name for this.',
            title: 'Object 1',
            nameOfObject: "Name of the object.",
            titleAssigned: '',
            imageUploaded: null,
            imageFormat: '',
        },
        {
            id: 2,
            text: 'You can use an image or name for this.',
            title: 'Object 2',
            nameOfObject: "Name of the object.",
            titleAssigned: '',
            imageUploaded: null,
            imageFormat: '',
        },
    ],
    dimensionsName: {
        sectionTitle: 'Name the dimensions for the objects',
        inputsAttributes: [
            { id: 1, title: 'Dimension 1', inputData: '' },
            { id: 2, title: 'Dimension 2', inputData: '' },
        ],
    },
    criteria: [
        {
            timeSelection: 300,
            table: [
                {
                    columnName: 'Order',
                    columnData: [1, 2, 3, 4],
                },
                {
                    columnName: 'Attribute Name',
                    columnData: ['Attribute', 'Attribute', 'Attribute'],
                },
            ],
            showResults: {
                checkboxTitle: 'Show results to respondents',
                checkboxSelection: false,
            },
        },
    ],
    excersiceInstructions: {
        title: 'Exercise instructions',
        textAreaData: '',
        placeHolder: 'Lorem',
    },
    testInstructions: {
        title: 'Test instructions',
        textAreaData: '',
        placeHolder: 'Lorem',
    },
    testConfiguration: {
        note: 'Please select',
        title: 'Test configuration',
        checkboxsSelection: [
            { id: 1, title: 'Shuffle Keys', selection: false },
            { id: 2, title: 'Skip Training', selection: false },
            { id: 3, title: 'Make test shorter', selection: false },
            { id: 4, title: 'Hide test progress bar', selection: false },
        ],
    },

    // Actions
    setStageName: (stageName) => set({ stageName }),
    setConfigurationStageName: (name) => set({ configurationStageName: name }),
    setRequired: (required) => set({ required }),
    addTarget: (target) =>
        set((state) => ({
            targets: [...state.targets, target],
        })),
    updateTarget: (id, updatedTarget) =>
        set((state) => ({
            targets: state.targets.map((target) =>
                target.id === id ? { ...target, ...updatedTarget } : target
            ),
        })),
    updateTargetImage: (id: number, image: File, format: string) =>
        set((state) => ({
            targets: state.targets.map((target) =>
                target.id === id
                    ? ({ ...target, imageUploaded: image, imageFormat: format } as Target) // Assertion explícita
                    : target
            ),
        })),

    updateTargetTitleAssigned: (id: number, titleAssigned: string) =>
        set((state) => ({
            targets: state.targets.map((target) =>
                target.id === id ? { ...target, titleAssigned } : target
            ),
        })),
    setDimensionInputData: (id: number, inputData: string) =>
        set((state) => ({
            dimensionsName: {
                ...state.dimensionsName,
                inputsAttributes: state.dimensionsName.inputsAttributes.map((attribute) =>
                    attribute.id === id ? { ...attribute, inputData } : attribute
                ),
            },
        })),
    setTimeSelection: (timeSelection: 300 | 400 | 500) =>
        set((state) => ({
            criteria: state.criteria.map((item) => ({ ...item, timeSelection })),
        })),
    updateTableData: (columnName, columnData) =>
        set((state) => ({
            criteria: state.criteria.map((item) => ({
                ...item,
                table: item.table.map((col) =>
                    col.columnName === columnName ? { ...col, columnData } : col
                ),
            })),
        })),
    toggleShowResults: (checkboxSelection: boolean) =>
        set((state) => ({
            criteria: state.criteria.map((item) => ({
                ...item,
                showResults: { ...item.showResults, checkboxSelection },
            })),
        })),
    setExerciseInstructions: (instructions) =>
        set({ excersiceInstructions: instructions }),
    setTestInstructions: (instructions) => set({ testInstructions: instructions }),
    setTestConfiguration: (config) => set({ testConfiguration: config }),
}));
