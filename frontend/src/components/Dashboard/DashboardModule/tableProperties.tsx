import { Box } from "@mui/material";

export const rows = [
    { name: 'Universidad del Desarrollo', status: 'Rejected', date: '18/04/2024', progress: 85, researcher: 'Alexis Brantes' },
    { name: 'Universidad Anahuac', status: 'Pending', date: '18/05/2024', progress: 92, researcher: 'Lana Babii' },
    { name: 'Universidad Anahuac', status: 'Pending', date: '18/05/2024', progress: 92, researcher: 'Lana Babii' },
    { name: 'Universidad Anahuac', status: 'Pending', date: '18/05/2024', progress: 92, researcher: 'Lana Babii' },
    { name: 'Universidad del Desarrollo', status: 'Rejected', date: '18/04/2024', progress: 85, researcher: 'Alexis Brantes' },
    { name: 'Universidad Anahuac', status: 'Pending', date: '18/05/2024', progress: 92, researcher: 'Lana Babii' },
    { name: 'Universidad Anahuac', status: 'Pending', date: '18/05/2024', progress: 92, researcher: 'Lana Babii' },
    { name: 'Universidad Anahuac', status: 'Pending', date: '18/05/2024', progress: 92, researcher: 'Lana Babii' },
  ];

  type StatusType = 'Rejected' | 'Approved' | 'Pending';

export const getStatusChip = (status: StatusType) => {
  const styles: Record<StatusType, { color: string; backgroundColor: string }> = {
    Rejected: { color: '#EB4335', backgroundColor: '#FFD6D6' },
    Approved: { color: '#33A852', backgroundColor: '#DFF6DD' },
    Pending: { color: '#F4B400', backgroundColor: '#FFF2CC' }
  };

  return (
    <Box
      sx={{
        padding: '4px 12px',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 500,
        ...styles[status],
      }}
    >
      {status}
    </Box>
  );
};

type RTCStatsType = "candidate-pair" | "certificate" | "codec" | "data-channel" | "inbound-rtp" | "local-candidate" | "media-playout" | "media-source" | "outbound-rtp" | "peer-connection" | "remote-candidate" | "remote-inbound-rtp" | "remote-outbound-rtp" | "transport";

// Función para validar si el valor pertenece a RTCStatsType
export const isRTCStatsType = (status: string): status is RTCStatsType => {
  return [
    "candidate-pair",
    "certificate",
    "codec",
    "data-channel",
    "inbound-rtp",
    "local-candidate",
    "media-playout",
    "media-source",
    "outbound-rtp",
    "peer-connection",
    "remote-candidate",
    "remote-inbound-rtp",
    "remote-outbound-rtp",
    "transport",
  ].includes(status);
};

// Mapeo de RTCStatsType a StatusType
export const mapRTCStatsToStatusType = (rtcStatus: RTCStatsType): StatusType => {
  const mapping: Record<RTCStatsType, StatusType> = {
    "candidate-pair": "Pending",
    "certificate": "Approved",
    "codec": "Rejected",
    "data-channel": "Pending",
    "inbound-rtp": "Pending",
    "local-candidate": "Approved",
    "media-playout": "Approved",
    "media-source": "Pending",
    "outbound-rtp": "Rejected",
    "peer-connection": "Pending",
    "remote-candidate": "Approved",
    "remote-inbound-rtp": "Rejected",
    "remote-outbound-rtp": "Pending",
    "transport": "Approved",
  };

  return mapping[rtcStatus];
};
