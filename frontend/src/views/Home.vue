<template>
    <Header :navbars ="navbars"/>
    <div v-for="post in posts" :key="post" class="post">
        <router-link :to="{ path: 'post', query: { id: post.id }}">
            <h2>{{ post.title }}</h2>
            <p>{{ post.text }}</p>
        </router-link>
    </div>
</template>

<script>
const axios = require('axios');
const authToken = localStorage.getItem('token');
const time = +localStorage.getItem('time');

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
            if (Date.now() - time >= 86400000) { // vérifie si le token à dépasser ça durer de vie de 24h
                this.$router.replace('/login')
            } else {
                this.getAllposts();
            }
        },

        getAllposts(){
            axios.get('http://localhost:3000/',
            {
                headers: {
                    'Authorization': `Bearer ${authToken}` 
                }
            })
            .then(res => this.posts = res.data)
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
    }

    h2 {
        margin-bottom: 15px;
    }
</style>