import { useState } from "react";
import { useGetQueriesQuery } from "../api/queryApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export interface QueryData {
  id: string;
  title: string;
  created_at: string;
  user?: {
    first_name: string;
    last_name: string;
  };
  // Add other properties as needed
}

export interface QueryLogicProps {
  children: (props: {
    data: QueryData[] | undefined;
    currentQueries: QueryData[];
    error: FetchBaseQueryError | SerializedError | undefined;
    isLoading: boolean;
    currentPage: number;
    totalPages: number;
    indexOfFirstQuery: number;
    indexOfLastQuery: number;
    goToPage: (pageNumber: number) => void;
  }) => React.ReactNode;
}

const QueryLogic: React.FC<QueryLogicProps> = ({ children }) => {
  console.log("QueryLogic container is initializing");
  const { data, error, isLoading } = useGetQueriesQuery();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const queriesPerPage = 5;

  // Calculate pagination
  const totalPages = data ? Math.ceil(data.length / queriesPerPage) : 0;
  const indexOfLastQuery = currentPage * queriesPerPage;
  const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
  const currentQueries = data ? data.slice(indexOfFirstQuery, indexOfLastQuery) : [];

  // Change page
  const goToPage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return children({
    data,
    currentQueries,
    error,
    isLoading,
    currentPage,
    totalPages,
    indexOfFirstQuery,
    indexOfLastQuery,
    goToPage,
  });
};

export default QueryLogic;
