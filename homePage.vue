<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToSignIn() {
  router.push('/signin');
}
function logOut() {
  localStorage.removeItem('userId')
  userId.value = undefined
}
function goToRegister() {
  router.push('/register');
}
function goToAskForaSuggestion() {
  router.push('/askForaSuggestion');
}

const userId = ref(localStorage.getItem('userId'))
   



const icons = ref([
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
]);
const places1Data = [
  {
    image: 'src/public/fethiye_ölü_deiiz.jpeg',
    title: 'Fethiye Ölüdeniz/ Antalya',
    price: 50.34,
    currency: '$',
    star: 4.5,
    description: "Ölüdeniz, is an amazing natural lagoon known for its turquoise water, beach and surrounding mountains. "
  },
  {
    image: 'src/public/duden-selalesi-antalya.jpeg',
    title: 'Düden Şelalesi/ Antalya',
    price: 10.8,
    currency: '$',
    star: 3,
    description: 'Düden Waterfall in Antalya is famous for its crystal-clear waters, lush green surroundings and soothing sound.'
  },
  {
    image: 'src/public/aspedos-antik-tiyatrosu-antalya.jpeg',
    title: 'Aspendos Antik Tiyatrosu/ Antalya',
    price: 25.73,
    currency: '$',
    star: 2.5,
    description: 'Aspendos Ancient Theater is one of the best-preserved Roman theaters in the world.'
  },
];
const places2Data = [
  {
    image: 'src/public/kiz-kulesi-istanbul.webp',
    title: 'Kız Kulesi/ İstanbul',
    price: 20.98,
    currency: '$',
    star: 4,
    description: "The Maiden's Tower is a historic structure located in the Bosphorus Strait and is one of Istanbul's iconic landmarks."
  },
  {
    image: 'src/public/camlica-tepesi-istanbul.jpeg',
    title: 'Çamlıca Tepesi/ İstanbul',
    price: 26.73,
    currency: '$',
    star: 2.5,
    description: 'Çamlıca Hill is one of the highest points in Istanbul, offering a popular vantage point with panoramic views of the city.'
  },
  {
    image: 'src/public/ayasofya-camii-istanbul.jpg',
    title: 'Ayasofya Cami/ İstanbul',
    price: 'free',
    currency: '$',
    star: 5,
    description: 'Hagia Sophia Mosque is a historically significant and architecturally stunning place of worship in Istanbul, renowned worldwide.'
  },
];
const places3Data = [
  {
    image: 'src/public/bursa_ulu_camii.jpeg',
    title: 'Ulu Cami/ Bursa',
    price: 'free',
    currency: '$',
    star: 2.5,
    description: 'Ulu Mosque in Bursa is a historically and religiously significant mosque from the Ottoman era.'
  },
  {
    image: 'src/public/bursa_uludag.jpeg',
    title: 'Uludağ/ Bursa',
    price: 89.53,
    currency: '$',
    star: 4,
    description: "Uludağ is a popular mountain in Bursa, known for winter sports, nature hikes, camping, and as one of Turkey's most important ski resorts."
  },
  {
    image: 'src/public/bursa_mudanya.jpeg',
    title: 'Mudanya/ Bursa',
    price: 37.67,
    currency: '$',
    star: 3,
    description: 'Mudanya is a tranquil coastal district located along the shores of the Sea of Marmara, renowned for its historical charm and natural beauty.'
  },
];
const places4Data = [
  {
    image: 'src/public/pamukkale_travertenleri.webp',
    title: 'Pamukkale Travertenleri/ Pamukkale',
    price: 47.23,
    currency: '$',
    star: 2.5,
    description: "Pamukkale Travertines, known for their white limestone terraces and thermal waters, are a UNESCO World Heritage Site."
  },
  {
    image: 'src/public/karahayit_kaplıcası.webp',
    title: 'Karahayit Kaplıcası/ Pamukkale',
    price: 35.56,
    currency: '$',
    star: 3.5,
    description: 'Karahayıt Hot Springs, located in Pamukkale, is a significant health tourism spot known for its thermal waters, healing mud, and mineral-rich springs.'
  },
  {
    image: 'src/public/laodikeia.webp',
    title: 'Laodikeia Antik Kenti/ Pamukkale',
    price: 38.19,
    currency: '$',
    star: 2.5,
    description: "The Ancient City of Laodikeia is a place where white travertines and ancient ruins intertwine, blending history and nature."
  },
];
const places5Data = [
  {
    image: 'src/public/uçHisarKalesi-nevşehir.webp',
    title: 'Uçhisar Kalesi/ Nevşehir',
    price: 200.34,
    currency: '$',
    star: 3,
    description: "Uçhisar Castle in Nevşehir is one of the highest points in Cappadocia, offering stunning views where history and nature converge."
  },
  {
    image: 'src/public/GöremeMilliPark-nevşehir.jpeg',
    title: 'Göreme Milli Park/ Nevşehir',
    price: 150.56,
    currency: '$',
    star: 5,
    description: 'Göreme National Park in Nevşehir is a stunning natural wonder filled with unique fairy chimneys and historical settlements.'
  },
  {
    image: 'src/public/güvercinlik-vadisi-nevşehir.webp',
    title: 'Güvercinlik Vadisi/ Nevşehir',
    price: 185.77,
    currency: '$',
    star: 3.5,
    description: 'Pigeon Valley in Nevşehir is a serene and impressive valley renowned for its hiking trails, historic rock formations, and panoramic views.'
  },
];
const places6Data = [
  {
    image: 'src/public/jambiani-köyü-tanzanya.jpeg',
    title: 'Jambiani Köyü/ Tanzanya',
    price: 240.57,
    currency: '$',
    star: 4.5,
    description: "Jambiani Village is a peaceful coastal village on Tanzania's Zanzibar Island, known for its tranquil beaches and rich local culture."
  },
  {
    image: 'src/public/lyon-fransa.jpeg',
    title: 'Lyon/ Fransa',
    price: 310.20,
    currency: '$',
    star: 4,
    description: 'Lyon is known as the gastronomic capital of France. It is famous for its rich cultural heritage, historic architecture, and vibrant arts scene, offering visitors diverse experiences.'
  },
  {
    image: 'src/public/bristoll-ingiltere.webp',
    title: 'Bristoll/ İngiltere',
    price: 235.18,
    currency: '$',
    star: 4.5,
    description: 'Bristol is a city in England known for its historic harbor, vibrant cultural scene, rich artistic heritage, and dynamic student population, offering a blend of modern and historical charm.'
  },
];




