"use client";

import { useEffect, useState } from "react";
import type { EmailOtpType } from "@supabase/supabase-js";
import type { AdminCopy } from "@/lib/admin/copy";
import { createBrowserAuthClient } from "@/lib/supabase/client";

function safeNext(value: string | null) {
  if (value && value.startsWith("/admin") && !value.startsWith("//")) {
    return value;
  }
  return null;
}

function isPasswordSetup(type: string | null) {
  return type === "invite" || type === "recovery" || type === "signup";
}

export function AuthCallback({ copy }: { copy: AdminCopy }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function complete() {
      const supabase = createBrowserAuthClient();
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const next = safeNext(url.searchParams.get("next"));
      const code = url.searchParams.get("code");
      const tokenHash = url.searchParams.get("token_hash");
      const queryType = url.searchParams.get("type");
      const hashType = hash.get("type");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      let ok = false;

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        ok = !error;
      } else if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        ok = !error;
      } else if (tokenHash) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: (queryType || "invite") as EmailOtpType,
        });
        ok = !error;
      }

      if (cancelled) {
        return;
      }

      if (!ok) {
        setFailed(true);
        return;
      }

      const destination =
        next ?? (isPasswordSetup(hashType || queryType) ? "/admin/reset" : "/admin");
      window.location.replace(destination);
    }

    complete();
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div className="grid gap-4">
        <p className="font-serif text-lg leading-8 text-ivory/80">{copy.linkError}</p>
        <a href="/admin/forgot" className="font-sans text-sm text-ivory underline-offset-4 hover:underline">
          {copy.forgot}
        </a>
      </div>
    );
  }

  return <p className="font-serif text-lg leading-8 text-ivory/80">{copy.openingSession}</p>;
}
