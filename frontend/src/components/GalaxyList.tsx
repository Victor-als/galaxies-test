import { Box, TextField, InputAdornment, Pagination, Skeleton } from "@mui/material";
import type { Galaxy } from "../types/types";
import { GalaxyCard } from "./GalaxyCard";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  galaxies: Galaxy[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  search: string;
  setSearch: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  itemsPerPage: number;
  loading?: boolean;
}

export function GalaxyList({ galaxies, selectedId, setSelectedId, search, setSearch, page, setPage, itemsPerPage, loading }: Props) {
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedGalaxies = galaxies.slice(startIndex, startIndex + itemsPerPage);
  const pageCount = Math.ceil(galaxies.length / itemsPerPage);

  return (
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
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }
        }}
      />

      <Box display="flex" flexDirection="column" gap={2}>
        {loading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={80} animation="wave" />
            ))
          : paginatedGalaxies.map((g) => (
              <GalaxyCard
                key={g.id}
                galaxy={g}
                isSelected={selectedId === g.id}
                onClick={() => setSelectedId(selectedId === g.id ? null : g.id)}
              />
            ))
        }
      </Box>

      {pageCount > 1 && !loading && (
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} color="primary" />
        </Box>
      )}
    </Box>
  );
}
