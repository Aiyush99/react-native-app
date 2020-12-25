import React,{useContext} from "react";

import {UserContext} from "../context/UserContext";
import {createStackNavigator} from "@react-navigation/stack";


import AuthStackScreen from "./AuthStack";  
import MainStackScreen from "./MainStack";


export default AppStackScreen = ()=>{
    const AppStack = createStackNavigator();
    const [user] = useContext(UserContext)
    return(
        <AppStack.Navigator headerMode="none">
            {user.isLoggedIn ? (
              <AppStack.Screen name="Main"component={MainStackScreen} />
            ) : (
                
                <AppStack.Screen name="Auth" component={AuthStackScreen} />
            )}
            
        </AppStack.Navigator>
    )
}