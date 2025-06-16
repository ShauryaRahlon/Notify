import { redirect } from "next/navigation";

export default function Home() {
  fetch("/api/leetcode", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched data:", data);
      // Process the data as needed
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  redirect("/dashboard");
  return null;
}