<template>
  <div id="app" class="uye-ol-container">
    <div class="header">
      <v-btn variant="outlined" @click="goToHome">
        <v-icon left light>mdi-home</v-icon>
        Home Page
      </v-btn>
    </div>
    <div class="form-container">
      <h1>Create an Acount</h1>
      
        <div class="input-group">
          <label for="kullanici-adi"><i class="fas fa-user"></i> Name:</label>
          <input type="text" v-model="userName" id="kullanici-adi" placeholder="Username" />
        </div>
        <div class="input-group">
          <label for="email"><i class="fas fa-envelope"></i> Email:</label>
          <input type="email" v-model="e_mail" id="email" placeholder="Email" />
        </div>
        <div class="input-group">
          <label for="sifre"><i class="fas fa-lock"></i> Password:</label>
          <input type="password" v-model="password" id="sifre" placeholder="Password" />
        </div>
        <button  class="signup-button" @click="()=>signup(e_mail,userName,password)">Sign Up</button>
      
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()


export default {
  name: 'App',
  data(){
    return{
      userName:'',
      password:'',
      e_mail:''
    }
  },

  setup() {
    const router = useRouter();
   

    function goToHome() {
      router.push('/');
    }

    function signup(e1,u1,p1) {
      
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "e-mail": e1,
        "password": p1,
        "user_name": u1,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:8000/insert_user", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      alert(`Your process has been successfully completed. You can return to the homepage and create your own travel itinerary.`);
      router.push('/');
    }

    return {
      goToHome,
      signup,
    
    };
  },


};
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.uye-ol-container {
  background-image: url('src/public/r1.jpeg');
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.header {
  position: absolute;
  top: 20px;
  left: 20px;
}

.home-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.form-container {
  background: rgba(29, 28, 28, 0.5);
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
}

.signup-button {
  width: 100%;
  padding: 10px;
  background-color: #00aaff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.signup-button:hover {
  background-color: #008ecc;
}
</style>
