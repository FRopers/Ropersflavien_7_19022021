<template>
    <Header />
    <div>
        <form>
            <div>
                <label for="title">Titre</label>
                <input type="text" id="title" v-model="title" required>
            </div>
            <div>
                <label for="text" placeholder>Texte</label>
                <textarea id="text" v-model="text" required></textarea>
            </div>
            <button v-on:click="postNewPost()">Envoyer</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios');
const authToken = localStorage.getItem('token');

import Header from '../components/Header'

export default {
    name: "Post",
        components: {
        Header
    },

    data() {
        return {
            title: "",
            text: ""
        }
    },

    methods: {
        postNewPost(){
            axios.post('http://localhost:3000/', {
                    userId: +localStorage.getItem('userId'),//le + devant le localStorage permet d'envoyer userId en type:Number
                    title: this.title,
                    text: this.text
            }, {    
                    headers: {
                        'Authorization': `Bearer ${authToken}` 
                    }
            })
            .then((res) => console.log(res))
            .catch(error => console.log(error));
        },
    },
}
</script>

<style lang="scss" scoped>
</style>