import { Text, View, StatusBar } from "react-native";
import Navbar from "./src/components/Navbar";
import { Fragment } from "react";
import HomeStackScreen from "./src/View/MainScreen";

export default function App() {
  return (
    <Fragment>
      <StatusBar />
      <Navbar />
    </Fragment>
  );
}
