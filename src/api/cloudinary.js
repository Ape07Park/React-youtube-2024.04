export async function uploadImage(file) {
  const data = new FormData(); // 사진 데이터 있을시 꼭 쓸 것
  data.append("file", file)
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
  
  return fetch( process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return data.url;
    });
}