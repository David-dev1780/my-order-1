import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to login page when the app starts
  redirect("/login")
}
