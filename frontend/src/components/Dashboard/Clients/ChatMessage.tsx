import { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ChatMessageProps {
    name: string;
    message: string;
  }
  
export const ChatMessage: React.FC<ChatMessageProps> = ({ name, message }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding={1}
        maxWidth={860}
        width="100%"
      >
        <Box mr={1}>
          <Typography variant="body2" fontWeight="bold" component="span">
            {name}:
          </Typography>{' '}
          <Typography variant="body2" component="span">
            {message}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
          size="small"
        >
          <Typography textTransform='initial'>Change client</Typography>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Client 1</MenuItem>
          <MenuItem onClick={handleClose}>Client 2</MenuItem>
          <MenuItem onClick={handleClose}>Client 3</MenuItem>
        </Menu>
      </Box>
    );
  };