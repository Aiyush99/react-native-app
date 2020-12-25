import React,{useContext, useState}from 'react';
import {UserContext} from "../context/UserContext";
import styled from 'styled-components';
import * as Permissions from "expo-permissions";
import {Alert,Platform} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons"


import {FirebaseContext} from "../context/FirebaseContext";

const PostScreen = () => {

    const firebase  = useContext(FirebaseContext)

    const [post,setPost] = useState()
    const [user, setUser] = useContext(UserContext)
    const [postPhoto,setPostPhoto] = useState();

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
             setPostPhoto(result.uri)
          }
        }
        catch(err){
          console.log("Error @pickImage:",error)
        }
    }
   

    const addPostPhoto = async()=>{
        const status = await getPermission();
  
       if(status !=="granted"){
         Alert.alert("we need permission to access your camera roll");
  
          return;
       }
  
     pickImage();
    }

    const postButton = async()=>{
       
  
        const user = {postPhoto}
  
  
  
        try{
          const createdPost = await firebase.createPost(user);
  
          setUser({...createdPost});
        }
        catch(error){
          alert(error.message)
        }
      
    }

  
  return (
      <Container>
          <Header style={{paddingHorizontal:32,paddingVertical:12}}>
              <PostButton onPress={postButton}>
                 <PostText>Post</PostText>
              </PostButton>
          </Header>

          <InputContainer>
              <ProfilePhoto source={user.profilePhotoUrl === "default" ? require("../../assets/splash.png") : {uri:user.profilePhotoUrl}}></ProfilePhoto>

              <PostInput autoFocus={true} 
              multiline={true} 
              numberOfLines={4} 
              style={{flex:1}}
              placeholder="Want to share something"
              onChangeText={post=>setPost(post.trim())}
              value={post}
              >

              </PostInput>
          </InputContainer>

          <PostPhoto source={{uri:postPhoto}}>

          </PostPhoto>

          <Photo style={{marginHorizontal:32}} onPress={addPostPhoto}>
              <Ionicons name="md-camera"size={32}color="#d8d9d8"></Ionicons>
          </Photo>

      </Container>
  )
}

export default PostScreen;

const Container = styled.SafeAreaView`
flex:1;
`
const Header = styled.View`
flex-direction:row;
justify-content:space-between;
border-bottom-width:1;
border-bottom-color:#d8d9d8
`

const PostButton = styled.TouchableOpacity`
margin-left:87%;
`

const PostText = styled.Text`
font-weight:600;
`

const InputContainer = styled.View`
margin:32px;
flex-direction:row;

`
const ProfilePhoto = styled.Image`
width:48px;
height:48px;
border-radius:24px;
margin-right:16px;
`

const PostInput = styled.TextInput`
margin-top:-19px;
`

const Photo = styled.TouchableOpacity`
align-items:flex-end;
margin-top:16px;

`

const PostPhoto = styled.Image`
width:400px;
height:300px;
margin-top:-20px;
`