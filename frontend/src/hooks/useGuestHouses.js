// src/hooks/useUsers.js

import { useQuery } from "@tanstack/react-query"
import { fetchAllGuestHouses } from "../api/guesthouses"

export const useGuestHouses = () =>
  useQuery({
    queryKey: ["guestHouses"],
    queryFn: fetchAllGuestHouses,
  })
