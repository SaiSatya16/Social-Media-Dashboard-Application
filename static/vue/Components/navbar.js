const Navbar = Vue.component('Navbar', {
  template: `
  

  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top mb-2 border-bottom">
    <div class="container">
      <a class="navbar-brand" href="/">
        <i class="fab fa-linkedin fa-lg" style="color: #0a66c2; font-size: 2.8rem"></i>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ms-auto">

        <!-- Source Code -->
        <li v-if="['Admin', 'Creator'].includes(role)" class="nav-item">
        <a class="nav-link" href="https://github.com/SaiSatya16/Social-Media-Dashboard-Application" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <i class="fas fa-code fa-lg text-center"></i>
          <div class="menutext mt-2">Source Code</div>
        </a>
      </li>


        <!-- Home -->
        <li v-if="['Admin', 'Creator'].includes(role)" class="nav-item active">
        <a class="nav-link" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <i class="fas fa-home fa-lg text-center" style="color: black"></i>
          <div class="menutext mt-2" style="color: black">  <router-link class="menutext mt-2" to="/">Home</router-link></div>
        </a>
      </li>
      
      <!-- Community -->
      <li v-if="['Admin', 'Creator'].includes(role)" class="nav-item">
        <a class="nav-link" href="#" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <i class="fas fa-user-friends fa-lg text-center"></i>
          <div class="menutext mt-2">  <router-link class="menutext mt-2" to="/community">Community</router-link></div>
        </a>
      </li>
      
      <!-- About Us -->
      <li v-if="['Admin', 'Creator'].includes(role)" class="nav-item">
        <a class="nav-link" href="#" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <i class="fas fa-info-circle fa-lg text-center"></i>
          <div class="menutext mt-2"><router-link class="menutext mt-2" to="/about">About Us</router-link></div>
        </a>
      </li>
      
      <!-- Notifications -->
      <li v-if="['Admin', 'Creator'].includes(role)" class="nav-item">
        <a class="nav-link" href="#" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <i class="fas fa-bell fa-lg text-center"></i>
          <div class="menutext mt-2"><router-link class="menutext mt-2" to="/notifications">Notifications</router-link></div>
        </a>
      </li>
      
      <!-- Me -->
      <li v-if="['Admin', 'Creator'].includes(role)" class="nav-item mr-3">
        <a class="nav-link" href="#" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
          <i class="fas fa-user fa-lg text-center"></i>

          <div  class="menutext mt-2" @click=userprofile(user_id) >Me</div>

        
        </a>
      </li>
      
      <!-- Logout -->
      <li class="nav-item border-left h-25">
      <button @click='logout' class="nav-link active d-lg-block" style="display: flex; flex-direction: column; align-items: center; text-align: center; border: none; background: none;">
          <i class="fas fa-sign-out-alt fa-lg text-center"></i>
          <div class="menutext">Logout</div>
      </button>
      </li>

      
        </ul>
      </div>
    </div>
  </nav>
`,
  data() {
    return {
      role: localStorage.getItem('role'),
      is_login: localStorage.getItem('auth-token'),
      id : localStorage.getItem('id'),
      inactivityTimeout: 30 * 60 * 1000, // 30 minutes in milliseconds
      inactivityTimer: null,
      user_id: localStorage.getItem('id'),
    };
  },
  methods: {

    userprofile(user_id) {
      this.$router.push("/profile/" + user_id);
  },


    logout() {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      localStorage.removeItem('cart');
      this.$router.push({ path: '/login' });
    },
    handleUserActivity() {
      // Update the last activity timestamp
      localStorage.setItem('lastActivityTimestamp', Date.now().toString());
    },
    checkInactivity() {
      const lastActivityTimestamp = localStorage.getItem('lastActivityTimestamp');
      const currentTime = Date.now();

      if (lastActivityTimestamp && currentTime - lastActivityTimestamp > this.inactivityTimeout) {
        // User has been inactive for too long, clear local storage
        this.clearLocalStorage();
      }
    },
    clearLocalStorage() {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      localStorage.removeItem('cart');

      this.$router.push({ path: '/login' });
    },
    startInactivityTimer() {
      this.inactivityTimer = setInterval(() => {
        this.checkInactivity();
      }, 60000); // Check every minute (adjust as needed)
    },
    stopInactivityTimer() {
      clearInterval(this.inactivityTimer);
    },
  },
  mounted() {
    // Set up event listeners to track user activity
    document.addEventListener('mousemove', this.handleUserActivity);
    document.addEventListener('keydown', this.handleUserActivity);
    document.title = "Navbar";

    // Start the inactivity timer
    this.startInactivityTimer();
  },
  beforeDestroy() {
    // Clean up event listeners and the inactivity timer
    document.removeEventListener('mousemove', this.handleUserActivity);
    document.removeEventListener('keydown', this.handleUserActivity);
    this.stopInactivityTimer();
  },





  
});

export default Navbar;
