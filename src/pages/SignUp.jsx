import React, { useState } from "react";
import {register, loginWithGithub, logout, login} from '../api/firebase';
import { uploadImage } from "../api/cloudinary"; 
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email:'', password:'', name:'', photo:''}); // obj로 묶어서 처리
  const [file, setFile] = useState();
  const navigate = useNavigate();

  /*
  * 함수 선언 
  */
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value}); // e.target.name(KEY) 키에 들어가는 값을 e.target.value(VALUE)로 채움 
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    register(userInfo);  
    navigate('/signIn');
  }

  const handleGithub = e => {
    loginWithGithub();
    navigate(-1); // 이전 스테이트로 갈 것 즉 뒤로 가기
  }

  const handleUpload = e => {
    setFile(e.target.files && e.target.files[0]); // 파일 업로드는 일반적인 방식으로는 안됨
    uploadImage(file)
      .then(url => setUserInfo({...userInfo, ['photo']: url})); // photo: value(url 넣기)
  }

  

  return (
    <div style={{margin: '20px'}}> 

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" value={userInfo.email} placeholder="email 입력"
          onChange={handleChange} /> <br/>
        <input type="password" name="password" value={userInfo.password} placeholder="password 입력"
          onChange={handleChange} /> <br/>

        <input type="text" name="name" value={userInfo.name} placeholder="name 입력"
          onChange={handleChange} /> <br/> 

        <input type="file" accept="image/*" name="file" onChange={handleUpload} /> 
        <br/> 
          <button onClick={handleSubmit}>사용자 등록</button>
          
      </form> 
      <br/>

      <span>계정이 있으신가요?</span>
      <button onClick={handleGithub}>깃허브 로그인</button>
         
    </div>
  )
}