import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  CircularProgress,
  Pagination,
} from "@mui/material";
import { GET_ALL_GALAXIES } from "../api/queries";

interface Galaxy {
  id: string;
  name: string;
  description: string;
  details: string;
  image?: string;
  stars: string[];
}

interface GetItemsData {
  items: Galaxy[];
}

export function Home() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const itemsPerPage = 4;

const { data, loading, error } = useQuery<GetItemsData>(GET_ALL_GALAXIES, {
  variables: { offset: 0, limit: 200 },
});


  const filteredGalaxies = useMemo(
    () =>
      data?.items.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
      ) || [],
    [data, search]
  );


  const startIndex = (page - 1) * itemsPerPage;
  const paginatedGalaxies = filteredGalaxies.slice(startIndex, startIndex + itemsPerPage);

  const pageCount = Math.ceil(filteredGalaxies.length / itemsPerPage);
  const selectedGalaxy = filteredGalaxies.find((g) => g.id === selectedId);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box p={2}>
        <Typography color="error">Erro: {error.message}</Typography>
      </Box>
    );

  return (
    <Box
      p={2}
      pt={10}
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      gap={10}
      justifyContent="center"
      alignItems="flex-start"
    >

      <Box flex="1 1 300px" maxWidth={400} display="flex" flexDirection="column" gap={2}>
        <TextField
          fullWidth
          size="small"
          label="Buscar galáxia"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Digite o nome (ex.: Andromeda)"
        />

        <Box display="flex" flexDirection="column" gap={2}>
          {paginatedGalaxies.map((g) => {
            const isSelected = selectedId === g.id;
            return (
              <Card
                key={g.id}
                onClick={() => setSelectedId(selectedId === g.id ? null : g.id)}
                sx={{
                  cursor: "pointer",
                  bgcolor: isSelected ? "primary.dark" : "background.paper",
                  transition: "transform 0.15s",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {g.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ⭐ {g.stars.length} estrelas
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                    Clique para ver detalhes
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>


        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>


      <Box flex="1 1 300px" maxWidth={400} display="flex" flexDirection="column" gap={2}>
        {selectedGalaxy ? (
          <Card>
            {selectedGalaxy.image && (
              <CardMedia
                component="img"
                image={selectedGalaxy.image}
                alt={selectedGalaxy.name}
                sx={{ height: 180, objectFit: "cover" }}
              />
            )}
            <CardContent>
              <Typography variant="h6" mb={1}>
                {selectedGalaxy.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {selectedGalaxy.description}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line", mb: 1 }}>
                {selectedGalaxy.details}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Estrelas: {selectedGalaxy.stars.join(", ")}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography color="text.secondary">
            Selecione uma galáxia para ver detalhes
          </Typography>
        )}
      </Box>
    </Box>
  );
}