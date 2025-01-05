import { Box, TextField, Typography } from "@mui/material";
import { TargetCardProps } from "../../types/types";
import { grey } from "@mui/material/colors";
import { ImageUpload } from "../FIleUpload/ImageUpload";
import clip from "../../assets/clip.png";

export function ImageCardUploaderContainer({
    id,
    title,
    text,
    nameOfObject,
    titleAssigned,
    imageUploaded,
    updateTargetTitleAssigned,
    handleImageUpload,
}: TargetCardProps) {
    return (
        <Box
            key={id}
            sx={{
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
            <Typography>{title}</Typography>
            <Typography>{text}</Typography>
            <Typography>{nameOfObject}</Typography>
            <TextField
                placeholder="Text the name here"
                variant="outlined"
                size="small"
                sx={{ width: '100%' }}
                value={titleAssigned}
                onChange={(e) => updateTargetTitleAssigned(id, e.target.value)}
            />
            <ImageUpload id={id} handleImageUpload={handleImageUpload} />
            {imageUploaded?.name && (
                <Typography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <img src={clip} alt="clip" style={{ width: 20 }} />
                    {imageUploaded.name}
                </Typography>
            )}
        </Box>
    )
}