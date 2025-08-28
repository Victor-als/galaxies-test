import { Card, CardContent, CardMedia, Typography, Box, Chip, Skeleton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import type { Galaxy } from "../types/types";

interface Props {
  galaxy: Galaxy | null;
  loading?: boolean;
}

export function GalaxyDetails({ galaxy, loading }: Props) {
  if (loading) {
    return (
      <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", p: 2 }}>
        <Skeleton variant="rectangular" height={200} animation="wave" />
        <Box mt={1} display="flex" flexDirection="column" gap={1}>
          <Skeleton variant="text" height={30} width="60%" animation="wave" />
          <Skeleton variant="text" height={20} width="80%" animation="wave" />
          <Skeleton variant="text" height={20} width="40%" animation="wave" />
          <Skeleton variant="rectangular" height={20} width="100%" animation="wave" />
          <Skeleton variant="rectangular" height={20} width="100%" animation="wave" />
        </Box>
      </Card>
    );
  }

  if (!galaxy)
    return <Typography color="text.secondary">Selecione uma galáxia para ver detalhes</Typography>;

  return (
    <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {galaxy.image && (
        <CardMedia
          component="img"
          image={galaxy.image}
          alt={galaxy.name}
          sx={{ height: { xs: 200, md: 300 }, objectFit: "cover" }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h5" fontWeight={700}>
          {galaxy.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {galaxy.description}
        </Typography>
        <Box sx={{ flexGrow: 1, mt: 1, overflowY: "auto" }}>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {galaxy.details}
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <StarIcon color="warning" />
          <Typography variant="body2" fontWeight={600}>
            {galaxy.stars.length} estrelas
          </Typography>
        </Box>

        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {galaxy.stars.map((star) => (
            <Chip key={star} label={star} size="small" color="primary" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
