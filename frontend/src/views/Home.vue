<template>
    <Header />
    <div v-for="post in posts" :key="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.text }}</p>

    </div>
</template>

<script>
const axios = require('axios');
const authToken = localStorage.getItem('token');

import Header from '../components/Header'

export default {
    name: "Home",  
    components: {
        Header
    },

    data() {
        return {
            posts: []
        }
    },

    methods: {
        //Ne gère pas le userID
        getAllposts(){
            axios.get('http://localhost:3000/',
            {
                headers: {
                    'Authorization': `Bearer ${authToken}` 
                }
            })
            .then(response => this.posts = response.data)
            .catch(error => console.log(error));
        },
    },
    beforeMount(){
        this.getAllposts()
    }
}
</script>

<style lang="scss" scoped>
    div {
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