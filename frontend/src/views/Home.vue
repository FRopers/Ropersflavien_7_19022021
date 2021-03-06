<template>
    <div>
        <Header />
        <div v-for="post in posts" :key="post.id" class="post">
            <router-link :to="{ path: 'post', query: { id: post.id }}" class="post_link">
                <div class="body">
                    <h2>{{ post.title }}</h2>
                    <p>{{ post.text }}</p>
                </div>

                <img v-if="post.url_image !== null" :src="post.url_image" />
            </router-link>
        </div>
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
            navbars: [
                {name: 'Créer un post', router: 'createpost',},
            ]
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
    .post{
        margin: auto;
        margin-top: 20px;
        width: 500px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 3px #7e7e7e;
        &_link {
            color: black;
            text-decoration: none;
            :hover {
                color: black;
            }
        }
    }
    .body {
        padding: 16px;
    }
    img{
        width: 100%;
        border-radius: 0 0 5px 5px
    }
</style>