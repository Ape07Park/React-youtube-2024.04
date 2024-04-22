import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider,
  signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword,
  onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export function register({ email, password, name, photo }) { //  사용처에서 obj로 처리하기에 그것에 맞춰서 제공 

  console.log('firebase:register():', email, password);
  createUserWithEmailAndPassword(auth, email, password) // 비동기로 인해 다른 것이 먼저 실행되는 것을 막기 위해 return 함

    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
    })
    .then(() => {logout()})
    .catch(console.error);
}

export function login({ email, password }) {
  console.log('firebase.js:login(): ', email, password);
  signInWithEmailAndPassword(auth, email, password)  // email, password 받기
    .catch(console.error);
}

export function loginWithGithub() {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .catch(console.error);
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider)
  // signInWithPopup(auth, provider)
    .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins')) // db에서 관리자 목록 가져오기, 나중에 axios get으로 바뀌고 user 파라미터가 서버 주소로 바뀜
    .then(snapshot => {
      if (snapshot.exists()) {
        const admins = snapshot.val(); // 원하는 객체 뽑아내기 
        console.log(admins);
        const isAdmin = admins.includes(user.uid);  // user uid 포함하는지 확인
        return {...user, isAdmin};
      }
      return user;
    });
}

// firebase는 auto increment 사용 x 따라서  v4 uuid 사용 
export async function addWatchVideoRecord({ user, video }) {
  const id = uuid(); // uuid로 시청기록의 유니크한 키 값(id)을 넣어줌  
  return set(ref(database, `videoRecords/${id}`), {
    id, userId:user.uid, userName:user.displayName,
    videoId:video.id, title:video.snippet.title, channel:video.snippet.channelTitle,
    thumbnailUrl: video.snippet.thumbnails.medium.url, 
    watchAt: new Date().toISOString() // youtube에서 보이는 시간 형태로 변경 
  });
}

//**  자바에선 List<User> JS에선 object에 object 임 그래서 Array<object>로 변환함
// export async function getWatchVideoRecord(userId) {
//   return get(ref(database, 'videoRecords'))
//     .then(snapshot => { //  snapshot :특정 시점에 스토리지에 저장된 파일의 상태(현재 파일 시스템의 상태)를 저장
//       if (snapshot.exists()) { // record가 있으면 - rs.next() 와 같은 의미
//         const objects = snapshot.val(); // db에 든 거 가져오기. ** firebase엔 json으로 들어가있음 그러나 자바에선 일일이 json을 풀어야 함 
//         let records = Object.values(objects);   // ** object를 array로 변환
//         records = records.filter(record => record.userId === userId);   // userId 필터링
//         records = records.sort((a, b) => b.watchAt.localeCompare(a.watchAt));   // 내림차순 정렬 이유는 중복제거 코드에서 뒤에 것이 날라가기 때문 
//         const newRecords = records.filter((record, idx) => {    // 중복 제거
//           return (
//             records.findIndex(eachRecord => {
//               return record.videoId === eachRecord.videoId
//             }) === idx
//           ) 
//         });
//         return newRecords;
//       }
//       return null;
//     });
// }

// export async function getTotalWatchVideoRecordByUser() {
//   return get(ref(database, 'videoRecords'))
//     .then(snapshot => {
//       if (snapshot.exists()) {
//         const objects = snapshot.val();
//         let records = Object.values(objects);   // object를 array로 변환
//         records = records.sort((a, b) => b.watchAt.localeCompare(a.watchAt));   // 내림차순 정렬
//         const newRecords = records.filter((record, idx) => {    // 중복 제거
//           return (
//             records.findIndex(eachRecord => {
//               return (record.videoId === eachRecord.videoId && record.userId === eachRecord.userId)
//             }) === idx
//           ) 
//         });
//         const result = Object.groupBy(newRecords, ({ userName }) => userName);    // Grouping
//         return result;
//       }
//       return null;
//     });
// }

export async function getWatchVideoCount(userId) {
  return get(ref(database, 'videoRecords'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const objects = snapshot.val();
        const records = Object.values(objects)
          .filter(record => record.userId === userId);   // userId 필터링
        const newRecords = records.filter((record, idx) => {    // 중복 제거
          return (
            records.findIndex(eachRecord => {
              return record.videoId === eachRecord.videoId
            }) === idx
          ) 
        });
        // console.log(newRecords.length);
        return newRecords.length;
      }
      return 0;
    });  
}
