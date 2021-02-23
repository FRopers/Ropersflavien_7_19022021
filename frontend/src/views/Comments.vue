<template>
    <div v-for="post in posts" :key="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.text }}</p>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: "Comments",
    data() {
        return {
            posts: []
        }
    },
    methods: {
        getAllposts(){
            axios.get('http://localhost:3000/')
            .then(response => this.posts = response.data)
            .catch(error => console.log(error));
        },
    },
    beforeMount(){
        this.getAllposts()
    }
}
</script>

<style>

</style>