import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

interface ProgressCardProps {
    title: string;
    status: string;
    totalIDs: number;
    percentage: number;
    bgColor?: string;
}

export const CircularProgressCard: React.FC<ProgressCardProps> = ({ title, status, totalIDs, percentage, bgColor }) => {
    return (
        <Box
            sx={{
                width: "368px",
                height: "139px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: bgColor ? bgColor : "#2468E6",
                color: "#fff",
                borderRadius: "12px",
                padding: "16px",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Texto del lado izquierdo */}
            <Box>
                <Typography fontSize={14} fontWeight={500} lineHeight='22px' color="white" mb={2}>
                    {title}
                </Typography>
                <Typography fontSize={24} fontWeight={700} lineHeight='32px' color="white" mb={1}>
                    {status}
                </Typography>
                <Typography fontSize={14} fontWeight={400} lineHeight='22px' color="white">
                    {totalIDs} IDs have been successful
                </Typography>
            </Box>

            {/* Progreso circular */}
            <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress
                    variant="determinate"
                    value={percentage}
                    size={105}
                    thickness={5}
                    sx={{ color: "#fff", opacity: 0.3 }}
                />
                <CircularProgress
                    variant="determinate"
                    value={percentage}
                    size={105}
                    thickness={5}
                    sx={{
                        color: "white",
                        position: "absolute",
                        left: 0,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
                        {percentage}%
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

