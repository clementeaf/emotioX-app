import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, RadioProps } from '@mui/material';

export default function GenderSelector() {
    const [selectedGender, setSelectedGender] = useState<string>('');

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };

    const isGenderSelected = (gender: string) => selectedGender === gender;

    const CustomRadio = (props: RadioProps) => (
        <Radio
            {...props}
            sx={{
                color: isGenderSelected(props.value as string) ? '#252BE6' : 'lightgray',
            }}
            checked={!!isGenderSelected(props.value as string)}
        />
    );

    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="gender"
                name="gender"
                value={selectedGender}
                onChange={handleGenderChange}
            >
                <FormControlLabel
                    value="Masculino"
                    control={<CustomRadio />}
                    label="Masculino"
                />
                <FormControlLabel
                    value="Femenino"
                    control={<CustomRadio />}
                    label="Femenino"
                />
                <FormControlLabel
                    value="Prefiero no decirlo"
                    control={<CustomRadio />}
                    label="Prefiero no decirlo"
                />
            </RadioGroup>
        </FormControl>
    );
}
