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
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024,
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                handleImageUpload(file); // Llamar la función pasada como prop
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
                cursor: disabled ? "not-allowed" : "pointer",
                backgroundColor: disabled ? "#f5f5f5" : "transparent",
                "&:hover": { borderColor: !disabled ? grey[500] : "#E0E0E0" },
            }}
        >
            <input
                {...getInputProps()}
                disabled={disabled} // Asegurarse de que esto esté correctamente configurado
            />
            <Icon
                sx={{
                    fontSize: 40,
                    color: disabled ? grey[400] : grey[600],
                    mb: 2,
                }}
            >
                <UploadOutlinedIcon />
            </Icon>
            <Typography
                fontWeight={400}
                fontSize={14}
                lineHeight="18.3px"
                color={disabled ? grey[400] : "inherit"}
            >
                Click or drag file to this area to upload
            </Typography>
            <Typography
                fontWeight={400}
                fontSize={10}
                lineHeight="13px"
                color={disabled ? grey[400] : "inherit"}
            >
                Support for JPG, JPEG, PNG, or GIF. Max file size is 5MB.
            </Typography>
        </Box>
    );
}

