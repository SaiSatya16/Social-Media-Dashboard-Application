const Home = Vue.component("home", {
    template:  `

    <div class="container">
        
    <div class="row">
        <!-- left - start -->
        <div class="col-3 offset-1">
            <!-- left -->
            <div class="card">
                <div class="card-header text-center"
                    style="background-image: url(https://image.shutterstock.com/image-vector/seamless-pattern-computer-background-numbers-260nw-1410295883.jpg); height: 50px;">
                    <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFzRzfBHzBpbA/profile-displayphoto-shrink_400_400/0/1661208519486?e=1669248000&v=beta&t=XFtl1ZvqbPC7otwvvml2B1rOUT7Z-k0dlfLz-DzRq84" class="rounded-circle" style="width: 70px; height: 70px; border: 2px solid white;" />
                </div>
                <div class="card-body mt-4" style="font-family: 'Poppins', sans-serif;">
                    <p class="card-title header text-center">
                        <a href="https://www.linkedin.com/in/alimertkocaman/" target="_blank"
                            style="color: #212529;">{{user}}</a>
                    </p>
                    <div class="text-center" style="margin-bottom: 10px; color: #5f5f5f;">
                        <span class="text-center" style="font-size: 13px;">Full Stack Application Developer</span>
                    </div>
                    <hr>
                    <div class="card-text">
                        <div>
                            <span class="view">place holder </span><span
                                class="float-right view mt-1" style="color: #0a66c2">256</span>
                        </div>
                        <div>
                            <span class="view">place holder </span><span class="float-right view mt-1"
                                style="color: #0a66c2">104</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer ">
                    <i class="fas fa-bookmark"></i><span class="mb-4 ml-2">place holder</span>
                </div>
            </div>
            
            <div class="card mt-3">
                <div class="card-header" style="font-size: 18px">
                    Trending Today
                </div>
                <div class="card-body">
                    <div class="card-title">
                        <div>
                            <i class="fas fa-hashtag" style="font-size: 13px;">
                            </i>
                            <span
                                class="ml-1 font-weight-bold"
                                style="font-size: 13px; color: #5f5f5f">
                                kodluyoruz
                            </span>
                        </div>
                        <div>
                            <i class="fas fa-hashtag" style="font-size: 13px;">
                            </i>
                            <span class="ml-1 font-weight-bold" style="font-size: 13px; color: #5f5f5f">
                                front-end
                            </span>
                        </div>
                        <div>
                            <i class="fas fa-hashtag" style="font-size: 13px;">
                            </i>
                            <span class="ml-1 font-weight-bold" style="font-size: 13px; color: #5f5f5f">
                                html
                            </span>
                        </div>
                        <div>
                            <i class="fas fa-hashtag" style="font-size: 13px;">
                            </i>
                            <span class="ml-1 font-weight-bold" style="font-size: 13px; color: #5f5f5f">
                                css
                            </span>
                        </div>
                        <div>
                            <i class="fas fa-hashtag" style="font-size: 13px;">
                            </i>
                            <span class="ml-1 font-weight-bold" style="font-size: 13px; color: #5f5f5f">bootstrap
                            </span>
                        </div>
                        <div>
                            <i class="fas fa-hashtag" style="font-size: 13px;">
                            </i>
                            <span class="ml-1 font-weight-bold" style="font-size: 13px; color: #5f5f5f">
                                kodluyoruz
                            </span>
                        </div>
                        <div>
                            <i class="fas fa-hashtag" style="font-size: 13px;">
                            </i>
                            <span class="ml-1 font-weight-bold" style="font-size: 13px; color: #5f5f5f">
                                front-end
                            </span>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    Place holder
                </div>
            </div>
        </div>

        <!-- middle - start -->
        <div class="col-8">
        <div class="card">
            <div class="card-body text-center">
                <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="mediatext btn btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" width="24"
                        height="24" focusable="false" fill="#F5987E">
                        <path
                            d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z">
                        </path>
                    </svg>
                    <span class="ml-1 mediatext">Write a Post</span>
                </button>
            </div>
        </div>
    
            <hr>
            <div v-for="post in posts" class="card mb-3" >
                <div class="card-header">
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGiWpTUewQ76Q/profile-displayphoto-shrink_400_400/0/1613923672228?e=1669248000&v=beta&t=CwG-2a-EpNaLNhXLKJZc9wIGyrA587NjE2cM3p9KM48" class="postphoto">
                    <div class="d-inline-flex flex-column ml-1 align-middle">
                        <span class="posttext">
                            <a href="https://www.linkedin.com/in/malan/" target="_blank" style="color: #212529;">
                            {{post.username}}
                            
                            </a>
                        </span>
                        <span class="profile-desc">
                            I teach CS50
                        </span>
                        <span class="profile-desc"> {{post.created_at}}
                            <i class="fas fa-globe-americas fa-sm">
                            </i>
                        </span>
                    </div>

                   
  </span>
</div>


                   
                <div>
                <div class="card-body">
  <h5 class="card-title">{{post.title}}</h5> <p class="card-text m-3 card-desc">
    {{post.content}}
  </p>
  </div>
                    <div>
                        <img src="https://pbs.twimg.com/media/Em2_xBbXUAEVDx1.jpg" class="card-img-top mb-1"
                            alt="..." />
                    </div>
                    <div class="ml-3 mb-2">
                        <span>
                            <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="Like Icon">
                        </span>
                        <span>
                            <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="Clap Icon">
                        </span>
                        <span class="profile-desc">
                            <img src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" alt="Heart Icon"> 958
                        </span>
                    </div>
                    <div class="card-footer mt-1 text-center">
                        <span>
                            <button class="ref btn btn-light p-2">
                                <i class="far fa-thumbs-up fa-md" style="font-size: 1.2rem">
                                    <span class="ml-2 mediatext">
                                        Like
                                    </span>
                                </i>
                            </button>
                        </span>
                        <span>
                            <button class="ref btn btn-light p-2">
                                <i class="far fa-thumbs-down fa-md" style="font-size: 1.2rem">
                                    <span class="ml-2 mediatext">
                                        Dislike
                                    </span>
                                </i>
                            </button>
                        </span>
                        <span>
                            <button class="ref btn btn-light p-2 ml-4">
                                <i class="far fa-comment fa-md" style="font-size: 1.2rem">
                                    <span class="ml-2 mediatext">
                                        Comment
                                    </span>
                                </i>
                            </button>
                        </span>
                        <span>
                            <button class="ref btn btn-light p-2 ml-4">
                                <i class="fas fa-paper-plane fa-md" style="font-size: 1.2rem">
                                    <span class="ml-2 mediatext">
                                       Share
                                    </span>
                                </i>
                            </button>
                        </span>
                    </div>
                </div>
            </div>x
        </div>
    </div>


    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
             <div class="modal-content">
                <div class="modal-header">
                   <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Category</h1>
                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   <div class="my-3">
                      <label for="title">Post Title:</label>
                      <input v-model="title"  type="text" id="title" class="form-control">
                   </div>
                   <div class="my-3">
                   <label for="postContent">Post Content:</label>
                   <textarea v-model="postContent" class="form-control" id="postContent" name="postContent" rows="5" required></textarea>
                   </div>
                </div>
                <div class="modal-footer">
                   <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                   <button @click="addpost" type="button" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                </div>
             </div>
          </div>
       </div>




</div>

    
    `,

    data() {
      return {
        posts : [],
        title: null,
        postContent: null,
        error: null,
        userRole: localStorage.getItem('role'),
        token: localStorage.getItem('auth-token'),
        user: localStorage.getItem('username'),
        user_id: localStorage.getItem('id'),
      };
    },

    methods: {

        async getposts() {
            try {
            const res = await fetch('/posts', {
                headers: {
                    'Authentication-Token': this.token,
                    'Authentication-Role': this.userRole,
                },
            }
            
            );
            if (res.ok) {
                const data = await res.json();
                this.posts = data;
                }
                else {
                    const errorData = await res.json();
                    console.error(errorData);
                }
            } catch (error) {
                console.error(error);
            }
            },
        
            async addpost() {
                try {
                    const currentDate = new Date();
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const year = currentDate.getFullYear();
                    const hours = String(currentDate.getHours() % 12 || 12).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
            
                    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
            
                    const res = await fetch('/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication-Token': this.token,
                            'Authentication-Role': this.userRole,
                        },
                        body: JSON.stringify({
                            title: this.title,
                            content: this.postContent,
                            user_id: this.user_id,
                            created_at: formattedDateTime,
                        }),
                    });
            
                    if (res.ok) {
                        this.getposts();
                    } else {
                        const errorData = await res.json();
                        console.error(errorData);
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            
    },

    mounted() {
        document.title = "Home";
        this.getposts();
    },

  });
  
  export default Home;