<template>
  <div id="app">
    <div class="header">
      <v-btn variant="outlined" @click="goToHome">
        <v-icon left light>mdi-home</v-icon>
        Home Page
      </v-btn>
    </div>
    <div class="background-image">
      <div class="login-container">
        <h1 class="title">TripSuggestion.com</h1>
        <form @submit.prevent="signin(email, password)">
          <div class="input-group">
            <label for="email">E-mail:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <v-btn variant="outlined" class="login-button" @click="() => signin(email, password)">
            <v-icon left dark>mdi-account</v-icon>
            Sign In
            
          </v-btn>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    }
  },

  setup() {
    const router = useRouter();
    function goToHome() {
      router.push('/');
    }

    function signin(e2, p2) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      

      const raw = JSON.stringify({
        "e-mail": e2,
        "password": p2,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:8000/user", requestOptions)
        .then(async (response) => {
          const result = await response.json(); // Yanıtı JSON olarak işle
          if (response.ok ) {
            // Giriş başarılı
            localStorage.setItem('userId',result.userId.toString())
            router.push('/');
            
          } else {
            // Giriş başarısız
            alert(result.message || "Login failed: The email or password you entered is incorrect. Please try again or register for an account if you haven't done so.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred. Please try again later.");
        });

    }
    return {
      goToHome,
      signin,
    };
  },

};


import { ref } from 'vue';

const icons = ref([
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]);
</script>

<style scoped>
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
}

.background-image {
  background-image: url('/Users/zeynep/vue-project/src/public/sign2.webp');
  background-size: cover;
  background-position: center;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 300px;
  text-align: center;
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.custom-footer-bg {
  background-color: rgb(37, 123, 235);
  /* İstediğiniz arka plan rengi */
  padding-top: 50px;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Full height of the viewport */
}

.header {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
