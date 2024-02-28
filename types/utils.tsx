import { Database } from "@/supabase/supabase";

export type alertType = {
  id: number;
  title: string;
  description: string;
};

export type publicationPost = {
  id: number;
  description: string;
  created_at?: number;
  admin_uuid?: string;
  title: string;
  imageURL?: string;
};

export type classes = {
  id: number;
  niveau_id: number;
  departement_id: number;
  faculte_id: number;
  filiere_id: number;
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
