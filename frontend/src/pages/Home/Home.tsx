// Home.tsx
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  Drawer,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Galaxy } from "../../types/types";
import { GalaxyList } from "../../components/GalaxyList";
import { GalaxyDetails } from "../../components/GalaxyDetails";
import { GET_ALL_GALAXIES } from "../../api/queries";

interface GetItemsData {
  items: Galaxy[];
}

export function Home() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loadingSelected, setLoadingSelected] = useState(false);
  const [loadingList, setLoadingList] = useState(true); 
  const itemsPerPage = 4;

  const isMobile = useMediaQuery("(max-width:896px)");

  const { data, loading, error } = useQuery<GetItemsData>(GET_ALL_GALAXIES, {
    variables: { offset: 0, limit: 200 },
  });


  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setLoadingList(false), 800);
      return () => clearTimeout(timer);
    } else {
      setLoadingList(true);
    }
  }, [loading]);


  useEffect(() => {
    if (!selectedId) return;
    setLoadingSelected(true);
    const timer = setTimeout(() => setLoadingSelected(false), 600);
    return () => clearTimeout(timer);
  }, [selectedId]);

  const filteredGalaxies = useMemo(
    () =>
      data?.items.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
      ) || [],
    [data, search]
  );

  const selectedGalaxy =
    filteredGalaxies.find((g) => g.id === selectedId) ?? null;

  if (loading && loadingList)
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
      justifyContent="center"
      alignItems="stretch"
      width="92%"
      maxWidth="1200px"
      margin="0 auto"
    >

      <Box
        flex={{ xs: "1 1 100%", md: "2 1 60%" }}
        minWidth={{ md: "400px" }}
        flexShrink={1}
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
          loading={loadingList} 
        />
      </Box>

      {!isMobile && (
        <Box
          flex={{ xs: "1 1 100%", md: "1 1 40%" }}
          minWidth="350px"
          maxWidth="500px"
          flexShrink={0}
        >
          <GalaxyDetails galaxy={selectedGalaxy} loading={loadingSelected} />
        </Box>
      )}

      {isMobile && selectedGalaxy && (
        <Drawer
          anchor="bottom"
          open={!!selectedGalaxy}
          onClose={() => setSelectedId(null)}
          slotProps={{
            paper: {
              sx: {
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                height: "60%",
              },
            },
          }}
        >
          <Box display="flex" justifyContent="flex-end" p={1}>
            <IconButton onClick={() => setSelectedId(null)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box px={2} pb={2}>
            <GalaxyDetails galaxy={selectedGalaxy} loading={loadingSelected} />
          </Box>
        </Drawer>
      )}
    </Box>
  );
}
