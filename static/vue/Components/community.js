const Community = Vue.component("community", {
    template:  `

    <div class="container">
    <div v-for="user in users" :key="user.id" class="row justify-content-center align-items-center">
      <div class="col-10 mx-auto">
        <div class="card mb-3 w-100"> <!-- Use w-75 class to set card width -->
          <div @click=userprofile(user.id) class="card-header">
            <span v-if="user.image">
              <img :src="user.image" class="postphoto" />
            </span>
            <span v-else>
                <img src="static/icons/pavatar.jpeg" class="postphoto" />
            </span>

            <div class="d-inline-flex flex-column ml-1 align-middle">
              <span class="posttext">
                <span style="color: #212529;">{{ user.username }}</span>
              </span>
              <span class="profile-desc">{{ user.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  

       
       `,

    data() {
        return {
            users : [],
            userRole: localStorage.getItem('role'),
            token: localStorage.getItem('auth-token'),
        };
        },
    methods: {

        async getusers() {
            try {
            const res = await fetch('/users', {
                headers: {
                    'Authentication-Token': this.token,
                    'Authentication-Role': this.userRole,
                },
            }
            
            );
            if (res.ok) {
                const data = await res.json();
                this.users = data;
                }
                else {
                    const errorData = await res.json();
                    console.error(errorData);
                }
            } catch (error) {
                console.error(error);
            }
            },

            userprofile(user_id) {
                this.$router.push("/profile/" + user_id);
            },


    },

    mounted() {
        document.title = "Community";
        this.getusers();
    },
  
  });
  
  export default Community;
// const Community = Vue.component("community", {
//     template:  `<div>
//     <h1>Blog</h1>
            
//     This is the Home page !!
//     generate 50 words of lorem ipsum placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. 
//         </div>`,
  
//   });
  
//   export default Community;


