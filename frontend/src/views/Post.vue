<template>
    <div>
        <Header />
        <section class="post">
            <div class="post-text">
                <div class="post-delete">
                    <font-awesome-icon  icon="times-circle" v-if="admin" @click="deletePost()" class="post-delete_icone" title="supprimer" />
                </div>

                <div >
                    <div class="post-avatar">
                        <div><img :src= post.avatar alt="avatar utilisateur"></div>
                        <h2>{{ post.pseudo }}</h2>
                    </div>

                    <p>{{ post.text }}</p>
                </div>
            </div>

            <div v-if="post.url_image !== null" class="post-image">
                <img :src="post.url_image" alt="image du post" />
            </div>

            <div class="post-comment">
                <form @submit.prevent='postNewComment()' class="post-comment-edit">
                    <div>
                        <label for="comment" class="hidden">Écriver un commentaire</label>
                        <textarea id="comment" placeholder="Écriver un commentaire" v-model="comment" v-on:keyup.enter="postNewComment()" aria-required=true required></textarea>
                        <p>Touchez Entrée pour publier votre commentaire.</p>
                        <button type="submit">Publier</button>
                    </div>
                </form>

                <div v-for="(item, index) in thread" :key="item.id" >
                    <div class="post-comment-view">
                        <div class="post-comment-avatar">
                            <div>
                                <img :src= item.avatar alt="avatar utilisateur" class="avatar_img">
                            </div>
                        </div>

                        <div class="post-comment-message">
                            <h3>{{ item.pseudo }}</h3>
                            <p>{{ item.comment }}</p>
                        </div>

                        <div class="post-delete">
                            <font-awesome-icon  icon="times-circle" v-if="admin" @click="deleteComment(item.id, index)" class="post-delete_icone" title="supprimer"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
const axios = require('axios');

import Header from '../components/Header'

export default {
    name: "Post",  
    components: {
        Header
    },

    data() {
        return {
            post: "", 
            comment: "",
            admin: false,
            thread: [],
        }
    },

    methods: {
        validateConnexion() {
            const storage = JSON.parse(localStorage.getItem('user')); 
            if (storage === null || Date.now() - storage.time >= 86400000) {
                this.$router.replace('/login')
            } else {
                this.getOnePost();
                this.getThread();
            }
        },

        verificatedPrivilege(storage) {
            if (storage.privilege === "ADMIN") {
                this.admin = true;
            }
        },

        getOnePost(){
            const storage = JSON.parse(localStorage.getItem('user'));
            this.verificatedPrivilege(storage);
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.get('http://localhost:3000/'+ id,
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(res => {
                this.post = res.data[0];
            })
            .catch(err => console.log(err));
        },

        getThread(){
            const storage = JSON.parse(localStorage.getItem('user'));// Obliger de mettre la constante storage à chaque requête axios (si mit en début de script conserve les anciennes valeurs du localStorage malgré une reconnection)
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.get('http://localhost:3000/comment/'+ id,
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(res => {
                this.thread = res.data;
            })
            .catch(err => console.log(err));
            },

        postNewComment(){
            const storage = JSON.parse(localStorage.getItem('user'));
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.post('http://localhost:3000/comment/', {
                userId: storage.userId,
                postId: id,
                comment: this.comment
            }, {    
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(() => {
                this.comment = "",
                this.getThread();
            })
            .catch(error => console.log(error));
        },

        deletePost(){
            const storage = JSON.parse(localStorage.getItem('user'));
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.delete('http://localhost:3000/'+ id,
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                },
                data: {
                    imageUrl: this.post.url_image,
                    userId: storage.userId
                }
            })
            .then((res) => {
                this.$router.push('/')
                console.log(res)
            })
            .catch(err => console.log(err));
        },

        deleteComment(commentId, index){
            const storage = JSON.parse(localStorage.getItem('user'));
            axios.delete('http://localhost:3000/comment/' + commentId,
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                },
                data: {
                    userId: storage.userId,
                }
            })
            .then((res) => {
                this.thread.splice(index, 1);
                console.log(res);
            })
            .catch(err => console.log(err));
        },
    },

    beforeMount(){
        this.validateConnexion();
    }
}
</script>

<style lang="scss">
@import "../styles/utils/variables";
@import "../styles/utils/mixin";

.post {
    @include display_message(40%);
    @media (max-width: 1300px) {
      width: 55%;
    }
    @media (max-width: 900px) {
      width: 70%;
    }
    @media (max-width: 650px) {
      width: 100%;
      border-radius: 0px;
    }

}

.post-delete {
    display: flex;
    justify-content: flex-end;
    margin-left: -10px;
    &_icone {
        color: $button_color_secondary;
    }
}

.post-avatar {
    display: flex;
    & div{
        @include avatar_border(40px);
    }
    & img {
        @include avatar_image;
    }
    & h2 {
        @include avatar_pseudo(40px, 1.05em);
    }
}

.post-text {
    padding: 20px 20px 0 20px;
    @media (max-width: 650px) {
        padding: 10px 10px 0 10px;
    }
}

.post-image {
    display: flex;
    margin-top: 20px;
}

.post-comment {
    padding: 20px;
    @media (max-width: 650px) {
        padding: 10px 0;
    }
}

.post-comment-edit {
    width: 100%;
    & textarea {
        @media (max-width: 650px) {
            border-radius: 0;
        }
    }
    & p {
        font-size: 0.7em;
        @media (max-width: 800px) {
            display: none;
        }
    }
    & button {
        display: none;
        @media (max-width: 800px) {
            display: block;
            margin: 10px auto 0 auto;     
            @include button_submit(30%)          
        }
    }
}

.post-comment-view {
    display: flex;
    margin-top: 18px;
}

.post-comment-avatar {
    & div{
        @include avatar_border(30px);
        @media (max-width: 650px) {
            margin-left: 10px;
        }
    }
    & img {
        @include avatar_image;
    }
}

.post-comment-message {
    padding: 8px 10px 5px 10px;
    border-radius: 15px;
    background-color: $background_color_secondary;
    font-size: 0.85em;
    & h3 {
        font-size: 0.95em;
        margin-bottom: 8px;
    }
}

</style>