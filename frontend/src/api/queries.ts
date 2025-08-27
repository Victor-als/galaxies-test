import { gql } from "@apollo/client";

export const GET_ALL_GALAXIES = gql`
  query GetAllGalaxies($search: String, $offset: Int, $limit: Int) {
    items(search: $search, offset: $offset, limit: $limit) {
      id
      name
      description
      details
      image
      stars
    }
  }
`;