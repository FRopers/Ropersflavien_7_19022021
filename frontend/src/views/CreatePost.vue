<template>
    <Header 
        :navbars="navbars"
        :logout="logout"
    />
    <div class="post">
        <form @submit.prevent='postNewPost()'>
            <div>
                <label for="title">Titre</label>
                <input type="text" id="title" v-model="post.title" required>
            </div>
            <div>
                <label for="text" placeholder>Texte</label>
                <textarea id="text" v-model="post.text" required></textarea>
            </div>
            <Upload @image_uploaded="saveImage"/>
            <button type="submit">Envoyer</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios');

import Header from '../components/Header'
import Upload from '../components/Upload'

export default {
    name: "CreatePost",
        components: {
        Header,
        Upload
    },

    data() {
        return {
            post: {
                userId: "",
                title: "",
                text: "",
            },
            image: null,
            logout: true,
            navbars: [
                {name: 'Accueil', router: '/'},
            ]        
        }
    },

    methods: {

        saveImage(payload) {
            this.image = payload.image;
        },

        postNewPost(){
            const storage = JSON.parse(localStorage.getItem('user')); 
            this.post.userId = storage.userId;
            const formData = new FormData();
            formData.append('post', JSON.stringify(this.post));
            formData.append('image', this.image)
            axios.post('http://localhost:3000/', formData, {
    
                    headers: {
                        'Authorization': `Bearer ${storage.token}` 
                    }
            })
            .then((res) => {
                this.image = null; //renitialise la variable, à tester sans
                this.$router.push('/')
                console.log(res)
            })
            .catch(error => console.log(error));
        },
    },
}
</script>

<style lang="scss" scoped>
    form {
        width: 100%;
    }
</style>