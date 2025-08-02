export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      analytics: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          file_size: number | null
          id: string
          ip_address: unknown | null
          processing_time: number | null
          project_id: string | null
          quality_score: number | null
          session_id: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          video_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          file_size?: number | null
          id?: string
          ip_address?: unknown | null
          processing_time?: number | null
          project_id?: string | null
          quality_score?: number | null
          session_id?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          video_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          file_size?: number | null
          id?: string
          ip_address?: unknown | null
          processing_time?: number | null
          project_id?: string | null
          quality_score?: number | null
          session_id?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          created_at: string
          id: string
          item_id: string
          item_name: string
          item_type: string
          metadata: Json | null
          price: number
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          item_id: string
          item_name: string
          item_type: string
          metadata?: Json | null
          price: number
          quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          item_id?: string
          item_name?: string
          item_type?: string
          metadata?: Json | null
          price?: number
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      code_examples: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          source_id: string
          summary: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          source_id: string
          summary: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          source_id?: string
          summary?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "code_examples_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["source_id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          subject?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          content: string
          content_type: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          published_at: string | null
          reading_time: number | null
          seo_keywords: string[] | null
          seo_score: number | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string | null
          word_count: number | null
        }
        Insert: {
          content: string
          content_type?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          reading_time?: number | null
          seo_keywords?: string[] | null
          seo_score?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
          word_count?: number | null
        }
        Update: {
          content?: string
          content_type?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          published_at?: string | null
          reading_time?: number | null
          seo_keywords?: string[] | null
          seo_score?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      content_performance: {
        Row: {
          comments: number | null
          content_id: string | null
          created_at: string | null
          engagement_rate: number | null
          id: string
          last_updated: string | null
          likes: number | null
          platform: string
          platform_id: string | null
          shares: number | null
          views: number | null
        }
        Insert: {
          comments?: number | null
          content_id?: string | null
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          last_updated?: string | null
          likes?: number | null
          platform: string
          platform_id?: string | null
          shares?: number | null
          views?: number | null
        }
        Update: {
          comments?: number | null
          content_id?: string | null
          created_at?: string | null
          engagement_rate?: number | null
          id?: string
          last_updated?: string | null
          likes?: number | null
          platform?: string
          platform_id?: string | null
          shares?: number | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_performance_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_performance_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_analytics"
            referencedColumns: ["id"]
          },
        ]
      }
      content_templates: {
        Row: {
          content_type: string
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          template_content: string
          updated_at: string | null
          usage_count: number | null
          user_id: string | null
        }
        Insert: {
          content_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          template_content: string
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Update: {
          content_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          template_content?: string
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_templates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_templates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      course_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          completed_at: string | null
          course_id: string | null
          enrolled_at: string
          id: string
          progress: number | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string
          id?: string
          progress?: number | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string
          id?: string
          progress?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_reviews: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          rating: number | null
          review_text: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          review_text?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
          rating?: number | null
          review_text?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_reviews_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          difficulty: string | null
          duration_hours: number | null
          enrollment_count: number | null
          id: string
          instructor_id: string | null
          is_published: boolean | null
          learning_outcomes: string[] | null
          price: number
          rating: number | null
          requirements: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_hours?: number | null
          enrollment_count?: number | null
          id?: string
          instructor_id?: string | null
          is_published?: boolean | null
          learning_outcomes?: string[] | null
          price?: number
          rating?: number | null
          requirements?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          duration_hours?: number | null
          enrollment_count?: number | null
          id?: string
          instructor_id?: string | null
          is_published?: boolean | null
          learning_outcomes?: string[] | null
          price?: number
          rating?: number | null
          requirements?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crawled_pages: {
        Row: {
          chunk_number: number
          content: string
          created_at: string
          embedding: string | null
          id: number
          metadata: Json
          source_id: string
          url: string
        }
        Insert: {
          chunk_number: number
          content: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          source_id: string
          url: string
        }
        Update: {
          chunk_number?: number
          content?: string
          created_at?: string
          embedding?: string | null
          id?: number
          metadata?: Json
          source_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "crawled_pages_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["source_id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          recipient_email: string
          sent_at: string | null
          status: string
          subject: string
          template_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          recipient_email: string
          sent_at?: string | null
          status?: string
          subject: string
          template_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          recipient_email?: string
          sent_at?: string | null
          status?: string
          subject?: string
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          created_at: string
          html_content: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          text_content: string | null
          updated_at: string
          variables: Json | null
        }
        Insert: {
          created_at?: string
          html_content: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          text_content?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Update: {
          created_at?: string
          html_content?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          text_content?: string | null
          updated_at?: string
          variables?: Json | null
        }
        Relationships: []
      }
      file_uploads: {
        Row: {
          bucket_name: string
          course_id: string | null
          created_at: string
          file_path: string
          file_size: number
          filename: string
          id: string
          is_processed: boolean | null
          mime_type: string
          original_filename: string
          processing_status: string | null
          upload_type: string
          uploaded_by: string | null
        }
        Insert: {
          bucket_name: string
          course_id?: string | null
          created_at?: string
          file_path: string
          file_size: number
          filename: string
          id?: string
          is_processed?: boolean | null
          mime_type: string
          original_filename: string
          processing_status?: string | null
          upload_type: string
          uploaded_by?: string | null
        }
        Update: {
          bucket_name?: string
          course_id?: string | null
          created_at?: string
          file_path?: string
          file_size?: number
          filename?: string
          id?: string
          is_processed?: boolean | null
          mime_type?: string
          original_filename?: string
          processing_status?: string | null
          upload_type?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "file_uploads_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "file_uploads_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          prompt: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          prompt: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          prompt?: string
          user_id?: string
        }
        Relationships: []
      }
      meeting_participants: {
        Row: {
          attended: boolean | null
          id: string
          join_time: string | null
          leave_time: string | null
          meeting_id: string | null
          registered_at: string
          user_id: string | null
        }
        Insert: {
          attended?: boolean | null
          id?: string
          join_time?: string | null
          leave_time?: string | null
          meeting_id?: string | null
          registered_at?: string
          user_id?: string | null
        }
        Update: {
          attended?: boolean | null
          id?: string
          join_time?: string | null
          leave_time?: string | null
          meeting_id?: string | null
          registered_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_participants_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          google_event_id: string | null
          id: string
          instructor_id: string | null
          max_participants: number | null
          scheduled_at: string
          title: string
          updated_at: string
          zoom_join_url: string | null
          zoom_meeting_id: string | null
          zoom_password: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          google_event_id?: string | null
          id?: string
          instructor_id?: string | null
          max_participants?: number | null
          scheduled_at: string
          title: string
          updated_at?: string
          zoom_join_url?: string | null
          zoom_meeting_id?: string | null
          zoom_password?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          google_event_id?: string | null
          id?: string
          instructor_id?: string | null
          max_participants?: number | null
          scheduled_at?: string
          title?: string
          updated_at?: string
          zoom_join_url?: string | null
          zoom_meeting_id?: string | null
          zoom_password?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meetings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          message: Json
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: Json
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: Json
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          created_at: string
          id: string
          items: Json
          status: string
          stripe_session_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          items: Json
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          items?: Json
          status?: string
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_confirmations: {
        Row: {
          confirmation_sent_at: string
          email: string
          email_status: string
          id: string
          order_id: string | null
          template_used: string
          user_id: string | null
        }
        Insert: {
          confirmation_sent_at?: string
          email: string
          email_status?: string
          id?: string
          order_id?: string | null
          template_used: string
          user_id?: string | null
        }
        Update: {
          confirmation_sent_at?: string
          email?: string
          email_status?: string
          id?: string
          order_id?: string | null
          template_used?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_confirmations_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          audio_path: string | null
          config: Json | null
          created_at: string | null
          description: string | null
          duration: number | null
          error_message: string | null
          file_size: number | null
          fps: number | null
          id: string
          keywords: string[] | null
          name: string
          processing_completed_at: string | null
          processing_started_at: string | null
          published_at: string | null
          published_url: string | null
          resolution: string | null
          script: string | null
          status: string | null
          thumbnail_path: string | null
          updated_at: string | null
          user_id: string | null
          video_path: string | null
        }
        Insert: {
          audio_path?: string | null
          config?: Json | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          error_message?: string | null
          file_size?: number | null
          fps?: number | null
          id?: string
          keywords?: string[] | null
          name: string
          processing_completed_at?: string | null
          processing_started_at?: string | null
          published_at?: string | null
          published_url?: string | null
          resolution?: string | null
          script?: string | null
          status?: string | null
          thumbnail_path?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_path?: string | null
        }
        Update: {
          audio_path?: string | null
          config?: Json | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          error_message?: string | null
          file_size?: number | null
          fps?: number | null
          id?: string
          keywords?: string[] | null
          name?: string
          processing_completed_at?: string | null
          processing_started_at?: string | null
          published_at?: string | null
          published_url?: string | null
          resolution?: string | null
          script?: string | null
          status?: string | null
          thumbnail_path?: string | null
          updated_at?: string | null
          user_id?: string | null
          video_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      publishing_queue: {
        Row: {
          content_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          platforms: string[]
          retry_count: number | null
          scheduled_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          content_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          platforms: string[]
          retry_count?: number | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          content_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          platforms?: string[]
          retry_count?: number | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "publishing_queue_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publishing_queue_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_analytics"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          questions: Json
          title: string
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          questions: Json
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
          questions?: Json
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_analytics: {
        Row: {
          click_through_rate: number | null
          clicks: number | null
          content_id: string | null
          created_at: string | null
          date_recorded: string | null
          difficulty: number | null
          id: string
          impressions: number | null
          keyword: string
          ranking: number | null
          search_volume: number | null
        }
        Insert: {
          click_through_rate?: number | null
          clicks?: number | null
          content_id?: string | null
          created_at?: string | null
          date_recorded?: string | null
          difficulty?: number | null
          id?: string
          impressions?: number | null
          keyword: string
          ranking?: number | null
          search_volume?: number | null
        }
        Update: {
          click_through_rate?: number | null
          clicks?: number | null
          content_id?: string | null
          created_at?: string | null
          date_recorded?: string | null
          difficulty?: number | null
          id?: string
          impressions?: number | null
          keyword?: string
          ranking?: number | null
          search_volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_analytics_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_analytics_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_analytics"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_cart: {
        Row: {
          added_at: string
          course_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          added_at?: string
          course_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          added_at?: string
          course_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_cart_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          created_at: string
          source_id: string
          summary: string | null
          total_word_count: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          source_id: string
          summary?: string | null
          total_word_count?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          source_id?: string
          summary?: string | null
          total_word_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      system_config: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_encrypted: boolean | null
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_encrypted?: boolean | null
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_encrypted?: boolean | null
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          completed_at: string | null
          created_at: string | null
          current_step: string | null
          description: string | null
          error_message: string | null
          id: string
          max_retries: number | null
          name: string
          output_files: string[] | null
          parameters: Json | null
          progress: number | null
          project_id: string | null
          result: Json | null
          retry_count: number | null
          started_at: string | null
          status: string | null
          task_type: string
          total_steps: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          description?: string | null
          error_message?: string | null
          id?: string
          max_retries?: number | null
          name: string
          output_files?: string[] | null
          parameters?: Json | null
          progress?: number | null
          project_id?: string | null
          result?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string | null
          task_type: string
          total_steps?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          current_step?: string | null
          description?: string | null
          error_message?: string | null
          id?: string
          max_retries?: number | null
          name?: string
          output_files?: string[] | null
          parameters?: Json | null
          progress?: number | null
          project_id?: string | null
          result?: Json | null
          retry_count?: number | null
          started_at?: string | null
          status?: string | null
          task_type?: string
          total_steps?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          auto_publish_platforms: string[] | null
          created_at: string | null
          default_keywords: string[] | null
          id: string
          notification_settings: Json | null
          preferred_length: string | null
          preferred_tone: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auto_publish_platforms?: string[] | null
          created_at?: string | null
          default_keywords?: string[] | null
          id?: string
          notification_settings?: Json | null
          preferred_length?: string | null
          preferred_tone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auto_publish_platforms?: string[] | null
          created_at?: string | null
          default_keywords?: string[] | null
          id?: string
          notification_settings?: Json | null
          preferred_length?: string | null
          preferred_tone?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_dashboard_stats"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_active: boolean
          last_name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          is_active?: boolean
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_active?: boolean
          last_name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string | null
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          last_login: string | null
          preferences: Json | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          auth_id?: string | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          preferences?: Json | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      vector_embeddings: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          dimensions: number
          embedding: string | null
          id: string
          metadata: string
          model: string
          text_content: string
          updated_at: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          dimensions: number
          embedding?: string | null
          id?: string
          metadata: string
          model: string
          text_content: string
          updated_at?: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          dimensions?: number
          embedding?: string | null
          id?: string
          metadata?: string
          model?: string
          text_content?: string
          updated_at?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          bitrate: number | null
          codec: string | null
          created_at: string | null
          description: string | null
          download_count: number | null
          duration: number | null
          error_message: string | null
          file_format: string | null
          file_path: string | null
          file_size: number | null
          fps: number | null
          generation_config: Json | null
          generation_log: string[] | null
          id: string
          processing_completed_at: string | null
          processing_started_at: string | null
          project_id: string | null
          resolution: string | null
          status: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          bitrate?: number | null
          codec?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          duration?: number | null
          error_message?: string | null
          file_format?: string | null
          file_path?: string | null
          file_size?: number | null
          fps?: number | null
          generation_config?: Json | null
          generation_log?: string[] | null
          id?: string
          processing_completed_at?: string | null
          processing_started_at?: string | null
          project_id?: string | null
          resolution?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          bitrate?: number | null
          codec?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          duration?: number | null
          error_message?: string | null
          file_format?: string | null
          file_path?: string | null
          file_size?: number | null
          fps?: number | null
          generation_config?: Json | null
          generation_log?: string[] | null
          id?: string
          processing_completed_at?: string | null
          processing_started_at?: string | null
          project_id?: string | null
          resolution?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      content_analytics: {
        Row: {
          avg_engagement_rate: number | null
          created_at: string | null
          id: string | null
          published_at: string | null
          reading_time: number | null
          seo_score: number | null
          status: string | null
          title: string | null
          total_comments: number | null
          total_likes: number | null
          total_shares: number | null
          total_views: number | null
          word_count: number | null
        }
        Relationships: []
      }
      user_dashboard_stats: {
        Row: {
          avg_seo_score: number | null
          content_today: number | null
          draft_content: number | null
          published_content: number | null
          total_content: number | null
          total_views: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_current_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      has_role: {
        Args: {
          user_id: string
          role_name: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never> | { user_id: string }
        Returns: boolean
      }
      is_instructor: {
        Args: { user_id: string }
        Returns: boolean
      }
      match_code_examples: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
          source_filter?: string
        }
        Returns: {
          id: number
          url: string
          chunk_number: number
          content: string
          summary: string
          metadata: Json
          source_id: string
          similarity: number
        }[]
      }
      match_crawled_pages: {
        Args: {
          query_embedding: string
          match_count?: number
          filter?: Json
          source_filter?: string
        }
        Returns: {
          id: number
          url: string
          chunk_number: number
          content: string
          metadata: Json
          source_id: string
          similarity: number
        }[]
      }
    }
    Enums: {
      user_role: "admin" | "instructor" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "instructor", "student"],
    },
  },
} as const
