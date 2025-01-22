import { MenuItem, Select } from '@mui/material';
import { eligibilityOptions } from '../utils';

export function EligibilityInput({
    value,
    onChange,
    disabled,
}: {
    value: string;
    onChange: (value: string) => void;
    disabled: boolean;
}) {
    return (
        <Select
            value={value}
            onChange={(e) => onChange(e.target.value as string)}
            variant="outlined"
            size="small"
            sx={{ width: '150px', mr: 2 }}
            disabled={disabled}
        >
            {eligibilityOptions.map((opt, idx) => (
                <MenuItem key={idx} value={opt}>
                    {opt}
                </MenuItem>
            ))}
        </Select>
    );
}
