// src/features/Responses/container/PendingResponseContainer.ts
import { useGetResponsesQuery } from "../api/responseApi";
import { useGetUserQuery } from "../../Users/api/userApi"; // Adjust the import path

export const useResponsesContainer = () => {
  const { data: responses, isLoading: responsesLoading, error: responsesError } = useGetResponsesQuery();
  const { data: currentUser, isLoading: userLoading, error: userError } = useGetUserQuery();

  return {
    responses,
    currentUser,
    isLoading: responsesLoading || userLoading,
    error: responsesError || userError,
  };
};