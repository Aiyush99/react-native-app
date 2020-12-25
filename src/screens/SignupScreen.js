import React,{useState,useContext} from 'react';
import {Alert} from "react-native";
import styled from "styled-components";
import Text from "../components/Text";
import {Platform} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { RotationGestureHandler } from 'react-native-gesture-handler';

import {FirebaseContext} from "../context/FirebaseContext";
import {UserContext} from "../context/UserContext";


const SignUpScreen = ({navigation}) => {
  const [name,setName] = useState()

  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [loading,setLoading] = useState(false)
  const [profilePhoto,setProfilePhoto] = useState();
  const firebase  = useContext(FirebaseContext)
  const [_, setUser] = useContext(UserContext)

  const getPermission = async()=>{
     if(Platform.OS !=="web"){
         const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);

          return status;

     }
  }

  const pickImage = async()=>{
      try{
        let result = await ImagePicker.launchImageLibraryAsync({
            madiaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[1,1],
            quality:0.5
        })
        if(!result.cancelled){
           setProfilePhoto(result.uri)
        }
      }
      catch(err){
        console.log("Error @pickImage:",error)
      }
  }
  const addProfilePhoto = async()=>{
      const status = await getPermission();

     if(status !=="granted"){
       Alert.alert("we need permission to access your camera roll");

        return;
     }

     pickImage();
  }

  const signUp = async()=>{
      setLoading(true);

      const user = {name,email,password,profilePhoto}



      try{
        const createdUser = await firebase.createUser(user);

        setUser({...createdUser, isLoggedIn:true});
      }
      catch(error){
        alert(error.message)
      }
      finally{
        setLoading(false)
      }
  }

  return (
     <Container>
         <Main>
           <Text large semi center>Sign Up To Interact</Text>
         </Main>

         <ProfilePhotoContainer onPress={ addProfilePhoto}>
             {profilePhoto ? (
                 <ProfilePhoto source={{uri:profilePhoto}}/>
             ):(
                <DefaultProfilePhoto>
                <AntDesign name="plus"size={24}color="#ffffff"/>
                </DefaultProfilePhoto>
             )}
            
         </ProfilePhotoContainer>

         <Auth>

         <AuthContainer>
              <AuthTitle>Name</AuthTitle>
              <AuthField  autoCapitalize="none"
             
              autoCorrect={false}
              autoFocus={true}
           
              onChangeText={name=>setName(name.trim())}
              value={name}
              />
           </AuthContainer>


           <AuthContainer>
              <AuthTitle>Email Address</AuthTitle>
              <AuthField  autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
            
              keyboardType="email-address"
              onChangeText={email=>setEmail(email.trim())}
              value={email}
              />
           </AuthContainer>

           <AuthContainer>
              <AuthTitle>Password</AuthTitle>
              <AuthField  autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={password=>setPassword(password.trim())}
              value={password}
              />
           </AuthContainer>
         </Auth>

         <SignUpContainer onPress={signUp} disabled={loading}>
           {loading ? (
             <Loading/>
           ):(
            <Text bold center color="#ffffff">Sign Up</Text>
           )}
     
         </SignUpContainer>

         <SignIn onPress={()=>navigation.navigate("Login")}>
           <Text small center>Already Have An Account? <Text bold color="#8022d9">Sign In</Text></Text>
         </SignIn>
         <HeaderGraphic>
             <RightCircle/>
             <LeftCircle/>
         </HeaderGraphic>
         <StatusBar barStyle="light-content"/> 
     </Container>
  )
}

export default SignUpScreen;

const Container = styled.View`
flex:1;
`;

const Main = styled.View`
margin-top:115px;
`;

const ProfilePhotoContainer = styled.TouchableOpacity`
background-color:#e1e2e6;
width:80px;
height:80px;
border-radius:40px;
align-self:center;
margin-top:16px;
overflow:hidden;


`

const DefaultProfilePhoto = styled.View`
align-items:center;
justify-content:center;
flex:1;
`

const HeaderGraphic = styled.View`
position:absolute;
width:100%;
top:-50px;
z-index:-100;

`;

const LeftCircle = styled.View`
background-color:#23A6d5;
position:absolute;
width:200px;
height:200px;
border-radius:100px;
left:-50px;
top:-50px;
`;

const RightCircle = styled.View`
background-color:#8822d9;
position:absolute;
width:350px;
height:350px;
border-radius:200px;
right:-100px;
top:-200px;
`;

const StatusBar = styled.StatusBar``    

const Auth = styled.View`
margin:16px 32px 32px;
`

const AuthContainer = styled.View`
margin-bottom:30px;

`

const AuthTitle = styled(Text)`
color:#8e93a1;
font-size:12px;
text-transform:uppercase;
font-weight:300;
`
const AuthField = styled.TextInput`
border-bottom-color:#8e9381;
border-bottom-width:0.5px;
height:31px;
`
const SignUpContainer = styled.TouchableOpacity`
margin:0 30px;
height:48px;
align-items:center;
justify-content:center;
background-color:#8022d9;
border-radius:8px;
margin-top:-35px;

`
const SignIn = styled.TouchableOpacity`
margin-top:16px;
`

const Loading = styled.ActivityIndicator.attrs(props=>({
  color:"#ffffff",
  size:"small",
}))``;

const ProfilePhoto = styled.Image`
flex:1;
`
