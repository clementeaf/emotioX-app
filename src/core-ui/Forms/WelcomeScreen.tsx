import { Box } from '@mui/material';
import ContainerGrid from '../ContainerGrid'
import { TitleRow } from './TitleRow'
import { TextInput } from './TextInput';
import { TextAreaInput } from './TextAreaInput';

export default function WelcomeScreen() {
    return (
        <ContainerGrid>
            <TitleRow />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                px: 2,
            }}>
                <TextInput label="Title" placeholder="Title of the screen" />
                <TextAreaInput label='Message' placeholder='Message to display' />
                <TextInput label="Start button text" placeholder="Name the button to start the test" />
            </Box>
        </ContainerGrid>
    )
}