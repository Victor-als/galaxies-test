import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query GetItems($search: String) {
    items(search: $search) {
      id
      name
      image
      description
      details
      stars
    }
  }
`;

export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
      image
      description
      details
      stars
    }
  }
`;