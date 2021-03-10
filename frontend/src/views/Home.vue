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

                <img v-if="post.url_image !== null" :src="post.url_image" />
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

.home{
    @include display_message(40%);
    &_link {
        color: $color_txt_secondary;
        text-decoration: none;
        :hover {
            color: $color_txt_secondary;
        }
    }
}

.home-post {
    padding: 16px;
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

</style>