import { useQuery } from "@apollo/client/react";
import { Typography, Grid } from "@mui/material";
import { GET_ALL_GALAXIES } from "../api/queries";


interface Galaxy {
  id: string;
  name: string;
  description: string;
}

interface GetItemsData {
  items: Galaxy[];
}

export function Home() {
  const { data, loading, error } = useQuery<GetItemsData>(GET_ALL_GALAXIES);

  if (loading) return <Typography>Carregando...</Typography>;
  if (error) return <Typography>Erro: {error.message}</Typography>;

  return (
    <Grid container spacing={2} p={2}>
      {data?.items.map((g) => (
        <Grid key={g.id}>
          <Typography variant="h6">{g.name}</Typography>
          <Typography variant="body2">{g.description}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}