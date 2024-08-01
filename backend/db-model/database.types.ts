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
      course_names: {
        Row: {
          chinese: string | null
          course_id: number
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          english: string | null
          id: number
          modified_by: string | null
          modified_dt: string | null
        }
        Insert: {
          chinese?: string | null
          course_id?: number
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          english?: string | null
          id?: number
          modified_by?: string | null
          modified_dt?: string | null
        }
        Update: {
          chinese?: string | null
          course_id?: number
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          english?: string | null
          id?: number
          modified_by?: string | null
          modified_dt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_names_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          end_date: string | null
          end_time: string
          id: number
          is_active: boolean
          modified_by: string | null
          modified_dt: string | null
          on_friday: boolean | null
          on_monday: boolean | null
          on_saturday: boolean | null
          on_sunday: boolean | null
          on_thursday: boolean | null
          on_tuesday: boolean | null
          on_wednesday: boolean | null
          quota: number
          start_date: string
          start_time: string
        }
        Insert: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          end_date?: string | null
          end_time: string
          id?: number
          is_active?: boolean
          modified_by?: string | null
          modified_dt?: string | null
          on_friday?: boolean | null
          on_monday?: boolean | null
          on_saturday?: boolean | null
          on_sunday?: boolean | null
          on_thursday?: boolean | null
          on_tuesday?: boolean | null
          on_wednesday?: boolean | null
          quota?: number
          start_date: string
          start_time: string
        }
        Update: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          end_date?: string | null
          end_time?: string
          id?: number
          is_active?: boolean
          modified_by?: string | null
          modified_dt?: string | null
          on_friday?: boolean | null
          on_monday?: boolean | null
          on_saturday?: boolean | null
          on_sunday?: boolean | null
          on_thursday?: boolean | null
          on_tuesday?: boolean | null
          on_wednesday?: boolean | null
          quota?: number
          start_date?: string
          start_time?: string
        }
        Relationships: []
      }
      emergency_contact: {
        Row: {
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          id: number
          modified_by: string | null
          modified_dt: string | null
          name: string | null
          relationship: string | null
          tel: string | null
        }
        Insert: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          id?: number
          modified_by?: string | null
          modified_dt?: string | null
          name?: string | null
          relationship?: string | null
          tel?: string | null
        }
        Update: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          id?: number
          modified_by?: string | null
          modified_dt?: string | null
          name?: string | null
          relationship?: string | null
          tel?: string | null
        }
        Relationships: []
      }
      parents: {
        Row: {
          address: string | null
          city: string | null
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          email: string | null
          id: number
          modified_by: string | null
          modified_dt: string | null
          postcode: string | null
          tel: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          email?: string | null
          id?: number
          modified_by?: string | null
          modified_dt?: string | null
          postcode?: string | null
          tel?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          email?: string | null
          id?: number
          modified_by?: string | null
          modified_dt?: string | null
          postcode?: string | null
          tel?: string | null
        }
        Relationships: []
      }
      registered_courses: {
        Row: {
          course_id: number
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          emergency_contact_id: number | null
          id: number
          is_active: boolean
          modified_by: string | null
          modified_dt: string | null
          pickup_arrangements: string | null
          special_needs: string | null
          student_id: number
        }
        Insert: {
          course_id: number
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          emergency_contact_id?: number | null
          id?: number
          is_active?: boolean
          modified_by?: string | null
          modified_dt?: string | null
          pickup_arrangements?: string | null
          special_needs?: string | null
          student_id: number
        }
        Update: {
          course_id?: number
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          emergency_contact_id?: number | null
          id?: number
          is_active?: boolean
          modified_by?: string | null
          modified_dt?: string | null
          pickup_arrangements?: string | null
          special_needs?: string | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "registered_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registered_courses_emergency_contact_id_fkey"
            columns: ["emergency_contact_id"]
            isOneToOne: false
            referencedRelation: "emergency_contact"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registered_courses_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      rel_parent_student: {
        Row: {
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          id: number
          modified_by: string | null
          modified_dt: string | null
          parent_id: number
          parent_rel: string | null
          student_id: number
          student_rel: string | null
        }
        Insert: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          id?: number
          modified_by?: string | null
          modified_dt?: string | null
          parent_id: number
          parent_rel?: string | null
          student_id: number
          student_rel?: string | null
        }
        Update: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          id?: number
          modified_by?: string | null
          modified_dt?: string | null
          parent_id?: number
          parent_rel?: string | null
          student_id?: number
          student_rel?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rel_parent_student_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rel_parent_student_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      rel_survey_course: {
        Row: {
          course_id: number
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          id: number
          is_active: boolean
          modified_by: string | null
          modified_dt: string | null
          survey_id: number
        }
        Insert: {
          course_id: number
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          id?: number
          is_active?: boolean
          modified_by?: string | null
          modified_dt?: string | null
          survey_id: number
        }
        Update: {
          course_id?: number
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          id?: number
          is_active?: boolean
          modified_by?: string | null
          modified_dt?: string | null
          survey_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "rel_survey_course_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rel_survey_course_survey_id_fkey"
            columns: ["survey_id"]
            isOneToOne: false
            referencedRelation: "survey"
            referencedColumns: ["id"]
          },
        ]
      }
      staff: {
        Row: {
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          email: string | null
          firstname: string | null
          id: number
          is_active: boolean
          lastname: string | null
          modified_by: string | null
          modified_dt: string | null
          tel: string | null
        }
        Insert: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          email?: string | null
          firstname?: string | null
          id?: number
          is_active?: boolean
          lastname?: string | null
          modified_by?: string | null
          modified_dt?: string | null
          tel?: string | null
        }
        Update: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          email?: string | null
          firstname?: string | null
          id?: number
          is_active?: boolean
          lastname?: string | null
          modified_by?: string | null
          modified_dt?: string | null
          tel?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          dob: string | null
          firstname: string
          gender: string | null
          id: number
          is_active: boolean
          lastname: string
          modified_by: string | null
          modified_dt: string | null
        }
        Insert: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          dob?: string | null
          firstname: string
          gender?: string | null
          id?: number
          is_active: boolean
          lastname: string
          modified_by?: string | null
          modified_dt?: string | null
        }
        Update: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          dob?: string | null
          firstname?: string
          gender?: string | null
          id?: number
          is_active?: boolean
          lastname?: string
          modified_by?: string | null
          modified_dt?: string | null
        }
        Relationships: []
      }
      survey: {
        Row: {
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          id: number
          is_active: boolean
          modified_by: string | null
          modified_dt: string | null
        }
        Insert: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          id?: number
          is_active?: boolean
          modified_by?: string | null
          modified_dt?: string | null
        }
        Update: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          id?: number
          is_active?: boolean
          modified_by?: string | null
          modified_dt?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          created_by: string
          created_dt: string
          deleted_by: string | null
          deleted_dt: string | null
          email: string | null
          id: number
          identity: string
          is_active: boolean | null
          is_first_time: boolean
          modified_by: string | null
          modified_dt: string | null
          otp: string | null
          parent_id: number | null
          staff_id: number | null
          student_id: number | null
          tel: string | null
          username: string
        }
        Insert: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          email?: string | null
          id?: number
          identity: string
          is_active?: boolean | null
          is_first_time?: boolean
          modified_by?: string | null
          modified_dt?: string | null
          otp?: string | null
          parent_id?: number | null
          staff_id?: number | null
          student_id?: number | null
          tel?: string | null
          username: string
        }
        Update: {
          created_by?: string
          created_dt?: string
          deleted_by?: string | null
          deleted_dt?: string | null
          email?: string | null
          id?: number
          identity?: string
          is_active?: boolean | null
          is_first_time?: boolean
          modified_by?: string | null
          modified_dt?: string | null
          otp?: string | null
          parent_id?: number | null
          staff_id?: number | null
          student_id?: number | null
          tel?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