</script>

<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    rel="stylesheet">

  <v-app>
    <div v-if="$route.path === '/'">
      <div class="header">
        <span class="title">TripSuggestion.com</span>
      </div>
      <div class="main-banner">
        <h1>FIND YOUR PERFECT TRIP!</h1>
        <div class="buttons">


          <v-btn v-if="!userId" variant="outlined" @click="goToSignIn"><v-icon left dark>mdi-account</v-icon>
            Sign In
            
          </v-btn>
          <v-btn v-else variant="outlined" @click="logOut"><v-icon left dark>mdi-account</v-icon>
            Log Out
            
          </v-btn>

          <v-btn v-if="!userId" variant="outlined" @click="goToRegister"><v-icon left dark>mdi-account</v-icon>
            Register
          </v-btn>

          <v-btn v-if="userId" variant="outlined" @click="goToAskForaSuggestion">
            Ask For A Suggestion
          </v-btn>

        </div>
      </div>
      <section id="section-a">
        <div class="content">
          <h2 class="places">Places</h2>
          <p>
            Which cities would you like to visit? Find the best travel and tour routes.
          </p>
        </div>
      </section>

      <section id="section-b">
        <ul>
          <li v-for="place in places1Data">
            <div class="col">

              <v-img :width="400" aspect-ratio="16/9" cover :src="place.image"></v-img>
              <v-rating v-model="place.star" half-increments hover active-color="#ffd700"
                color="yellow-darken-2"></v-rating>
              <div class="col-content">
                <h3 class="col-title">{{ place.title }}</h3>
                <p>{{ place.currency }} {{ place.price }}
                <p>{{ place.description }}</p>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section id="section-c">
        <ul>
          <li v-for="place in places2Data">
            <div class="col">

              <v-img :width="400" aspect-ratio="16/9" cover :src="place.image"></v-img>
              <v-rating v-model="place.star" half-increments hover active-color="#ffd700"
                color="yellow-darken-2"></v-rating>
              <div class="col-content">
                <h3 class="col-title">{{ place.title }}</h3>
                <p>{{ place.currency }} {{ place.price }}
                <p>{{ place.description }}</p>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section id="section-d">
        <ul>
          <li v-for="place in places3Data">
            <div class="col">

              <v-img :width="400" aspect-ratio="16/9" cover :src="place.image"></v-img>
              <v-rating v-model="place.star" half-increments hover active-color="#ffd700"
                color="yellow-darken-2"></v-rating>
              <div class="col-content">
                <h3 class="col-title">{{ place.title }}</h3>
                <p>{{ place.currency }} {{ place.price }}
                <p>{{ place.description }}</p>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section id="section-e">
        <ul>
          <li v-for="place in places4Data">
            <div class="col">

              <v-img :width="400" aspect-ratio="16/9" cover :src="place.image"></v-img>
              <v-rating v-model="place.star" half-increments hover active-color="#ffd700"
                color="yellow-darken-2"></v-rating>
              <div class="col-content">
                <h3 class="col-title">{{ place.title }}</h3>
                <p>{{ place.currency }} {{ place.price }}
                <p>{{ place.description }}</p>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section id="section-f">
        <ul>
          <li v-for="place in places5Data">
            <div class="col">

              <v-img :width="400" aspect-ratio="16/9" cover :src="place.image"></v-img>
              <v-rating v-model="place.star" half-increments hover active-color="#ffd700"
                color="yellow-darken-2"></v-rating>
              <div class="col-content">
                <h3 class="col-title">{{ place.title }}</h3>
                <p>{{ place.currency }} {{ place.price }}
                <p>{{ place.description }}</p>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section id="section-g">
        <ul>
          <li v-for="place in places6Data">
            <div class="col">

              <v-img :width="400" aspect-ratio="16/9" cover :src="place.image"></v-img>
              <v-rating v-model="place.star" half-increments hover active-color="#ffd700"
                color="yellow-darken-2"></v-rating>
              <div class="col-content">
                <h3 class="col-title">{{ place.title }}</h3>
                <p>{{ place.currency }} {{ place.price }}
                <p>{{ place.description }}</p>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>


      <v-footer class="custom-footer-bg text-center d-flex flex-column">
        <div>
          <v-btn v-for="icon in icons" :key="icon" :icon="icon" class="mx-4" variant="text"></v-btn>
        </div>

        <div class="pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent
          ut
          risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.
          Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum
          ultrices,
          cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius
          natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </div>

        <v-divider></v-divider>

        <div>
          {{ new Date().getFullYear() }} — <strong>TripSuggestion</strong>
        </div>
      </v-footer>
    </div>
  </v-app>
