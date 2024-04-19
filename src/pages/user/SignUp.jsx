import React, { useState } from "react";
import { register, loginWithGithub } from '../../api/firebase';
import { uploadImage } from "../../api/cloudinary";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email:'', password:'', name:'', photo:''});
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});  // e.target.name(KEY) 키에 들어가는 값을 e.target.value(VALUE)로 채움 

  }
  const handleSubmit = e => {
    e.preventDefault();
    register(userInfo);
    navigate('/signIn');
  }
  const handleGithub = e => {
    loginWithGithub();
    navigate(-1);  // 이전 스테이트로 갈 것 즉 뒤로 가기
  }
  const handleUpload = e => {
    setFile(e.target.files[0]);
    uploadImage(e.target.files[0]) // 비동기로 인해 이미지 업로드가 먼저 됨
      .then(url => setUserInfo({...userInfo, ['photo']: url})); // photo: value(url 넣기)
  }

  return (
    <div style={{margin: '20px'}}>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />
        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />
        <input type="text" name='name' value={userInfo.name} placeholder="이름" required
          onChange={handleChange} /><br />
        <input type="file" accept="image/*" name='file' onChange={handleUpload} required /><br />
        <button onClick={handleSubmit}>사용자 등록</button>
      </form><br />
      <span>계정이 있으신가요?</span>
      <Link to='/signIn'>로그인</Link><br /><br />
      <button onClick={handleGithub}>깃허브 로그인</button>
      <br /><br />
      {file && (<img src={URL.createObjectURL(file)} alt='profile' />)}
    </div>
  )
}