import { Box } from '@mui/material';
import ContainerGrid from '../ContainerGrid'
import { TitleRow } from './TitleRow'
import { TextInput } from './TextInput';
import { TextAreaInput } from './TextAreaInput';

export default function WelcomeScreen() {
    return (
        <ContainerGrid>
            <TitleRow title='1.0.- Welcome screen' />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '426px',
                px: 2,
            }}>
                <TextInput label="Title" placeholder="Title of the screen" />
                <TextAreaInput label='Message' placeholder='Message to display' />
                <TextInput label="Start button text" placeholder="Name the button to start the test" />
            </Box>
        </ContainerGrid>
    )
}

export function ThankYouScreen() {
    return (
        <ContainerGrid>
            <TitleRow title='4.0.- Thank you screen' />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '426px',
                px: 2,
            }}>
                <TextInput label="Title" placeholder="Title of the screen" />
                <TextAreaInput label='Message' placeholder='Message to display' />
            </Box>
        </ContainerGrid>
    )
}