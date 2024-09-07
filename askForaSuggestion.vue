<template>
  <div class="app-container">
    <!-- Header Bölümü -->
    <header class="app-header">
      <div class="header">
        <v-btn variant="outlined" @click="goToHome">
          <v-icon left light>mdi-home</v-icon>
          Home Page
        </v-btn>
      </div>
      <h1>Ask For A Suggestion</h1>
      <div>
        <v-btn :disabled="loading" :loading="loading" class="text-none mb-4" color="white" size="large" variant="flat"
          block @click="loading = !loading">
          <v-icon left light style="color:#e74c3c;">mdi-content-save-edit</v-icon>
          <span style="color: #e74c3c;">Save</span>
        </v-btn>

        <div class="header">
          <v-btn variant="outlined">
            <v-icon left dark>mdi-restart</v-icon>
            Reset
          </v-btn>
        </div>
      </div>
    </header>
    <form class="survey-container" @submit.prevent="submitForm">
      <div v-for="(question, index) in questions" :key="index" class="question">
        <p>{{ index + 1 }}- {{ question.text }}</p>
        <div v-if="question.type === 'radio'">
          <label v-for="(option, i) in question.options" :key="i">
            <input type="radio" :name="question.name" :value="option.value" v-model="formData[question.name]" />
            {{ option.label }}
            <img v-if="option.img" :src="option.img" :alt="option.label" />
          </label>
        </div>
        <div v-if="question.type === 'number'">
          <input type="number" v-model="formData[question.name]" placeholder="Enter amount" />
        </div>
      </div>

      <button type="submit" @click="() => send(age, preference, group, sports, budget)">Send</button>
    </form>
    <footer class="app-footer">
      <p>&copy; 2024 Ask For a Suggestion</p>
    </footer>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';

export default {
  data() {
    return {
      loading: false,
      formData: {
        age: '',
        preference: '',
        group: '',
        sports: '',
        budget: ''
      },
      questions: [
        {
          name: 'age',
          text: 'What is your age range?',
          type: 'radio',
          options: [
            { value: '18-25', label: '18 - 25' },
            { value: '26-35', label: '26 - 35' },
            { value: '36-45', label: '36 - 45' },
            { value: '46-55', label: '46 - 55' },
            { value: '56+', label: '56 +' }
          ]
        },
        {
          name: 'preference',
          text: 'Which one do you like the most?',
          type: 'radio',
          options: [
            { value: 'option1', img: 'https://media.istockphoto.com/id/1411476890/vector/vector-illustration-of-a-beautiful-summer-park-with-a-historic-coliseum-cartoon-urban.jpg?s=612x612&w=0&k=20&c=nVSdHyUInnAcFnd7mpw4nItsvE5TFcAIqviIK31Gpcs=' },
            { value: 'option2', img: 'https://t4.ftcdn.net/jpg/00/82/74/13/360_F_82741391_aNzP92C1otFRFD4B16yz08pzv11oPoIq.jpg' },
            { value: 'option3', img: 'https://www.shutterstock.com/shutterstock/videos/13064075/thumb/1.jpg?ip=x480' },
            { value: 'option4', img: 'https://t3.ftcdn.net/jpg/01/70/68/48/360_F_170684802_Sk8QQIrwAyR93VMdvIVpbKQJojZKlZV4.jpg' }
          ]
        },
        {
          name: 'group',
          text: 'How many people are traveling?',
          type: 'radio',
          options: [
            { value: 'solo', label: 'Solo' },
            { value: 'family', label: 'With family' },
            { value: 'friends', label: 'With a group of friends' },
            { value: 'tour', label: 'With a tour' }
          ]
        },
        {
          name: 'sports',
          text: 'What kind of sports do you enjoy?',
          type: 'radio',
          options: [
            { value: 'trekking', label: 'Trekking' },
            { value: 'skiing', label: 'Skiing' },
            { value: 'swimming', label: 'Swimming' },
            { value: 'rafting', label: 'Rafting' }
          ]
        },
        {
          name: 'budget',
          text: 'What is your estimated budget for the vacation?',
          type: 'number'
        }
      ]
    };
  },

  watch: {
    loading(val) {
      if (!val) return;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  },

  methods: {
    goToHome() {
      this.$router.push('/'); // Ana sayfaya yönlendirme işlemi
    },
    reset() {
      // Formu sıfırlama işlemleri
      this.formData = {
        age: '',
        preference: '',
        group: '',
        sports: '',
        budget: ''
      };
    },
    submitForm() {
      console.log(this.formData);
      alert('Your form has been successfully submitted!');
      this.send(this.formData.age, this.formData.preference, this.formData.group, this.formData.sports, this.formData.budget);
    }
  },
  setup() {
    function send(age, preference, group, sports, budget) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const userId = localStorage.getItem('userId');
      const raw = JSON.stringify({
        "user_id":userId,
        "age": age,
        "type": preference,
        "size": group,
        "sport": sports,
        "budget": Number(budget)
      });

      console.log(raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:8000/insert_preference", requestOptions)
      .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error("Fetch error:", error));
    }
    return {

      send,
    };
  },
};


</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.app-header {
  background-color: #e74c3c;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

.app-header button {
  background-color: white;
  color: #e74c3c;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.app-header button:hover {
  background-color: #f2f2f2;
}

.app-header h1 {
  margin: 0 auto;
  text-align: center;
  flex-grow: 1;
}

.app-header div {
  flex-shrink: 0;
}

.survey-container {
  padding: 20px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background-color: #f7f7f7;
  border-radius: 8px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  margin-top: 60px;
  margin-bottom: 60px;
}

header h1 {
  text-align: center;
  color: #ffffff;
}

.question {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
}

input[type="radio"] {
  margin-right: 10px;
}

img {
  width: 100px;
  height: auto;
}

button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

.app-footer {
  background-color: #e74c3c;
  padding: 10px;
  text-align: center;
  color: white;
  margin-top: auto;
  width: 100%;
  bottom: 0;
  left: 0;
}
</style>
