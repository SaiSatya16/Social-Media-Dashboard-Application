const Userprofile = Vue.component("userprofile", {
    template:  `
    
    <div class="container">
   <div class="row">
      <!-- left - start -->
      <div class="col-2 offset-1">
         <!-- left -->
         <div class="card">
            <div class="card-header text-center"
               style="background-image: url(https://image.shutterstock.com/image-vector/seamless-pattern-computer-background-numbers-260nw-1410295883.jpg); height: 50px;">
               <img src="https://media-exp1.licdn.com/dms/image/C4D03AQFzRzfBHzBpbA/profile-displayphoto-shrink_400_400/0/1661208519486?e=1669248000&v=beta&t=XFtl1ZvqbPC7otwvvml2B1rOUT7Z-k0dlfLz-DzRq84" class="rounded-circle" style="width: 70px; height: 70px; border: 2px solid white;" />
            </div>
            <div class="card-body mt-4" style="font-family: 'Poppins', sans-serif;">
               <p class="card-title header text-center">
                  <a @click=userprofile(user_id)
                     style="color: #212529;">{{ user.name }}</a>
               </p>
               <div class="text-center" style="margin-bottom: 10px; color: #5f5f5f;">
                  <span class="text-center" style="font-size: 13px;"> {{ user.description }} </span>
               </div>

               <div v-if="!current_user" class="text-center">
                <i :data-bs-target="'#edituserModal' + user.id" data-bs-toggle="modal" class="fas fa-edit fa-md" style="font-size: 1.2rem; color: #0a66c2"></i>
                </i>
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
         <div v-for="post in posts" class="card mb-3" >
            <div class="card-header">
               <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGiWpTUewQ76Q/profile-displayphoto-shrink_400_400/0/1613923672228?e=1669248000&v=beta&t=CwG-2a-EpNaLNhXLKJZc9wIGyrA587NjE2cM3p9KM48" class="postphoto">
               <div class="d-inline-flex flex-column ml-1 align-middle">
                  <span class="posttext">
                  <span @click=userprofile(post.user_id) style="color: #212529;">
                  {{post.username}}
                  </span>
                  </span>
                  <span class="profile-desc">
                  {{user.description}}
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

               <div v-if="!current_user" class="card-footer mt-1 text-center">
                <span>
                <button :data-bs-target="'#editpostModal' + post.id" data-bs-toggle="modal" class="ref btn btn-light p-2 ml-4"  >
                <i class="fas fa-edit fa-md" style="font-size: 1.2rem">
                <span class="ml-2 mediatext">
                Edit
                </span>
                </i>
                </button>

                <button @click="deletepost(post)" class="ref btn btn-light p-2 ml-4">
                <i class="fas fa-trash fa-md" style="font-size: 1.2rem">
                <span class="ml-2 mediatext">
                Delete
                </span>
                </i>
                </button>
                </span>
                </div>


                  <h5 class="card-title">{{post.title}}</h5>
                  <p class="card-text m-3 card-desc">
                     {{post.content}}
                  </p>
               </div>
               <div v-if="post.image">
                  <img :src="post.image" class="card-img-top mb-1"
                     alt="..." />
               </div>
               <div class="row">
    <div class="col-6 ps-3">
        <span data-bs-toggle="collapse" :data-bs-target="'#likes' + post.id" aria-expanded="false" aria-controls="'likes' + post.id" class="profile-desc">
            <i class="fas fa-heart fa-md text-danger" style="font-size: 1.2rem"></i>
            <span class="ml-2 mediatext">
                {{ countLikes(post) }}
            </span>
        </span>
    </div>

    <div class="col-6 pe-3 text-end">
            <span data-bs-toggle="collapse" :data-bs-target="'#comments' + post.id" aria-expanded="false" aria-controls="'comments' + post.id" class="profile-desc"">
                <i class="far fa-comment fa-md" style="font-size: 1.2rem"></i>
                <span class="ml-2 mediatext">
                    {{countcomments(post)}}
                </span>
            </span>
        </div>
    </div>


               <div class="collapse mt-2" :id="'likes' + post.id">
                  <ul class="list-group">
                     <li class="ref btn btn-light p-2" v-if= "analytics.like == true" v-for="analytics in post.analytics">
                        <div  class="ml-2 mediatext">
                           Liked by
                           {{analytics.username}}
                        </div>
                     </li>
                  </ul>
               </div>

               <div class="collapse mt-2" :id="'comments' + post.id">
    <ul class="list-group">
        <li class="ref btn btn-light p-2" v-if="analytics.comment !== null" v-for="analytics in post.analytics">
            <div class="ml-2 mediatext">
                <strong style="font-size: 12px;">{{ analytics.username }} commented</strong> :
                <br>
                <span class="comment-text" style="font-size: 14px;">{{ analytics.comment }}</span>
                <br>
                <small style="font-size: 12px;" class="text-muted" style="font-size: 12px;">{{ analytics.created_at }}</small>
            </div>
        </li>
    </ul>
</div>




               <div class="card-footer mt-1 text-center">
                  <span>
                     <div class="ref btn btn-light p-2" v-if="analytics.user_id == user_id && analytics.like == true" v-for="analytics in post.analytics">
                        <i class="fas fa-heart fa-md" style="font-size: 1.2rem; color: red;"></i>
                     </div>
                     <div class="ref btn btn-light p-2" v-if="analytics.user_id == user_id && !analytics.like == true" v-for="analytics in post.analytics">
                        <i class="far fa-heart fa-md" style="font-size: 1.2rem"></i>
                     </div>
                     <button  @click="addlike(post.id)" class="ref btn btn-light p-2">
                     <i class="far fa-thumbs-up fa-md" style="font-size: 1.2rem">
                     <span class="ml-2 mediatext">
                     Like
                     </span>
                     </i>
                     </button>
                  </span>
                  <span>
                  <button @click="adddislike(post.id)" class="ref btn btn-light p-2">
                  <i class="far fa-thumbs-down fa-md" style="font-size: 1.2rem">
                  <span class="ml-2 mediatext">
                  Dislike
                  </span>
                  </i>
                  </button>
                  </span>
                  <span>
                  <button :data-bs-target="'#editModal' + post.id" data-bs-toggle="modal" class="ref btn btn-light p-2 ml-4">
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
         </div>
      </div>
   </div>
   <div v-for="post in posts" :key="post.id">
      <div class="modal fade" :id="'editModal' + post.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="'editModalLabel' + post.id" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title fs-5" :id="'editModal' + post.id">Add a Comment on {{post.username}}'s Post</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
                  <div class="my-3">
                     <label for="postContent">Post Comment:</label>
                     <textarea v-model="postcomment" class="form-control" id="postcomment" name="postcomment" rows="5" required></textarea>
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button @click=addpostcomment(post) type="button"  class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div v-for="post in posts" :key="post.id">
      <div class="modal fade" :id="'editpostModal' + post.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="'editpostModalLabel' + post.id" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title fs-5" :id="'editpostModal' + post.id">Edit Post</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
               <div class="my-3">
                <label for="title">Edit Title</label>
                <input v-model="post.title" type="text" id="posttitle" class="form-control" :placeholder= "post.title">
                </div>
                  <div class="my-3">
                     <label for="postContent">Edit Content:</label>
                     <textarea v-model="post.content" class="form-control" id="postcontent" name="postcontent" rows="5" required></textarea>
                  </div>
                  <div class="my-3">
                    <label for="categoryImage">Edit Post</label>
                    <input type="file" @change="handleImageSelect">
                    </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button @click="editpost(post)"  type="button"  class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div class="modal fade" :id="'edituserModal' + user.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="'edituserModalLabel' + user.id" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title fs-5" :id="'edituserModal' + user.id">Edit Post</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body">
               <div class="my-3">
                <label for="title">Edit Username</label>
                <input v-model="user.name" type="text" id="username" class="form-control">
                </div>
                  <div class="my-3">
                     <label for="postContent">Edit Description:</label>
                     <textarea v-model="user.description" class="form-control" id="description" name="description" rows="5" required></textarea>
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button @click="editprofile(user)" type="button"  class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
               </div>
            </div>
         </div>
      </div>



</div>
        
        
        `,



        data(){
            return {
                user_id : this.$route.params.id,
                posts : [],
                userRole: localStorage.getItem('role'),
                token: localStorage.getItem('auth-token'),
                current_username: localStorage.getItem('username'),
                current_user_id: localStorage.getItem('id'),
                postcomment: null,
                current_user : true,
                user : [],
                selectedImage: null,
            }
        },

        methods: {

            handleImageSelect(event) {
                this.selectedImage = event.target.files[0];
              },
       

            async getuser(id) {
                try {
                const res = await fetch('/user/'+id, {
                    headers: {
                        'Authentication-Token': this.token,
                        'Authentication-Role': this.userRole,
                    },
                }
                
                );
                if (res.ok) {
                    const data = await res.json();
                    this.user = data;
                    }
                    else {
                        const errorData = await res.json();
                        console.error(errorData);
                    }
                } catch (error) {
                    console.error(error);
                }
                },

                async editprofile(user) {
                    try {
                        const res = await fetch(`/user/${ user.id }`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication-Token': this.token,
                                'Authentication-Role': this.userRole,
                            },
                            body: JSON.stringify({
                                username: user.username,
                                description: user.description,
                            }),
                        });

                        if (res.ok) {
                            this.getuser(user.id);
                        } else {
                            const errorData = await res.json();
                            console.error(errorData);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                },





            async getposts() {
                try {
                const res = await fetch('/profile/'+this.$route.params.id, {
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


                async editpost(post) {
                    try {
                        const res = await fetch(`/posts/${post.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication-Token': this.token,
                                'Authentication-Role': this.userRole,
                            },
                            body: JSON.stringify({
                                title: post.title,
                                content: post.content,
                            }),
                        });

                        if (res.ok) {
                            if (this.selectedImage) {
                                await this.handleImageUpload(post.id);
                             }
                            this.getposts();
                        } else {
                            const errorData = await res.json();
                            console.error(errorData);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                },

                async handleImageUpload(post_id) {
                    try {
                      const formData = new FormData();
                      formData.append('image', this.selectedImage);
                
                      const res = await fetch('/posts/' + post_id + '/image', {
                        method: 'POST',
                        headers: {
                          'Authentication-Token': this.token,
                          'Authentication-Role': this.userRole,
                        },
                        body: formData,
                      });
                
                      if (res.ok) {
                        const data = await res.json();
                        console.log(data); // Handle success response
                      } else {
                        const data = await res.json();
                        console.error(data);
                        // Handle error response related to image upload
                      }
                    } catch (error) {
                      console.error(error); // Handle fetch error
                    }
                  },




    
                async addlike(post_id) {
                    try {
    
                        const currentDate = new Date();
                        const day = String(currentDate.getDate()).padStart(2, '0');
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                        const year = currentDate.getFullYear();
                        const hours = String(currentDate.getHours() % 12 || 12).padStart(2, '0');
                        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                        const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
                
                        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    
    
    
                        const res = await fetch(`/analytics/${post_id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication-Token': this.token,
                                'Authentication-Role': this.userRole,
                            },
    
                            body: JSON.stringify({
                                user_id: this.user_id,
                                post_id: post_id,
                                like: true,
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
    
                async adddislike(post_id) {
                    try {
    
                        const currentDate = new Date();
                        const day = String(currentDate.getDate()).padStart(2, '0');
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                        const year = currentDate.getFullYear();
                        const hours = String(currentDate.getHours() % 12 || 12).padStart(2, '0');
                        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                        const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
                
                        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    
                        const res = await fetch(`/analytics/${post_id}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication-Token': this.token,
                                'Authentication-Role': this.userRole,
                            },
    
                            body: JSON.stringify({
                                user_id: this.user_id,
                                post_id: post_id,
                                like: false,
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
    
                async addpostcomment(post) {
                    const post_id = post.id;
                    try {
                        const currentDate = new Date();
                        const day = String(currentDate.getDate()).padStart(2, '0');
                        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                        const year = currentDate.getFullYear();
                        const hours = String(currentDate.getHours() % 12 || 12).padStart(2, '0');
                        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                        const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
                
                        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
                
                        const res = await fetch(`/posts/${post_id}/comment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authentication-Token': this.token,
                                'Authentication-Role': this.userRole,
                            },
                            body: JSON.stringify({
                                comment: this.postcomment,
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

                async deletepost(post) {
                    try {
                        const do_delete = confirm("Are you sure you want to delete this Post?");
                        if (do_delete) { // Only proceed if the user confirms deletion
                            const res = await fetch(`/posts/${post.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Authentication-Token': this.token,
                                    'Authentication-Role': this.userRole,
                                },
                            });
                
                            if (res.ok) {
                                this.getposts();
                            } else {
                                const errorData = await res.json();
                                console.error(errorData);
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
                ,
    
    
    
    
                countLikes(post) {
                    if (post.analytics && post.analytics.length > 0) {
                      return post.analytics.filter(analytics => analytics.like).length;
                    } else {
                      return 0;
                    }
                  },
    
                  countcomments(post) {
                    if (post.analytics && post.analytics.length > 0) {
                      return post.analytics.filter(analytics => analytics.comment).length;
                    } else {
                      return 0;
                    }
                  },
    
                  hasComments(post) {
                    return post.analytics && post.analytics.some(analytics => analytics.comment);
                  },
    
                    userprofile(user_id) {
                        this.$router.push("/profile/" + user_id);
                    },
    
                    
    
    
    
    
    
    
                
        },
    
        mounted() {
            document.title = "Home";
            this.getposts();

            if (this.current_user_id == this.user_id) {
                this.current_user = false;
            }
            this.getuser(this.user_id);

        },
    






  
  });



  
  export default Userprofile;   