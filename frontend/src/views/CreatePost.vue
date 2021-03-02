<template>
    <Header :navbars ="navbars"/>
    <div>
        <form @submit.prevent='postNewPost()'>
            <div>
                <label for="title">Titre</label>
                <input type="text" id="title" v-model="title" required>
            </div>
            <div>
                <label for="text" placeholder>Texte</label>
                <textarea id="text" v-model="text" required></textarea>
            </div>
            <button type="submit">Envoyer</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios');
const authToken = localStorage.getItem('token');

import Header from '../components/Header'

export default {
    name: "CreatePost",
        components: {
        Header
    },

    data() {
        return {
            title: "",
            text: "",
            navbars: [
                {name: 'Accueil', router: '/'},
            ]
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
            .then((res) => {
                this.$router.push('/')
                console.log(res)
            })
            .catch(error => console.log(error));
        },
    },
}
</script>

<style lang="scss" scoped>
</style>