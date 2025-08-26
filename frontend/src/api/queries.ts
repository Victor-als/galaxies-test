import { gql } from "@apollo/client";

export const GET_ALL_GALAXIES = gql`
query {
  items(offset: 0, limit: 1000) {
    id
    name
    description
    image
    details
    stars
  }
}
`;