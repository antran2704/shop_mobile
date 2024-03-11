import { StatusBar } from "react-native";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Fragment } from "react";
import { CLERK_PUBLIC_KEY } from "./env";
import StackScreen from "./src/View/StackScreen";

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLIC_KEY}>
      <StatusBar />
      <StackScreen />
    </ClerkProvider>
  );
}
