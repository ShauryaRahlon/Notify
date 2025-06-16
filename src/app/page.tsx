import { redirect } from "next/navigation";
import getCodeForces from "@/helpers/getCodeForces";
import { get } from "http";
export default function Home() {
  redirect("/dashboard");
  return null;
}