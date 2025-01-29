import { createTheme } from "@mui/material";
import { FormDataState } from "./types/types";
import { Target } from "./store/useImplicitAssociationStore";

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

/**
 * Valida que cada target tenga un id válido y un nameOfObject no vacío.
 */
export const validateTargets = (targets: Target[]): void => {
    targets.forEach((target) => {
      if (!target.id || !target.nameOfObject.trim()) {
        throw new Error("Each target must have a valid id and nameOfObject.");
      }
    });
  };

/**
 * Convierte un archivo en una cadena Base64.
 * @param file - Archivo que se convertirá.
 * @returns Promesa que resuelve con la cadena Base64 del archivo.
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]); // Obtener solo el contenido Base64
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  

// Estilos memoizados
export const typographyStyles = {
    opacity: 0.45,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '22px',
    width: '100%',
};

export const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 3,
};

export const formContainerStyles = {
    display: 'flex',
    width: '845px',
    bgcolor: 'white',
    flexDirection: 'column',
    pb: 2,
};