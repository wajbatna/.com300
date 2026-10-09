import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data } = await supabase.from("users").select("businesses(name)").maybeSingle();
  const biz = data?.businesses as unknown as { name: string } | null;

  return <AppShell businessName={biz?.name ?? "مشروعي"}>{children}</AppShell>;
}
