import { Card, CardContent, CardMedia, Typography, Box, Chip } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import type { Galaxy } from "../types/types";

interface Props {
  galaxy: Galaxy | null;
}

export function GalaxyDetails({ galaxy }: Props) {
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