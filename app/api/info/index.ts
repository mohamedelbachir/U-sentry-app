import { supabase } from "@/supabase/initSupabase";
import { useQuery } from "react-query";
export const useFaculteList = () => {
  return useQuery({
    queryKey: ["facultes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("facultes").select("*");
      if (error) {
        throw new Error();
      }
      return data;
    },
  });
};

export const useNiveauList = () => {
  return useQuery({
    queryKey: ["niveaux"],
    queryFn: async () => {
      const { data, error } = await supabase.from("niveaux").select("*");
      if (error) {
        throw new Error();
      }
      return data;
    },
  });
};
export const useDepartementList = () => {
  return useQuery({
    queryKey: ["departements"],
    queryFn: async () => {
      const { data, error } = await supabase.from("departements").select("*");
      if (error) {
        throw new Error();
      }
      return data;
    },
  });
};

export const useFiliereList = () => {
  return useQuery({
    queryKey: ["filieres"],
    queryFn: async () => {
      const { data, error } = await supabase.from("filieres").select("*");
      if (error) {
        throw new Error();
      }
      return data;
    },
  });
};
