// import React,{useEffect,useContext} from 'react';
// import styled from "styled-components"
// import {UserContext} from "../context/UserContext";
// import {FirebaseContext} from "../context/FirebaseContext";

// import {ActivityIndicator,StyleSheet} from "react-native";

// import LottieView from 'lottie-react-native';

// import Text from "../components/Text";



// const LoadingScreen = () => {


//   const [_, setUser] = useContext(UserContext) 
//   const firebase = useContext(FirebaseContext)

//   useEffect(()=>{
//     setTimeout(async()=>{
//       const user = firebase.getCurrentUser()

//       if(user){
//         const userInfo = await firebase.getUserInfo(user.uid)

//         setUser({
//           isLoggedIn:true,
//           email:userInfo.email,
//           uid:user.uid,
//           name:userInfo.name,
//           profilePhotoUrl:userInfo.profilePhotoUrl
//         })
//       }
//       else{
//         setUser(state=>({...state, isLoggedIn:false}))
//       }
       
//     },500);
//   }, []);

//   return (
//      <Container>
//           <Text title color="#ffffff">Social App</Text>

    

//         {/* <ActivityIndicator size="large"color="#ffffff" /> */}

      

//      </Container>
    
//   )
// }

// export default LoadingScreen;

// const Container = styled.View`
// flex:1;
// align-items:center;
// justify-content:center;
// background-color:#222222;

// `





