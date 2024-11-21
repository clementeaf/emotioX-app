import { Tooltip } from "@mui/material";

export function ValueLabelComponent(props: any) {
    const { children, value } = props;
  
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value} sx={{
        backgroundColor: 'black',
        color: 'white',
      }}>
        {children}
      </Tooltip>
    );
  }