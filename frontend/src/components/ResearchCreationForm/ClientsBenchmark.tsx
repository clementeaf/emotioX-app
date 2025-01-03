import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useResearchStore } from '../../store/useResearchStore';

const projectList = [
  'Project 001',
  'Project 002',
  'Project 003',
  'Project 004',
  'Project 005',
  'Project 006',
  'Project 007',
];

export default function ClientsBenchmark({ title }: { title: string }) {
  const { selectedProjects, setSelectedProjects } = useResearchStore();

  const handleToggle = (project: string) => {
    const updatedProjects = selectedProjects.includes(project)
      ? selectedProjects.filter((p) => p !== project)
      : [...selectedProjects, project];
    setSelectedProjects(updatedProjects);
  };

  return (
    <Box width="395px">
      {/* Título */}
      <Typography fontWeight={700} fontSize="20px" lineHeight="22px" color="#565656">
        {title || 'Title'}
      </Typography>
      <Typography fontWeight={400} fontSize="14px" lineHeight="22px" color="#8c8c8c" mt={2}>
        Please, select all the projects to include in the benchmark from the previous research history’s list.
      </Typography>

      {/* Caja de selección */}
      <Box
        sx={{
          width: '395px',
          height: '308px',
          borderRadius: '4px',
          border: `1px solid ${grey[300]}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
            gap: 1,
          }}
        >
          <Typography
            fontWeight={500}
            fontSize="16px"
            lineHeight="24px"
            color="#212121"
            width="100%"
            mt={1.5}
            ml={1.5}
          >
            Enterprise´s name
          </Typography>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: grey[300],
            }}
          />
          <Stack
            sx={{
              width: '100%',
              maxWidth: '400px',
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
          >
            {projectList.map((project, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedProjects.includes(project)} // Corregido
                    onChange={() => handleToggle(project)}
                    sx={{
                      color: '#3F51B5',
                      '&.Mui-checked': {
                        color: '#3F51B5',
                      },
                      ml: 1.5,
                    }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      textDecoration: selectedProjects.includes(project) // Corregido
                        ? 'underline'
                        : 'none',
                      color: 'black',
                    }}
                  >
                    {project}
                  </Typography>
                }
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
