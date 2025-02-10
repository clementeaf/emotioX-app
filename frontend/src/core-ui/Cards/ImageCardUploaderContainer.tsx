import { Box, TextField, Typography } from "@mui/material";
import { TargetCardProps } from "../../types/types";
import { grey } from "@mui/material/colors";
import { ImageUpload } from "../FIleUpload/ImageUpload";
import clip from "../../assets/clip.png";

export function ImageCardUploaderContainer({
  id,
  nameOfObject,
  imageUploaded,
  onNameChange,
  onImageUpload,
}: TargetCardProps) {
  return (
    <Box
      key={id}
      sx={{
        border: `1px solid ${grey[300]}`,
        borderRadius: 2,
        width: 255,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        p: 2,
        gap: 2,
      }}
    >
      <TextField
        placeholder="Enter the object name"
        variant="outlined"
        size="small"
        sx={{ width: "100%" }}
        value={nameOfObject}
        onChange={(e) => onNameChange(e.target.value)}
      />

      {/* Pasamos solo el archivo a `onImageUpload` */}
      <ImageUpload
        handleImageUpload={(file) => onImageUpload(id, file)}
      />

      {imageUploaded && (
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <img src={clip} alt="clip" style={{ width: 20 }} />
          {typeof imageUploaded === 'string' 
            ? imageUploaded.split('/').pop() 
            : imageUploaded.name}
        </Typography>
      )}
    </Box>
  );
}


