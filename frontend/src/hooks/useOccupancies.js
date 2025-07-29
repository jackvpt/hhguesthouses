// src/hooks/useUsers.js

import { useQuery } from "@tanstack/react-query"
import { fetchAllOccupancies } from "../api/occupancies"

export const useOccupancies = () =>
  useQuery({
    queryKey: ["occupancies"],
    queryFn: fetchAllOccupancies,
  })
