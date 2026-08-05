import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const CHANNELS = [
  "whatsapp",
  "email",
  "line",
  "wechat",
  "telegram",
  "instagram",
  "x",
  "linkedin",
] as const;

type Payload = {
  services: string[];
  businessName: string;
  industry?: string;
  website?: string;
  location?: string;
  description: string;
  budget?: string;
  timeline?: string;
  name: string;
  channel: (typeof CHANNELS)[number];
  contact: string;
};

function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

const trimmed = (value: unknown, max: number): string | null => {
  if (typeof value !== "string") return null;
  const t = value.trim();
  return t.length > 0 && t.length <= max ? t : null;
};

export async function POST(request: Request) {
  let raw: Partial<Payload>;
  try {
    raw = await request.json();
  } catch {
    return bad("Invalid request body.");
  }

  // Mirror the database constraints so users get readable errors
  // instead of a failed insert.
  if (
    !Array.isArray(raw.services) ||
    raw.services.length === 0 ||
    !raw.services.every((s) => typeof s === "string" && s.length <= 100)
  ) {
    return bad("Pick at least one service.");
  }
  const businessName = trimmed(raw.businessName, 200);
  if (!businessName) return bad("Tell us the name of your business.");

  const description =
    typeof raw.description === "string" ? raw.description.trim() : "";
  if (description.length < 20) {
    return bad("Tell us a little more about the project.");
  }

  const name = trimmed(raw.name, 120);
  if (!name) return bad("We need a name to reply to.");

  const channel = CHANNELS.find((c) => c === raw.channel);
  if (!channel) return bad("Pick a contact channel.");

  const contact = trimmed(raw.contact, 320);
  if (!contact || contact.length < 3) {
    return bad("We need a way to reach you on that channel.");
  }
  if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
    return bad("That email does not look right.");
  }

  try {
    const { error } = await getSupabase().from("bookings").insert({
      services: raw.services,
      business_name: businessName,
      industry: trimmed(raw.industry, 120),
      website: trimmed(raw.website, 300),
      location: trimmed(raw.location, 120),
      description: description.slice(0, 5000),
      budget: trimmed(raw.budget, 60),
      timeline: trimmed(raw.timeline, 60),
      name,
      channel,
      contact,
    });

    if (error) {
      console.error("Booking insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not save your request. Please try again." },
        { status: 500 }
      );
    }
  } catch (err) {
    // Covers missing env configuration as well as network failures.
    console.error("Booking submission error:", err);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
