 import { useState } from 'react';
 import './App.css';
 const uuid = require('uuid');

function App() {
  const [image, setImage] = useState('');
  const [uploadResultMessage, setUploadResultMessage] = useState('Please upload an image to authenticate');
  const [imgName, setImgName] = useState('placeholder.jpg');
  const [isAuth, setAuth] = useState(false); 
  
  function sendImage(e) {
     e.preventDefault();
     setImgName(image.name);
     const visitorImageName = uuid.v4();
     fetch(`https://6alypa58uf.execute-api.us-east-1.amazonaws.com/dev/akamal-visitor-images/${visitorImageName}.jpeg`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg'
      },
      body: image
     }).then(async () => {
      const response = await authenticate(visitorImageName);
      if (response.Message === 'Success') {
        setAuth(true);
        setUploadResultMessage(`Hi ${response['firstName']} ${response['lastName']}, Welcome Back. Good luck and have a productive day!`)
      } else {
        setAuth(false); 
        setUploadResultMessage('Authentication Failed: this person is not an employee.')
      }
     }).catch(error => {
      setAuth(false);
      setUploadResultMessage('There was an error during the authentication process. Please try again.')
      console.error(error);
     }) 

  }
  
  async function authenticate(visitorImageName) {
    const requestUrl = 'https://6alypa58uf.execute-api.us-east-1.amazonaws.com/dev/employee?' + new URLSearchParams({
      objectKey: `${visitorImageName}.jpeg`
    });
    return await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then((data) => {
      return data;
    }).catch(error => console.error(error));
  }

  return (
    <div className="App">
      <h2>Ali's Facial Recognition System </h2>
      <form onSubmit={sendImage}>
        <input type='file' name='image' onChange={e => setImage(e.target.files[0])}/>
        <button type='submit'>Authenticate</button>
      </form>
      <div className={isAuth ? 'success' : 'failure' }>{uploadResultMessage}</div>
       <img src={ require(`./visitors/${imgName}`) } alt="Visitor" height={250} width={250}/> 

    </div>
  );
}

export default App;
