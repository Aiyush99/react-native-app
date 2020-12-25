import React from "react";
 
import {UserProvider} from "./src/context/UserContext";
import {NavigationContainer} from "@react-navigation/native";
import AppStackScreen from "./src/stacks/AppStack";



import {FirebaseProvider} from "./src/context/FirebaseContext";

export default App = ()=>{
  return(
    <FirebaseProvider>
    <UserProvider>
    <NavigationContainer>
      <AppStackScreen/>
    </NavigationContainer>
    </UserProvider>
    </FirebaseProvider>
  )
}