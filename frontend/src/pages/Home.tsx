import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GET_ALL_GALAXIES } from "../api/queries";
import type { Galaxy } from "../types/types";
import { GalaxyList } from "../components/GalaxyList";
import { GalaxyDetails } from "../components/GalaxyDetails";

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

  const selectedGalaxy = filteredGalaxies.find((g) => g.id === selectedId) || null;

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
      <GalaxyList
        galaxies={filteredGalaxies}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
      />
      <Box flex="1 1 300px" maxWidth={400}>
        <GalaxyDetails galaxy={selectedGalaxy} />
      </Box>
    </Box>
  );
}