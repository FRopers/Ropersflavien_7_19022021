<template>
    <div>
        <Header />
        <section v-for="post in posts" :key="post.id" class="home">
            <router-link :to="{ path:'post', query: { id: post.id }}" class="home_link">
                <div class="home-post">
                    <div class="home-avatar">
                        <div><img :src= post.avatar alt="avatar utilisateur"></div>
                        <h2>{{ post.pseudo }}</h2>
                    </div>

                    <p>{{ post.text }}</p>
                </div>

                <div class="home-image">
                    <img v-if="post.url_image !== null" :src="post.url_image" />
                </div>
            </router-link>
        </section>
    </div>
</template>

<script>
const axios = require('axios');

import Header from '../components/Header'

export default {
    name: "Home",  
    components: {
        Header
    },

    data() {
        return {
            posts: [],
        }
    },

    methods: {
        validateConnexion() {
            const storage = JSON.parse(localStorage.getItem('user')); 
            if (storage === null || Date.now() - storage.time >= 86400000) { // vérifie si le token à dépasser ça durer de vie de 24h
                this.$router.replace('/login')
            } else {
                this.getAllposts();
            }
        },

        getAllposts(){
            const storage = JSON.parse(localStorage.getItem('user')); 
            axios.get('http://localhost:3000/',
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(res => {
                this.posts = res.data
                console.log(this.posts);
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

.flex {
    display:flex;
}

.home{
    @include display_message(40%);
    &_link {
        color: $color_txt_secondary;
        text-decoration: none;
        :hover {
            color: $color_txt_secondary;
        }
    }
    @media (max-width: 1300px) {
      width: 55%;
    }
    @media (max-width: 900px) {
      width: 70%;
    }
    @media (max-width: 650px) {
      width: 100%;
      margin: 15px 0;
      border-radius: 0px;
    }
}

.home-post {
    padding: 16px;
    @media (max-width: 650px) {
        padding: 10px;
    }
}

.home-avatar {
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

.home-image {
    display: flex;
    & img {
        border-radius: 0 0 5px 5px;
        @media (max-width: 650px) {
             border-radius: 0px;
        }
    }
}

</style>