import { useDropzone } from "react-dropzone";
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { Box, Icon, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ImageUploadProps, ImageUploadV2Props } from "../../types/types";

export function ImageUpload({ handleImageUpload }: Omit<ImageUploadProps, "id">) {
    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/gif": [],
      },
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024, // 5 MB
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          const file = acceptedFiles[0];
          const format = file.type.split("/")[1];
          handleImageUpload(file, format); // Pasa `file` y `format`
        }
      },
    });
  
    return (
      <Box
        {...getRootProps()}
        sx={{
          width: 215,
          height: 192,
          border: "1px solid #E0E0E0",
          borderRadius: 1,
          textAlign: "center",
          padding: 2.3,
          cursor: "pointer",
          "&:hover": { borderColor: grey[500] },
        }}
      >
        <input {...getInputProps()} />
        <Icon sx={{ fontSize: 40, color: grey[600], mb: 2 }}>
          <UploadOutlinedIcon />
        </Icon>
        <Typography fontWeight={400} fontSize={14} lineHeight="18.3px">
          Click or drag file to this area to upload
        </Typography>
        <Typography fontWeight={400} fontSize={10} lineHeight="13px">
          Support for a single or bulk upload. JPG, JPEG, PNG, or GIF supported.
          <br />
          Max image dimensions are 16000x16000. Max file size is 5MB.
        </Typography>
      </Box>
    );
  }
  
  
  

export function ImageUploadV2({ handleImageUpload, disabled }: ImageUploadV2Props) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
        },
        maxFiles: 1, // 1 file per upload
        maxSize: 5 * 1024 * 1024, // 5MB
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                handleImageUpload(file);
            }
        },
    });

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
                '&:hover': { borderColor: grey[500] },
            }}
        >
            <input disabled={!disabled} {...getInputProps()} />
            <Icon sx={{ fontSize: 40, color: grey[600], mb: 2 }}>
                <UploadOutlinedIcon />
            </Icon>
            <Typography fontWeight={400} fontSize={14} lineHeight="18.3px">
                Click or drag file to this area to upload
            </Typography>
            <Typography fontWeight={400} fontSize={10} lineHeight="13px">
                Support for a single or bulk upload. JPG, JPEG, PNG, or GIF supported.
                <br />
                Max image dimensions are 16000x16000. Max file size is 5MB.
            </Typography>
        </Box>
    );
}