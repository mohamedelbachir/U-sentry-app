import { useQuery } from "react-query";
import { supabase } from "@/supabase/initSupabase";
import { useState } from "react";

type departementType = {
  facId: number;
  nom: string;
};

type filiereType = departementType & {
  depId: number;
};

type niveauxType = filiereType & {
  filiereId: number;
};

type adminProps = {
  email: string;
  mdp: string;
  role: number;
  name: string;
};

type classInfo = {
  faculty?: string;
  departement?: string;
  filiere?: string;
  niveau?: string;
};
export const useClassInformationList = (id: string) => {
  return useQuery({
    queryKey: ["class-info", id],
    queryFn: async () => {
      const { data: classData, error: classError } = await supabase
        .from("etudiants")
        .select("*")
        .eq("uuid", id)
        .single();

      if (classError) {
        throw new Error(classError.message);
      }
      return classData;
    },
  });
};
export const useFacultyList = () => {
  return useQuery({
    queryKey: ["faculty-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("facultes").select("*");
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useFacultyListById = (id: number) => {
  return useQuery({
    queryKey: ["faculty-list", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facultes")
        .select("*")
        .eq("id", id);
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useFacultyListWithId = (id: number) => {
  return useQuery({
    queryKey: ["faculty-list", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("facultes")
        .select("*")
        .eq("id", id);
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useDepartementList = () => {
  return useQuery({
    queryKey: ["departement-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("departements").select("*");
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useFiliereList = () => {
  return useQuery({
    queryKey: ["filiere-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("filieres").select("*");
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useNiveauList = () => {
  return useQuery({
    queryKey: ["niveau-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("niveaux").select("*");
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useAdminList = () => {
  return useQuery({
    queryKey: ["admin-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("admin").select("*");
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useAlertList = (id: string) => {
  return useQuery({
    queryKey: ["alert-list", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alertes")
        .select("*")
        .eq("uuid", id);
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useClassList = (id: number) => {
  return useQuery({
    queryKey: ["class-list", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("id", id);
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProfileList = () => {
  return useQuery({
    queryKey: ["profile-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      }
      return data;
    },
  });
};
