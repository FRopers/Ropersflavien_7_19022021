<template>
        <Header 
        :navbars="navbars"
        :logout="logout"
    />
    <div v-for="post in posts" :key="post" class="post">
        <router-link :to="{ path: 'post', query: { id: post.id }}" class="post_link">
            <h2>{{ post.title }}</h2>
            <p>{{ post.text }}</p>
            <img :src="post.url_image" />
        </router-link>
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
            logout: true,
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
        padding: 20px;
        margin: auto;
        margin-top: 20px;
        width: 30%;
        background-color: white;
        border-radius: 10px;
        text-align: initial;
        &_link {
            color: black;
            text-decoration: none;
            :hover {
                color: black;
            }
        }
    }
</style>