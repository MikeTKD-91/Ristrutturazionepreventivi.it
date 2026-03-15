// app/caserta/page.tsx
// Questa pagina esiste solo come fallback.
// Il redirect 301 verso /comune/caserta/ è gestito in vercel.json
import { redirect } from "next/navigation";

export default function CasertaRedirect() {
  redirect("/comune/caserta/");
}
