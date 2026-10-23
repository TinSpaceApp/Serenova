/* Generated from the live Serenova Supabase schema. Do not edit by hand. */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          actor_id: string | null
          actor_type: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_type: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_type?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_profiles: {
        Row: {
          created_at: string
          display_name: string | null
          email: string
          id: string
          is_active: boolean
          locale: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email: string
          id: string
          is_active?: boolean
          locale?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email?: string
          id?: string
          is_active?: boolean
          locale?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          allowed_currencies: string[]
          auto_prepare_deposit_invoice: boolean
          auto_reminders_enabled: boolean
          booking_terms: string | null
          cancellation_terms: string | null
          city: string | null
          contact_email: string | null
          contact_phone: string | null
          country: string | null
          data_retention_days: number | null
          default_currency: string
          default_deposit_percent: number
          default_payment_due_days: number
          default_quote_validity_days: number
          excludes_default: string | null
          from_name: string
          id: number
          includes_default: string | null
          legal_name: string | null
          notification_email: string | null
          payment_terms: string | null
          postal_code: string | null
          practical_info: string | null
          reply_to_email: string | null
          require_admin_send_deposit_invoice: boolean
          tax_enabled: boolean
          tax_label: string | null
          tax_rate_bps: number
          trading_name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          allowed_currencies?: string[]
          auto_prepare_deposit_invoice?: boolean
          auto_reminders_enabled?: boolean
          booking_terms?: string | null
          cancellation_terms?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          data_retention_days?: number | null
          default_currency?: string
          default_deposit_percent?: number
          default_payment_due_days?: number
          default_quote_validity_days?: number
          excludes_default?: string | null
          from_name?: string
          id?: number
          includes_default?: string | null
          legal_name?: string | null
          notification_email?: string | null
          payment_terms?: string | null
          postal_code?: string | null
          practical_info?: string | null
          reply_to_email?: string | null
          require_admin_send_deposit_invoice?: boolean
          tax_enabled?: boolean
          tax_label?: string | null
          tax_rate_bps?: number
          trading_name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          allowed_currencies?: string[]
          auto_prepare_deposit_invoice?: boolean
          auto_reminders_enabled?: boolean
          booking_terms?: string | null
          cancellation_terms?: string | null
          city?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          data_retention_days?: number | null
          default_currency?: string
          default_deposit_percent?: number
          default_payment_due_days?: number
          default_quote_validity_days?: number
          excludes_default?: string | null
          from_name?: string
          id?: number
          includes_default?: string | null
          legal_name?: string | null
          notification_email?: string | null
          payment_terms?: string | null
          postal_code?: string | null
          practical_info?: string | null
          reply_to_email?: string | null
          require_admin_send_deposit_invoice?: boolean
          tax_enabled?: boolean
          tax_label?: string | null
          tax_rate_bps?: number
          trading_name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          balance_cents: number
          balance_due_at: string | null
          confirmed_at: string | null
          created_at: string
          currency: string
          customer_id: string
          deposit_expected_cents: number
          deposit_received_cents: number
          id: string
          quote_id: string
          quote_version_id: string
          request_id: string
          status: string
          stripe_customer_id: string | null
          total_cents: number
          updated_at: string
        }
        Insert: {
          balance_cents: number
          balance_due_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          currency: string
          customer_id: string
          deposit_expected_cents: number
          deposit_received_cents?: number
          id?: string
          quote_id: string
          quote_version_id: string
          request_id: string
          status?: string
          stripe_customer_id?: string | null
          total_cents: number
          updated_at?: string
        }
        Update: {
          balance_cents?: number
          balance_due_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          currency?: string
          customer_id?: string
          deposit_expected_cents?: number
          deposit_received_cents?: number
          id?: string
          quote_id?: string
          quote_version_id?: string
          request_id?: string
          status?: string
          stripe_customer_id?: string | null
          total_cents?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_quote_version_id_fkey"
            columns: ["quote_version_id"]
            isOneToOne: true
            referencedRelation: "quote_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "travel_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          contact_preference: string | null
          country: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          locale: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          contact_preference?: string | null
          country?: string | null
          created_at?: string
          email: string
          first_name?: string
          id?: string
          last_name?: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          contact_preference?: string | null
          country?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          bucket_id: string
          created_at: string
          filename: string
          id: string
          invoice_id: string | null
          kind: string
          quote_id: string | null
          quote_version_id: string | null
          request_id: string | null
          storage_path: string
        }
        Insert: {
          bucket_id?: string
          created_at?: string
          filename: string
          id?: string
          invoice_id?: string | null
          kind: string
          quote_id?: string | null
          quote_version_id?: string | null
          request_id?: string | null
          storage_path: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          filename?: string
          id?: string
          invoice_id?: string | null
          kind?: string
          quote_id?: string | null
          quote_version_id?: string | null
          request_id?: string | null
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_quote_version_id_fkey"
            columns: ["quote_version_id"]
            isOneToOne: false
            referencedRelation: "quote_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "travel_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      email_messages: {
        Row: {
          created_at: string
          customer_id: string | null
          delivered_at: string | null
          error: string | null
          id: string
          invoice_id: string | null
          locale: string | null
          quote_id: string | null
          reply_to: string | null
          request_id: string | null
          resend_id: string | null
          sent_at: string | null
          status: string
          template_slug: string | null
          to_email: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          delivered_at?: string | null
          error?: string | null
          id?: string
          invoice_id?: string | null
          locale?: string | null
          quote_id?: string | null
          reply_to?: string | null
          request_id?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string
          template_slug?: string | null
          to_email: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          delivered_at?: string | null
          error?: string | null
          id?: string
          invoice_id?: string | null
          locale?: string | null
          quote_id?: string | null
          reply_to?: string | null
          request_id?: string | null
          resend_id?: string | null
          sent_at?: string | null
          status?: string
          template_slug?: string | null
          to_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_messages_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_messages_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_messages_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_messages_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "travel_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          approved: boolean
          body_html: string | null
          body_text: string | null
          id: string
          locale: string
          preview_text: string | null
          slug: string
          subject: string
          updated_at: string
        }
        Insert: {
          approved?: boolean
          body_html?: string | null
          body_text?: string | null
          id?: string
          locale: string
          preview_text?: string | null
          slug: string
          subject: string
          updated_at?: string
        }
        Update: {
          approved?: boolean
          body_html?: string | null
          body_text?: string | null
          id?: string
          locale?: string
          preview_text?: string | null
          slug?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount_cents: number
          balance_remaining_cents: number
          booking_id: string | null
          created_at: string
          currency: string
          customer_id: string
          due_at: string | null
          hosted_invoice_url: string | null
          id: string
          invoice_pdf_url: string | null
          kind: string
          paid_at: string | null
          quote_id: string
          quote_total_cents: number
          quote_version_id: string
          reference: string
          sent_at: string | null
          status: string
          stripe_checkout_session_id: string | null
          stripe_invoice_id: string | null
          updated_at: string
        }
        Insert: {
          amount_cents: number
          balance_remaining_cents: number
          booking_id?: string | null
          created_at?: string
          currency: string
          customer_id: string
          due_at?: string | null
          hosted_invoice_url?: string | null
          id?: string
          invoice_pdf_url?: string | null
          kind: string
          paid_at?: string | null
          quote_id: string
          quote_total_cents: number
          quote_version_id: string
          reference: string
          sent_at?: string | null
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_invoice_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          balance_remaining_cents?: number
          booking_id?: string | null
          created_at?: string
          currency?: string
          customer_id?: string
          due_at?: string | null
          hosted_invoice_url?: string | null
          id?: string
          invoice_pdf_url?: string | null
          kind?: string
          paid_at?: string | null
          quote_id?: string
          quote_total_cents?: number
          quote_version_id?: string
          reference?: string
          sent_at?: string | null
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_invoice_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_quote_version_id_fkey"
            columns: ["quote_version_id"]
            isOneToOne: false
            referencedRelation: "quote_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          context: Json | null
          created_at: string
          id: string
          kind: string
          locale: string | null
          payload: Json
          source_page: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string
          id?: string
          kind: string
          locale?: string | null
          payload: Json
          source_page?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string
          id?: string
          kind?: string
          locale?: string | null
          payload?: Json
          source_page?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          booking_id: string | null
          created_at: string
          currency: string
          failure_code: string | null
          id: string
          invoice_id: string
          paid_at: string | null
          provider: string
          provider_event_id: string | null
          status: string
          stripe_charge_id: string | null
          stripe_payment_intent_id: string | null
        }
        Insert: {
          amount_cents: number
          booking_id?: string | null
          created_at?: string
          currency: string
          failure_code?: string | null
          id?: string
          invoice_id: string
          paid_at?: string | null
          provider?: string
          provider_event_id?: string | null
          status: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Update: {
          amount_cents?: number
          booking_id?: string | null
          created_at?: string
          currency?: string
          failure_code?: string | null
          id?: string
          invoice_id?: string
          paid_at?: string | null
          provider?: string
          provider_event_id?: string | null
          status?: string
          stripe_charge_id?: string | null
          stripe_payment_intent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_acceptances: {
        Row: {
          accepted_at: string
          consent_text: string
          created_at: string
          declared_email: string
          declared_name: string
          id: string
          ip_hash: string | null
          quote_id: string
          terms_version: string | null
          user_agent: string | null
          version_id: string
        }
        Insert: {
          accepted_at?: string
          consent_text: string
          created_at?: string
          declared_email: string
          declared_name: string
          id?: string
          ip_hash?: string | null
          quote_id: string
          terms_version?: string | null
          user_agent?: string | null
          version_id: string
        }
        Update: {
          accepted_at?: string
          consent_text?: string
          created_at?: string
          declared_email?: string
          declared_name?: string
          id?: string
          ip_hash?: string | null
          quote_id?: string
          terms_version?: string | null
          user_agent?: string | null
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_acceptances_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_acceptances_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "quote_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_blocks: {
        Row: {
          activities: string | null
          created_at: string
          description: string | null
          destination: string | null
          extras: string | null
          id: string
          inclusions: string | null
          locale: string
          lodging: string | null
          meals: string | null
          title: string
          updated_at: string
        }
        Insert: {
          activities?: string | null
          created_at?: string
          description?: string | null
          destination?: string | null
          extras?: string | null
          id?: string
          inclusions?: string | null
          locale?: string
          lodging?: string | null
          meals?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          activities?: string | null
          created_at?: string
          description?: string | null
          destination?: string | null
          extras?: string | null
          id?: string
          inclusions?: string | null
          locale?: string
          lodging?: string | null
          meals?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      quote_days: {
        Row: {
          activities: string | null
          day_number: number
          description: string | null
          destination: string | null
          extras: string | null
          id: string
          inclusions: string | null
          lodging: string | null
          meals: string | null
          sort_order: number
          title: string
          version_id: string
        }
        Insert: {
          activities?: string | null
          day_number: number
          description?: string | null
          destination?: string | null
          extras?: string | null
          id?: string
          inclusions?: string | null
          lodging?: string | null
          meals?: string | null
          sort_order?: number
          title: string
          version_id: string
        }
        Update: {
          activities?: string | null
          day_number?: number
          description?: string | null
          destination?: string | null
          extras?: string | null
          id?: string
          inclusions?: string | null
          lodging?: string | null
          meals?: string | null
          sort_order?: number
          title?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_days_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "quote_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_line_items: {
        Row: {
          amount_cents: number
          description: string
          id: string
          kind: string
          quantity: number
          sort_order: number
          unit_amount_cents: number
          version_id: string
        }
        Insert: {
          amount_cents?: number
          description: string
          id?: string
          kind: string
          quantity?: number
          sort_order?: number
          unit_amount_cents?: number
          version_id: string
        }
        Update: {
          amount_cents?: number
          description?: string
          id?: string
          kind?: string
          quantity?: number
          sort_order?: number
          unit_amount_cents?: number
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_line_items_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "quote_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_versions: {
        Row: {
          balance_cents: number
          booking_terms: string | null
          cancellation_terms: string | null
          created_at: string
          currency: string
          date_from: string | null
          date_to: string | null
          deposit_amount_cents: number
          deposit_due_at: string | null
          deposit_percent: number | null
          deposit_type: string
          destination: string | null
          duration_nights: number | null
          excludes: string | null
          id: string
          includes: string | null
          issued_at: string | null
          locked_at: string | null
          payment_terms: string | null
          pdf_storage_path: string | null
          practical_info: string | null
          public_token_expires_at: string | null
          public_token_hash: string | null
          public_token_revoked_at: string | null
          quote_id: string
          subtotal_cents: number
          tax_cents: number
          tax_enabled: boolean
          tax_label: string | null
          tax_rate_bps: number
          title: string
          total_cents: number
          travellers_adults: number | null
          travellers_children: number | null
          valid_until: string | null
          version_number: number
        }
        Insert: {
          balance_cents?: number
          booking_terms?: string | null
          cancellation_terms?: string | null
          created_at?: string
          currency: string
          date_from?: string | null
          date_to?: string | null
          deposit_amount_cents?: number
          deposit_due_at?: string | null
          deposit_percent?: number | null
          deposit_type?: string
          destination?: string | null
          duration_nights?: number | null
          excludes?: string | null
          id?: string
          includes?: string | null
          issued_at?: string | null
          locked_at?: string | null
          payment_terms?: string | null
          pdf_storage_path?: string | null
          practical_info?: string | null
          public_token_expires_at?: string | null
          public_token_hash?: string | null
          public_token_revoked_at?: string | null
          quote_id: string
          subtotal_cents?: number
          tax_cents?: number
          tax_enabled?: boolean
          tax_label?: string | null
          tax_rate_bps?: number
          title: string
          total_cents?: number
          travellers_adults?: number | null
          travellers_children?: number | null
          valid_until?: string | null
          version_number: number
        }
        Update: {
          balance_cents?: number
          booking_terms?: string | null
          cancellation_terms?: string | null
          created_at?: string
          currency?: string
          date_from?: string | null
          date_to?: string | null
          deposit_amount_cents?: number
          deposit_due_at?: string | null
          deposit_percent?: number | null
          deposit_type?: string
          destination?: string | null
          duration_nights?: number | null
          excludes?: string | null
          id?: string
          includes?: string | null
          issued_at?: string | null
          locked_at?: string | null
          payment_terms?: string | null
          pdf_storage_path?: string | null
          practical_info?: string | null
          public_token_expires_at?: string | null
          public_token_hash?: string | null
          public_token_revoked_at?: string | null
          quote_id?: string
          subtotal_cents?: number
          tax_cents?: number
          tax_enabled?: boolean
          tax_label?: string | null
          tax_rate_bps?: number
          title?: string
          total_cents?: number
          travellers_adults?: number | null
          travellers_children?: number | null
          valid_until?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_versions_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          accepted_at: string | null
          created_at: string
          created_by: string | null
          currency: string
          current_version_id: string | null
          customer_id: string
          id: string
          reference: string
          request_id: string
          sent_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          current_version_id?: string | null
          customer_id: string
          id?: string
          reference?: string
          request_id: string
          sent_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          current_version_id?: string | null
          customer_id?: string
          id?: string
          reference?: string
          request_id?: string
          sent_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_current_version_id_fkey"
            columns: ["current_version_id"]
            isOneToOne: false
            referencedRelation: "quote_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "travel_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_request_notes: {
        Row: {
          author_id: string | null
          body: string
          created_at: string
          id: string
          request_id: string
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string
          id?: string
          request_id: string
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string
          id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_request_notes_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travel_request_notes_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "travel_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_request_status_history: {
        Row: {
          actor_id: string | null
          created_at: string
          from_status: string | null
          id: string
          note: string | null
          request_id: string
          to_status: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          from_status?: string | null
          id?: string
          note?: string | null
          request_id: string
          to_status: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          from_status?: string | null
          id?: string
          note?: string | null
          request_id?: string
          to_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_request_status_history_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travel_request_status_history_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "travel_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_requests: {
        Row: {
          accommodation_type: string | null
          adults: number | null
          assigned_to: string | null
          budget_amount_cents: number | null
          budget_currency: string | null
          child_ages: string | null
          children: number | null
          client_notes: string | null
          created_at: string
          customer_id: string
          date_from: string | null
          date_to: string | null
          dates_label: string | null
          destination: string | null
          destinations: Json
          flexible: boolean | null
          id: string
          interests: string | null
          lead_id: string | null
          locale: string
          nights: number | null
          occasion: string | null
          raw_payload: Json
          source_form: string
          source_page: string | null
          status: string
          styles: Json
          trip_type: string | null
          updated_at: string
        }
        Insert: {
          accommodation_type?: string | null
          adults?: number | null
          assigned_to?: string | null
          budget_amount_cents?: number | null
          budget_currency?: string | null
          child_ages?: string | null
          children?: number | null
          client_notes?: string | null
          created_at?: string
          customer_id: string
          date_from?: string | null
          date_to?: string | null
          dates_label?: string | null
          destination?: string | null
          destinations?: Json
          flexible?: boolean | null
          id?: string
          interests?: string | null
          lead_id?: string | null
          locale?: string
          nights?: number | null
          occasion?: string | null
          raw_payload?: Json
          source_form: string
          source_page?: string | null
          status?: string
          styles?: Json
          trip_type?: string | null
          updated_at?: string
        }
        Update: {
          accommodation_type?: string | null
          adults?: number | null
          assigned_to?: string | null
          budget_amount_cents?: number | null
          budget_currency?: string | null
          child_ages?: string | null
          children?: number | null
          client_notes?: string | null
          created_at?: string
          customer_id?: string
          date_from?: string | null
          date_to?: string | null
          dates_label?: string | null
          destination?: string | null
          destinations?: Json
          flexible?: boolean | null
          id?: string
          interests?: string | null
          lead_id?: string | null
          locale?: string
          nights?: number | null
          occasion?: string | null
          raw_payload?: Json
          source_form?: string
          source_page?: string | null
          status?: string
          styles?: Json
          trip_type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "admin_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travel_requests_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travel_requests_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          created_at: string
          error: string | null
          event_type: string
          id: string
          payload: Json | null
          processed_at: string | null
          provider: string
          provider_event_id: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          event_type: string
          id?: string
          payload?: Json | null
          processed_at?: string | null
          provider: string
          provider_event_id: string
        }
        Update: {
          created_at?: string
          error?: string | null
          event_type?: string
          id?: string
          payload?: Json | null
          processed_at?: string | null
          provider?: string
          provider_event_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
