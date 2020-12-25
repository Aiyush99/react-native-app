import React,{useContext}from 'react';
import styled from "styled-components";

import {UserContext} from "../context/UserContext";
import {FirebaseContext} from "../context/FirebaseContext";
import {Ionicons,MaterialIcons} from "@expo/vector-icons";

import { ScrollView } from 'react-native';



const ProfileScreen = () => {

    const [user,setUser] = useContext(UserContext);
    const firebase = useContext(FirebaseContext)

    const logout = async()=>{
         const loggedOut = await firebase.logout()

         if(loggedOut){
             setUser(state=>({...state,isLoggedIn:false}))
         }
    }
    // <ProfilePhoto source={user.profilePhotoUrl === "default" ? require("../../assets/splash.png") : {uri:user.profilePhotoUrl}}/>
  return (
      <Container>
          <ScrollView showsVerticalScrollIndicator={false}>
              
         <TitleBar>

         </TitleBar>
              <MiddleContainer>
                  <ProfilePhotoContainer>
                  <ProfilePhoto source={user.profilePhotoUrl === "default" ? require("../../assets/splash.png") : {uri:user.profilePhotoUrl}} resizeMode="center"/>
                  </ProfilePhotoContainer>
                    <Follow> 
                      <Ionicons name="md-add" size={48}color="#dfd8c8"style={{marginTop:4,marginLeft:3}}></Ionicons>
                    </Follow>
              </MiddleContainer>
                     
                     <UserInfo>
                         <UserText style={{fontWeight:"200",fontSize:26}}>{user.name}</UserText>
                     </UserInfo>

                     <StatsContainer>
                         <StatsBox >
                             <UserText style={{fontSize:24}}>49</UserText>
                             <UserText style={{fontSize:12,fontWeight:"500"}}>Posts</UserText>
                         </StatsBox>

                         <StatsBox style={{borderColor:"#dfd8c8",borderLeftWidth:1,borderRightWidth:1}}>
                             <UserText style={{fontSize:24}}>498</UserText>
                             <UserText style={{fontSize:12,fontWeight:"500"}}>Followers</UserText>
                         </StatsBox>

                         <StatsBox>
                             <UserText style={{fontSize:24}}>1287</UserText>
                             <UserText style={{fontSize:12,fontWeight:"500"}}>Followings</UserText>
                         </StatsBox>
                         </StatsContainer>

                         <MarginView>
                             <ScrollView horizontal={true}showsHorizontalScrollIndicator={false}>
                                 <MediaImageContainer>
                                    <MediaImages source={require("../../assets/tempImage1.jpg")} resizeMode="cover"></MediaImages>
                                 </MediaImageContainer>

                                 <MediaImageContainer>
                                    <MediaImages source={require("../../assets/tempImage2.jpg")} resizeMode="cover"></MediaImages>
                                 </MediaImageContainer>

                                 <MediaImageContainer>
                                    <MediaImages source={require("../../assets/tempImage3.jpg")} resizeMode="cover"></MediaImages>
                                 </MediaImageContainer>

                                 <MediaImageContainer>
                                    <MediaImages source={require("../../assets/tempImage4.jpg")} resizeMode="cover"></MediaImages>
                                 </MediaImageContainer>
                             </ScrollView>
                         </MarginView>


                                 
                     

                </ScrollView>
      </Container>
  )
}

export default ProfileScreen;

const Container = styled.SafeAreaView`
background-color:#fff;
flex:1;
`;

const TitleBar = styled.View`
margin-top:24px;
`
const MiddleContainer = styled.View`
align-self:center;
`
const ProfilePhotoContainer = styled.View`
width:200px;
height:200px;
border-radius:100;
overflow:hidden;
`

const ProfilePhoto = styled.Image`
flex:1;
width:undefined;
height:undefined;
`

const Follow = styled.View`
background-color:#41444b;
position:absolute;
bottom:0;
right:0;
width:60px;
height:60px;
border-radius:30px;
align-items:center;
justify-content:center;
`

const UserInfo = styled.View`
align-items:center;
align-self:center;
margin-top:16px;
`

const UserText = styled.Text`

color:#52575d;
`

const StatsContainer = styled.View`
flex-direction:row;
align-self:center;
margin-top:32px;
`

const StatsBox = styled.View`
align-items:center;
flex:1;

`
const MarginView = styled.View`
margin-top:32px;
`
const MediaImageContainer = styled.View`
width:180px;
height:200px;
border-radius:12px;
overflow:hidden;
margin-left:10px;
`
const MediaImages = styled.Image`
flex:1;
width:undefined;
height:undefined;
justify-content:space-between;
`