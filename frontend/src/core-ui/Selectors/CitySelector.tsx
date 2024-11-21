import React, { useState } from 'react';
import { Radio, RadioGroup, FormControlLabel, TextField, FormControl } from '@mui/material';

export default function CitySelector() {
    const [selectedCity, setSelectedCity] = useState('');
    const [anotherCity, setAnotherCity] = useState('');

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCity(event.target.value);
        setAnotherCity(''); // Reset anotherCity when any predefined city is selected
    };

    const handleAnotherCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnotherCity(event.target.value);
        setSelectedCity(''); // Reset selectedCity when "Other" is used
    };

    const isCitySelected = (city: string) => selectedCity === city || (city === '' && anotherCity);

    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="city"
                name="city"
                value={selectedCity || anotherCity}
                onChange={handleCityChange}
            >
                <FormControlLabel
                    value="Tallin"
                    control={
                        <Radio
                            sx={{ color: isCitySelected('Tallin') ? '#252BE6' : 'lightgray' }}
                            checked={!!isCitySelected('Tallin')}
                        />
                    }
                    label="Tallin"
                />

                <FormControlLabel
                    value="Santiago"
                    control={
                        <Radio
                            sx={{ color: isCitySelected('Santiago') ? '#252BE6' : 'lightgray' }}
                            checked={!!isCitySelected('Santiago')}
                        />
                    }
                    label="Santiago"
                />

                <FormControlLabel
                    value="Ciudad de Mexico"
                    control={
                        <Radio
                            sx={{ color: isCitySelected('Ciudad de Mexico') ? '#252BE6' : 'lightgray' }}
                            checked={!!isCitySelected('Ciudad de Mexico')}
                        />
                    }
                    label="Ciudad de Mexico"
                />

                <FormControlLabel
                    value={anotherCity}
                    control={
                        <Radio
                            sx={{ color: anotherCity ? '#252BE6' : 'lightgray' }}
                            checked={Boolean(anotherCity)}
                        />
                    }
                    label={
                        <TextField
                            variant="outlined"
                            placeholder="Other"
                            value={anotherCity}
                            onChange={handleAnotherCityChange}
                            sx={{
                                mt: 1,
                                width: '100%',
                            }}
                        />
                    }
                />
            </RadioGroup>
        </FormControl>
    );
}
