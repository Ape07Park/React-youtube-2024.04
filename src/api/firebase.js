import { initializeApp } from "firebase/app";
import { GithubAuthProvider } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { signOut,signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function register({email, password, name, photo}){ //  사용처에서 obj로 처리하기에 그것에 맞춰서 제공 
  console.log('firebase:register():', email, password);
  createUserWithEmailAndPassword(auth, email, password) // 비동기로 인해 다른 것이 먼저 실행되는 것을 막기 위해 return 함
  
  .then(() =>{
    updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    })
  })
  .then(() => {logout()})
  .catch(console.error);
}

export function login({email, password}){
   signInWithEmailAndPassword(auth, email, password) // email password 받기 
  .catch(console.error); 
    
}

export function loginWithGithub(){
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
  .catch(console.error); 
}

export function logout() {
    signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, (user) => {
      callback(user);
  });
}
