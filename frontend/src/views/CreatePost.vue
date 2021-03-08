<template>
    <div>
        <Header 
            :navbars="navbars"
            :logout="logout"
        />
        <div class="post body flex">
            <div class="titre-publication">
                <h2>Créer un publication</h2>
            </div>
            <form @submit.prevent='postNewPost()' class="form-createpost">
                <div>
                    <label for="text"></label>
                    <textarea class="create-post" id="text" v-model="post.text" placeholder="Que voulez vous dire?" required></textarea>
                </div>

                <div>
                    <img v-if="imageUrl" :src="imageUrl" :alt="imageName"/>
                </div>
               
                <div class="create-post_ajout">
                    <p>Ajouter à votre publication</p>
                    <Upload 
                        @image_uploaded="saveImage"
                    />
                </div>

                <button class="publier" type="submit">Publier</button>
            </form>
        </div>
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
                text: "",
            },
            image: null,
            imageName: null,
            imageUrl: null,
            logout: true,
            navbars: [
                {name: 'Accueil', router: '/'},
            ]        
        }
    },

    methods: {

        saveImage(payload) {
            this.image = payload.image;
            this.imageName = payload.image_name;
            this.imageUrl = payload.image_url;
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

<style lang="scss">
    .titre-publication{
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #e4e6eb;
    }
    .create-post {
        height: 150px;
        background-color: white;
        border-radius: 0px;
        border: none;
        &_ajout{
            margin-bottom: 20px;
            border: 1px solid #e4e6eb;
            padding: 10px;
            display: flex;
            justify-content: space-between;
        }
    }
    .publier {
        margin: auto;     
        background-color: #0079d3;
        color: white;
        width: 30%;
        height: 35px;
        border: transparent;
        border-radius: 3px;
    }

    .form-createpost {
        width: 100%;
    }
</style>