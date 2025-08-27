import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Galaxy } from "../types/types";

interface Props {
  galaxy: Galaxy | null;
}

export function GalaxyDetails({ galaxy }: Props) {
  if (!galaxy)
    return <Typography color="text.secondary">Selecione uma galáxia para ver detalhes</Typography>;

  return (
    <Card>
      {galaxy.image && (
        <CardMedia
          component="img"
          image={galaxy.image}
          alt={galaxy.name}
          sx={{ height: 180, objectFit: "cover" }}
        />
      )}
      <CardContent>
        <Typography variant="h6" mb={1}>
          {galaxy.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {galaxy.description}
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 1 }}>
          {galaxy.details}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Estrelas: {galaxy.stars.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
}