import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_FROM = "orders@resend.dev";
const RESEND_TO = "kbishtawi28@gmail.com";

async function getResendApiKey(): Promise<string | null> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("VITE_SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return null;
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await supabase
    .from("app_secrets")
    .select("value")
    .eq("key", "RESEND_API_KEY")
    .maybeSingle();
  if (error || !data) return null;
  return data.value;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, phone, city, address, color, quantity, total_price, notes } = body;

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields (name, phone)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const RESEND_API_KEY = await getResendApiKey();

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY secret not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0a0a0a; color: #f5f5f5; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 28px;">
          <h1 style="color: #c9a86a; font-size: 24px; margin: 0; letter-spacing: 2px;">AURA — New Order</h1>
          <p style="color: #888; font-size: 13px; margin-top: 6px;">${new Date().toLocaleString("en-GB", { timeZone: "Asia/Amman" })}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr><td style="padding: 10px 0; color: #888; width: 140px;">Customer Name</td><td style="padding: 10px 0; color: #f5f5f5; font-weight: bold;">${name}</td></tr>
          <tr><td style="padding: 10px 0; color: #888;">Phone</td><td style="padding: 10px 0; color: #f5f5f5;">${phone}</td></tr>
          <tr><td style="padding: 10px 0; color: #888;">City</td><td style="padding: 10px 0; color: #f5f5f5;">${city || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #888;">Address</td><td style="padding: 10px 0; color: #f5f5f5;">${address || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #888;">Color</td><td style="padding: 10px 0; color: #f5f5f5;">${color || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #888;">Quantity</td><td style="padding: 10px 0; color: #f5f5f5;">${quantity || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #888;">Total Price</td><td style="padding: 10px 0; color: #c9a86a; font-weight: bold; font-size: 18px;">${total_price || "—"}</td></tr>
          <tr><td style="padding: 10px 0; color: #888;">Notes</td><td style="padding: 10px 0; color: #f5f5f5;">${notes || "—"}</td></tr>
        </table>
        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #222; text-align: center;">
          <p style="color: #555; font-size: 12px; margin: 0;">This is an automated notification from the AURA store.</p>
        </div>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [RESEND_TO],
        subject: `New AURA Order — ${name}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return new Response(
        JSON.stringify({ error: `Resend API error: ${resendRes.status}`, detail: errText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await resendRes.json();
    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
