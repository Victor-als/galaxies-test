import { Card, CardContent, Typography } from "@mui/material";
import type { Galaxy } from "../types/types";
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from "@mui/material/styles";

interface Props {
  galaxy: Galaxy;
  isSelected: boolean;
  onClick: () => void;
}

export function GalaxyCard({ galaxy, isSelected, onClick }: Props) {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        bgcolor: isSelected ? theme.palette.primary.dark : theme.palette.background.paper,
        transition: "transform 0.15s",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {galaxy.name}
        </Typography>
        <Typography
          variant="body2"
          display="flex"
          gap={1}
          alignItems="center"
          color="text.secondary"
        >
          <StarIcon color="warning" /> {galaxy.stars.length} estrelas
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mt={1}>
          Clique para ver detalhes
        </Typography>
      </CardContent>
    </Card>
  );
}
