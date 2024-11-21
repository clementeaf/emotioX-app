import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ClusterData {
  label: string;
  value: number;
  isPositive: boolean;
}

const longTermClusters: ClusterData[] = [
  { label: 'Advocacy', value: 70.5, isPositive: true },
  { label: 'Recommendation', value: 50.5, isPositive: false },
  { label: 'Attention', value: 23.5, isPositive: true },
  { label: 'Destroying', value: 36.5, isPositive: false },
];

const shortTermClusters: ClusterData[] = [
  { label: 'Attention', value: 23.5, isPositive: true },
  { label: 'Destroying', value: 36.5, isPositive: false },
];

const ClusterList: React.FC<{ title: string; clusters: ClusterData[] }> = ({ title, clusters }) => (
  <Box
    sx={{
      border: '1px solid #E0E0E0',
      borderRadius: 2,
      p: 2,
      width: '250px',
      mb: 2,
    }}
  >
    <Typography variant="subtitle1" fontWeight="bold" mb={1}>
      {title}
    </Typography>
    {clusters.map((cluster, index) => (
      <Stack key={index} direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
        <Typography fontSize={14}>{cluster.label}</Typography>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {cluster.isPositive ? (
            <ArrowDropUpIcon sx={{ color: 'green', fontSize: 18 }} />
          ) : (
            <ArrowDropDownIcon sx={{ color: 'red', fontSize: 18 }} />
          )}
          <Typography fontSize={14} color={cluster.isPositive ? 'green' : 'red'}>
            {cluster.value}%
          </Typography>
        </Stack>
      </Stack>
    ))}
  </Box>
);

export const ClusterDisplay: React.FC = () => (
  <Box>
    <ClusterList title="Clusters that Drivers Long-Term Value" clusters={longTermClusters} />
    <ClusterList title="Clusters that Drives Short-Term Value" clusters={shortTermClusters} />
  </Box>
);

