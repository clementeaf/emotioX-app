import { createTheme } from "@mui/material";
import { FormDataState } from "./types/types";

export const steps = ['Name the Research', 'Kind of Research', 'Techniques for Research'];

// ***** Login ***** //
export const MAX_PASSWORD_LENGTH = 20;

export const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                },
                html: {
                    margin: 0,
                    padding: 0,
                    height: '100%',
                },
            },
        },
    },
});

export function getStrengthLabel(strength: number) {
    if (strength <= 1) {
        return { label: 'Poor', color: 'red' };
    } else if (strength <= 3) {
        return { label: 'Medium', color: 'orange' };
    } else if (strength > 3 && strength < 5) {
        return { label: 'Strong', color: 'green' };
    } else if (strength >= 5) {
        return { label: 'Very Strong', color: 'darkgreen' };
    } else {
        return { label: '', color: '' };
    }
}

// Función para calcular la fortaleza de la contraseña
export function calculatePasswordStrength(password: string) {
    let strength = 0;

    // Evaluar si tiene letras (mayúsculas y minúsculas mezcladas)
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    // Evaluar si contiene números
    if (/[0-9]/.test(password)) strength += 1;
    // Evaluar si contiene caracteres especiales
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Bonus por longitud: 3 puntos por longitud de 20 caracteres o más
    const lengthBonus = Math.min((password.length / MAX_PASSWORD_LENGTH) * 3, 3); // Máximo de 3 puntos por longitud
    strength += lengthBonus;

    return strength;
}

// ***** EligibilityInput ***** //
// Lista de opciones de elegibilidad
export const eligibilityOptions = ['Qualify', 'Disqualify'];

// ***** SorteableOptions ***** //
// Valores iniciales
export const initialItems = [
    { id: '1', text: 'Option 1', eligibility: 'Qualify' },
    { id: '2', text: 'Option 2', eligibility: 'Qualify' },
    { id: '3', text: 'Option 3', eligibility: 'Qualify' },
];

export const validateStep = (currentStep: number, formData: FormDataState) => {
    const validations = [
      {
        isValid: !!formData.researchName && !!formData.enterpriseName,
        error: 'Research Name and Enterprise Name are required.',
      },
      {
        isValid: !!formData.selectedResearchType,
        error: 'Research Type is required.',
      },
      {
        isValid: true,
        error: undefined,
      },
    ];
  
    return validations[currentStep] || { isValid: false, error: 'Unknown validation step.' };
  };
  
  