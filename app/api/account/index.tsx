import { supabase } from "@/supabase/initSupabase";
import { Tables } from "@/types/utils";
import { useMutation } from "react-query";
type userId = {
  idClass: number;
  uuid: string;
};
export const useCreateUserMutation = () => {
  const mutation = useMutation(async ({ idClass, uuid }: userId) => {
    const { data, error } = await supabase
      .from("etudiants")
      .insert({ classe_id: idClass, id: uuid });

    if (error) {
      throw error;
    }

    return data;
  }, {});

  return mutation;
};
type classes = {
  dpt: number;
  fct: number;
  fld: number;
  nvd: number;
};
export const useCreateUserClasseMutation = () => {
  const mutation = useMutation(async ({ dpt, fct, fld, nvd }: classes) => {
    const { data, error } = await supabase.from("classes").insert({
      departement_id: dpt,
      faculte_id: fct,
      filiere_id: fld,
      niveau_id: nvd,
    });
    if (error) {
      throw error;
    }

    return data;
  }, {});
  return mutation;
};
