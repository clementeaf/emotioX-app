import { useDropzone } from "react-dropzone";
import { Box, Checkbox, FormControlLabel, Icon, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { grey, indigo, red } from "@mui/material/colors";
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import InvestigationTitleRequirement from "../../../../core-ui/Forms/InvestigationTitleRequirement";
import { useState } from "react";

export default function ImplicitAssociationView() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 3, minHeight: '100vh', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', width: '845px', bgcolor: 'white', flexDirection: 'column', pb: 2 }}>
                <InvestigationTitleRequirement
                    showConditionality={false}
                    onToggleConditionality={() => { }}
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
                    alignItems: 'flex-start' // Asegura que los elementos se alineen en la parte superior
                }}>
                    {/* Object Card */}
                    <Box sx={{
                        border: `1px solid ${grey[300]}`,
                        borderRadius: 2,
                        width: 255,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        p: 2,
                        gap: 2,
                    }}>
                        <Typography>Object 1</Typography>
                        <Typography>You can use an image or a name for this.</Typography>
                        <Typography>Name of the object</Typography>
                        <TextField placeholder="Text the name here" variant="outlined" size="small" sx={{ width: '100%' }} />
                        <FileUpload />
                    </Box>
                </Box>

                <Box sx={{ width: '804px', height: '106px', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 4 }}>
                    <DimensionsInput />
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
                    <CriteriaTable />
                </Box>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <InstructionFields />
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
                    <TestConfiguration />
                </Box>
            </Box>
        </Box>
    )
}

function FileUpload() {
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
        },
        maxFiles: 10,
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    const files = acceptedFiles.map((file) => (
        <Link key={file.path} href="#" underline="none" sx={{ mt: 1, color: '#0000EE', fontSize: 14 }}>
            {file.path}
        </Link>
    ));

    return (
        <Box
            {...getRootProps()}
            sx={{
                width: 215,
                height: 192,
                border: '1px solid #E0E0E0',
                borderRadius: 1,
                textAlign: 'center',
                padding: 2.3,
                cursor: 'pointer',
                '&:hover': { borderColor: '#9c27b0' },
            }}
        >
            <input {...getInputProps()} />
            <Icon sx={{ fontSize: 40, color: '#673ab7', mb: 2 }}>
                <UploadOutlinedIcon />
            </Icon>
            <Typography fontWeight={400} fontSize={14} lineHeight='18.3px'>
                Click or drag file to this area to upload
            </Typography>
            <Typography fontWeight={400} fontSize={10} lineHeight='13px'>
                Support for a single or bulk upload. JPG, JPEG, PNG or GIF supported
                <br />
                Max image dimensions are 16000x16000. Max file size is 5MB
            </Typography>
            <Box mt={2}>{files}</Box>
        </Box>
    );
}

function DimensionsInput() {
    return (
        <Box sx={{ width: '100%', height: '100%', px: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 2 }}>
                    Name the dimensions for the objects
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%', height: '100%' }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Dimension 1
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="YES"
                        InputProps={{ style: { fontSize: 14 } }}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Dimension 2
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="NO"
                        InputProps={{ style: { fontSize: 14 } }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

function CriteriaTable() {
    const rows = Array.from({ length: 15 }, (_, i) => ({
        order: i + 1,
        attributeName: "Attribute"
    }));

    return (
        <Box sx={{ width: '800px', p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                    Criteria
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography fontWeight={400} fontSize={14}>
                        Priming display time:
                    </Typography>
                    {[300, 400, 500].map((time) => (
                        <TextField
                            key={time}
                            variant="outlined"
                            size="small"
                            defaultValue={`${time} ms`}
                            sx={{
                                width: 70,
                                '& .MuiOutlinedInput-input': {
                                    p: '5px',
                                    textAlign: 'center',
                                },
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '10%' }}>Order</TableCell>
                            <TableCell>Attribute name</TableCell>
                            <TableCell sx={{ width: '20%' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.order}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <DragIndicatorIcon sx={{ color: grey[500], cursor: 'pointer' }} />
                                        <Typography>{row.order.toString().padStart(2, '0')}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{row.attributeName}</TableCell>
                                <TableCell>
                                    <Link href="#" sx={{ color: grey[700], mr: 2 }}>
                                        Image
                                    </Link>
                                    <Link href="#" sx={{ color: red[500] }}>
                                        Delete
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Checkbox />
                <Typography>Show results to respondents</Typography>
            </Box>
        </Box>
    );
}

function InstructionFields() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '800px', alignItems: 'flex-start' }}>
            <InstructionField label="Exercise instructions" placeholder="Enter exercise instructions..." maxChars={100} />
            <InstructionField label="Test instructions" placeholder="Enter test instructions..." maxChars={100} />
        </Box>
    );
}

type InstructionFieldProps = {
    label: string;
    placeholder: string;
    maxChars: number;
};

function InstructionField({ label, placeholder, maxChars }: InstructionFieldProps) {
    const [text, setText] = useState('');

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = event.target.value;
        if (inputText.length <= maxChars) {
            setText(inputText);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 800 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: grey[900] }}>{label}</Typography>
            <TextField
                multiline
                minRows={4}
                maxRows={6}
                variant="outlined"
                placeholder={placeholder}
                value={text}
                onChange={handleTextChange}
                sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        padding: 1,
                        '& textarea': {
                            fontSize: 14,
                            color: grey[700],
                            opacity: 0.8,
                        },
                    },
                }}

            />
            <Typography
                sx={{
                    fontSize: 12,
                    color: grey[500],
                    placeSelf: 'flex-end',
                }}
            >
                {text.length} / {maxChars}
            </Typography>
        </Box>
    );
}

function TestConfiguration() {
    const [config, setConfig] = useState({
      shuffleKeys: false,
      skipTraining: true,
      makeTestShorter: false,
      hideProgressBar: true,
    });
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfig({
        ...config,
        [event.target.name]: event.target.checked,
      });
    };
  
    return (
      <Box
        sx={{
          width: '770px',
          height: '208px',
          border: `1px solid ${grey[300]}`,
          borderRadius: 2,
          p: 2,
          bgcolor: 'white',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography fontWeight={600} fontSize={16}>
            Test configuration
          </Typography>
          <Typography fontSize={14} color={grey[500]}>
            Please select
          </Typography>
        </Box>
  
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={config.shuffleKeys}
                onChange={handleChange}
                name="shuffleKeys"
                sx={{
                  color: grey[500],
                  '&.Mui-checked': {
                    color: indigo[600],
                  },
                }}
              />
            }
            label="Shuffle Keys"
          />
  
          <FormControlLabel
            control={
              <Checkbox
                checked={config.skipTraining}
                onChange={handleChange}
                name="skipTraining"
                sx={{
                  color: grey[500],
                  '&.Mui-checked': {
                    color: indigo[600],
                  },
                }}
              />
            }
            label="Skip Training"
          />
  
          <FormControlLabel
            control={
              <Checkbox
                checked={config.makeTestShorter}
                onChange={handleChange}
                name="makeTestShorter"
                sx={{
                  color: grey[500],
                  '&.Mui-checked': {
                    color: indigo[600],
                  },
                }}
              />
            }
            label="Make test shorter"
          />
  
          <FormControlLabel
            control={
              <Checkbox
                checked={config.hideProgressBar}
                onChange={handleChange}
                name="hideProgressBar"
                sx={{
                  color: grey[500],
                  '&.Mui-checked': {
                    color: indigo[600],
                  },
                }}
              />
            }
            label="Hide test progress bar"
          />
        </Box>
      </Box>
    );
  }