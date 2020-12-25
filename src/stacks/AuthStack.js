import React from 'react';
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

import {createStackNavigator} from "@react-navigation/stack";

export default AppStackScreen = ()=>{
    const AuthStack = createStackNavigator();
    return(
        <AuthStack.Navigator headerMode="none">
            <AuthStack.Screen name="Login"component={LoginScreen}/>
             <AuthStack.Screen name="Signup"component={SignupScreen}/>
              
             

        </AuthStack.Navigator>
    )
}