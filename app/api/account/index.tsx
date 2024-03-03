import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/supabase/initSupabase";
import { Tables } from "@/types/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
type userId = {
  idClass: number;
  uuid: string;
};

type userClass = {
  faculte_id: number;
  departement_id: number;
  filiere_id: number;
  niveau_id: number;
};
type studentProps = {
  email: string;
  mdp: string;
  classId: userClass;
};
export const useCreateUserMutation = () => {
  const mutation = useMutation(async ({ idClass, uuid }: userId) => {
    const { data, error } = await supabase
      .from("etudiants")
      .insert({ classe_id: idClass, uuid: uuid });

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
export const useMutationDeleteAlert = (id: number) => {
  return useMutation(
    async () => await supabase.from("alertes").delete().eq("id", id)
  );
};

export const useMutationUpdateProfileStudent = ({
  idClasse,
  uuid,
}: {
  idClasse: number;
  uuid: string;
}) => {
  return useMutation(
    async () =>
      await supabase.from("etudiants").insert({ classe_id: idClasse, uuid })
  );
};

export const useMutationCreateClass = ({
  faculte_id,
  departement_id,
  filiere_id,
  niveau_id,
}: userClass) => {
  return useMutation(
    async () =>
      await supabase
        .from("classes")
        .insert({ faculte_id, departement_id, filiere_id, niveau_id })
        .select()
        .single()
  );
};
interface User {
  email: string;
  password: string;
  classe: userClass;
  infoClass?: {
    fac: string;
    dep: string;
    fil: string;
    niv: string;
  };
}

const createUser = async (user: User) => {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (signUpError) {
    throw signUpError;
  }

  return data;
};

export function CreateUser(user: User) {
  const { setClasse } = useAuth();
  return useMutation(() => createUser(user), {
    onSuccess: async (data) => {
      const { data: insertData, error: insertError } = await supabase
        .from("classes")
        .insert({
          departement_id: user.classe.departement_id,
          faculte_id: user.classe.departement_id,
          filiere_id: user.classe.filiere_id,
          niveau_id: user.classe.niveau_id,
        })
        .select()
        .single();

      console.log(insertData, data);

      if (insertError) {
        throw insertError;
      }

      const { data: result, error: failResult } = await supabase
        .from("etudiants")
        .insert({
          classe_id: insertData.id,
          uuid: data.user?.id!,
          dep: user.infoClass?.dep,
          fac: user.infoClass?.fac,
          fil: user.infoClass?.fil,
          niv: user.infoClass?.niv,
        })
        .select()
        .single();
      if (failResult) {
        throw failResult;
      }
      setClasse!(result.classe_id);
      AsyncStorage.setItem("isLogIn", JSON.stringify(true));
      return result;
    },
  });
}
