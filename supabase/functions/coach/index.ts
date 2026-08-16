import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.87.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return json({ error: "Missing Authorization header" }, 401);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authorization } } },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return json({ error: "Unauthorized" }, 401);
  }

  const { data: recentSessions } = await supabase
    .from("focus_sessions")
    .select("planned_minutes, actual_minutes, status, started_at")
    .order("started_at", { ascending: false })
    .limit(10);

  const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are Forge's supportive productivity coach. Be specific, calm, brief, and never shame the user.",
        },
        {
          role: "user",
          content: `Create one coaching insight from these recent focus sessions: ${JSON.stringify(recentSessions ?? [])}`,
        },
      ],
      temperature: 0.4,
      max_tokens: 180,
    }),
  });

  if (!groqResponse.ok) {
    return json({ error: "Groq request failed" }, 502);
  }

  const completion = await groqResponse.json();
  const body = completion.choices?.[0]?.message?.content ?? "Protect your best focus window and start with one clear mission.";

  const { data: insight, error } = await supabase
    .from("ai_insights")
    .insert({
      user_id: user.id,
      insight_type: "groq_daily_coach",
      body,
      evidence: { recentSessions },
    })
    .select()
    .single();

  if (error) {
    return json({ error: error.message }, 500);
  }

  return json({ insight });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
