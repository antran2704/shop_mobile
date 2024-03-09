import { Text, View, StatusBar } from "react-native";
import Navbar from "./src/components/Navbar";
import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <StatusBar />
      <Navbar />
    </Fragment>
  );
}
