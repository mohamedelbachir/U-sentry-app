export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin: {
        Row: {
          fonction: number
          id: number
          uuid: string
        }
        Insert: {
          fonction: number
          id?: number
          uuid: string
        }
        Update: {
          fonction?: number
          id?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_admin_fonction_fkey"
            columns: ["fonction"]
            isOneToOne: false
            referencedRelation: "facultes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_admin_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      alertes: {
        Row: {
          content: string | null
          create_at: string | null
          description: string | null
          hash: string | null
          id: number
          imageURL: string | null
          target: Json | null
          title: string
          uuid: string
        }
        Insert: {
          content?: string | null
          create_at?: string | null
          description?: string | null
          hash?: string | null
          id?: number
          imageURL?: string | null
          target?: Json | null
          title?: string
          uuid: string
        }
        Update: {
          content?: string | null
          create_at?: string | null
          description?: string | null
          hash?: string | null
          id?: number
          imageURL?: string | null
          target?: Json | null
          title?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_alertes_admin_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_alertes_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      classes: {
        Row: {
          departement_id: number
          faculte_id: number
          filiere_id: number
          id: number
          niveau_id: number
        }
        Insert: {
          departement_id: number
          faculte_id: number
          filiere_id: number
          id?: number
          niveau_id: number
        }
        Update: {
          departement_id?: number
          faculte_id?: number
          filiere_id?: number
          id?: number
          niveau_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_classes_departement_id_fkey"
            columns: ["departement_id"]
            isOneToOne: false
            referencedRelation: "departements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_classes_faculte_id_fkey"
            columns: ["faculte_id"]
            isOneToOne: false
            referencedRelation: "facultes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_classes_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "filieres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_classes_niveau_id_fkey"
            columns: ["niveau_id"]
            isOneToOne: false
            referencedRelation: "niveaux"
            referencedColumns: ["id"]
          }
        ]
      }
      departements: {
        Row: {
          faculte_id: number
          id: number
          nom: string
        }
        Insert: {
          faculte_id: number
          id?: number
          nom?: string
        }
        Update: {
          faculte_id?: number
          id?: number
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_departements_faculte_id_fkey"
            columns: ["faculte_id"]
            isOneToOne: false
            referencedRelation: "facultes"
            referencedColumns: ["id"]
          }
        ]
      }
      etudiants: {
        Row: {
          classe_id: number
          id: number
          uuid: string
        }
        Insert: {
          classe_id: number
          id?: number
          uuid: string
        }
        Update: {
          classe_id?: number
          id?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_etudiant_classe_id_fkey"
            columns: ["classe_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_etudiant_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      facultes: {
        Row: {
          id: number
          nom: string
        }
        Insert: {
          id?: number
          nom: string
        }
        Update: {
          id?: number
          nom?: string
        }
        Relationships: []
      }
      filieres: {
        Row: {
          departement_id: number
          faculte_id: number
          id: number
          nom: string
        }
        Insert: {
          departement_id: number
          faculte_id: number
          id?: number
          nom: string
        }
        Update: {
          departement_id?: number
          faculte_id?: number
          id?: number
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_filieres_departement_id_fkey"
            columns: ["departement_id"]
            isOneToOne: false
            referencedRelation: "departements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_filieres_faculte_id_fkey"
            columns: ["faculte_id"]
            isOneToOne: false
            referencedRelation: "facultes"
            referencedColumns: ["id"]
          }
        ]
      }
      niveaux: {
        Row: {
          departement_id: number
          faculte_id: number
          filiere_id: number
          id: number
          nom: string
        }
        Insert: {
          departement_id: number
          faculte_id: number
          filiere_id: number
          id?: number
          nom?: string
        }
        Update: {
          departement_id?: number
          faculte_id?: number
          filiere_id?: number
          id?: number
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_niveaux_departement_id_fkey"
            columns: ["departement_id"]
            isOneToOne: false
            referencedRelation: "departements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_niveaux_faculte_id_fkey"
            columns: ["faculte_id"]
            isOneToOne: false
            referencedRelation: "facultes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_niveaux_filiere_id_fkey"
            columns: ["filiere_id"]
            isOneToOne: false
            referencedRelation: "filieres"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string
          user_metadata: Json | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string
          user_metadata?: Json | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string
          user_metadata?: Json | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
