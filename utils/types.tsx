import { Json } from "@/supabase/supabase";

export type postType = {
  content: string | null;
  create_at: string | null;
  description: string | null;
  hash: string | null;
  id: number;
  imageURL: string | null;
  title: string;
  uuid: string;
  target?:
    | {
        facId?: number[];
        depId?: number[];
        filiereId?: number[];
        niveauId?: number[];
      }
    | null
    | Json;
};