</template>



<style scoped>
.header {
  background-color: rgb(37, 123, 235);
  padding: 10px;
}

.title {
  margin-left: 130px;
  background-color: rgb(3, 87, 197);
  padding: 13px;
  font-size: larger;
  color: white;
}

.main-banner {
  text-align: center;
  background: url('public/p1.jpeg') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 250px;

}


.buttons {
  margin-top: 20px;
}

.buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: white;
  color: rgb(3, 87, 197);
  border: none;
  cursor: pointer;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 7px;
}

a {
  text-decoration: none;
}

p {
  padding: 1.6rem 0;
  font-size: 1.2rem;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

header {
  height: 46rem;
}

header .bg-image {
  background-image: url(imagess/picture1.jpg);
  background-size: cover;
  background-position: center;
  height: 46rem;
  width: 100%;
  opacity: 0.4;
  position: absolute;
  z-index: -1;
}

header h1 {
  padding: 12rem;
  padding-bottom: 0;

}


img {
  width: 100%;
  height: auto;
}

#section-b,
#section-c,
#section-d,
#section-e,
#section-f,
#section-g {
  margin-top: 0px;
  margin-bottom: 80px;
}

#section-b ul,
#section-c ul,
#section-d ul,
#section-e ul,
#section-f ul,
#section-g ul {
  list-style: none;
  background-color: #383f46;
  padding: 0 150px;
}

#section-b li,
#section-c li,
#section-d li,
#section-e li,
#section-f li,
#section-g li {
  background: #fff;
  color: #383f46;
  margin-bottom: 1.5rem;
  margin: 30px;

}

.col-content {
  padding: 1.5rem;
}

@media screen and (min-width:800px) {
  html {
    font-size: 9px;
  }

}

@media screen and (min-width:1200px) {
  html {
    font-size: 11px;
  }

  #section-b li,
  #section-c li,
  #section-d li,
  #section-e li,
  #section-f li,
  #section-g li {
    width: 23%;
    margin: 5%;
    display: inline-block;

  }

  .box {
    width: 50%;
    float: left;
  }


}

#c2 {
  margin-left: 130px;
  background-color: rgb(3, 87, 197);
  padding: 23px;
  font-size: larger;
  color: white;
}

.v-icon {
  color: black;
}


.stars {
  color: #ffd700;
  /* Yıldızların rengi */
  font-size: 1.5rem;
}

.heart-icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 2rem;
  color: rgb(236, 106, 106);
}


.custom-footer-bg {
  background-color: rgb(37, 123, 235);
  /* İstediğiniz arka plan rengi */
  padding-top: 50px;
}

.places {

  font-weight: bolder;
  /* Kalın yazı tipi */
  font-style: italic;
  font-family: "Roboto", sans-serif;
  font-size: 2.3rem;
  line-height: 1.5;
  text-align: center;
}

#section-b li,
#section-c li,
#section-d li,
#section-e li,
#section-f li,
#section-g li,
#section-a {
  font-weight: normal;
  /* Kalın yazı tipi */
  font-style: normal;
  /* İtalik yazı tipi */
  font-family: "Roboto", sans-serif;
  line-height: 1.5;
  text-align: center;
}

#section-a {
  background-color: #eaeaea;
  color: #333;
  padding: 3.2rem 0;
}
</style>

