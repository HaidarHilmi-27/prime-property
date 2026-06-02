-- Jalankan SQL ini di Supabase Dashboard > SQL Editor
-- Fungsi ini membuat user auth + profile sekaligus tanpa rate limit

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

DROP FUNCTION IF EXISTS create_admin_user(TEXT, TEXT, TEXT);

CREATE OR REPLACE FUNCTION confirm_signup(p_email TEXT, p_role TEXT DEFAULT 'admin')
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM auth.users WHERE email = p_email LIMIT 1;

  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('error', 'User tidak ditemukan');
  END IF;

  -- Auto-confirm email
  UPDATE auth.users SET email_confirmed_at = now(), updated_at = now() WHERE id = v_user_id;

  -- Clean old identities & re-insert
  DELETE FROM auth.identities WHERE user_id = v_user_id;
  INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, created_at, updated_at, last_sign_in_at)
  VALUES (gen_random_uuid(), v_user_id, jsonb_build_object('sub', v_user_id::text, 'email', p_email), 'email', p_email, now(), now(), now());

  -- Upsert profile
  INSERT INTO public.profiles (id, email, role, is_active, created_at)
  VALUES (v_user_id, p_email, p_role::user_role, true, now())
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active;

  RETURN jsonb_build_object('id', v_user_id::text, 'email', p_email, 'status', 'confirmed');
END;
$$;
