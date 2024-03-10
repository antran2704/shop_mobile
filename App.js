import { StatusBar } from "react-native";
import { ClerkProvider } from "@clerk/clerk-expo";
import Navbar from "./src/components/Navbar";
import { Fragment } from "react";
import { CLERK_PUBLIC_KEY } from "./env";

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLIC_KEY}>
      <StatusBar />
      <Navbar />
    </ClerkProvider>
  );
}
