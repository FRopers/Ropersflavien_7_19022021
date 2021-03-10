<template>
    <div>
        <Header />
        <div class="createpost">
            <div class="createpost-title">
                <h2>Créer un publication</h2>
            </div>
            <form @submit.prevent='postNewPost()' class="createpost-form">
                <div>
                    <label for="text"></label>
                    <textarea id="text" v-model="post.text" placeholder="Que voulez vous dire?" required></textarea>
                </div>

                <div>
                    <img v-if="imageUrl" :src="imageUrl" :alt="imageName"/>
                </div>
               
                <div class="createpost-form_image">
                    <p>Ajouter à votre publication</p>
                    <Upload 
                        @image_uploaded="saveImage"
                    />
                </div>

                <button class="createpost-button" type="submit">Publier</button>
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
        }
    },

    methods: {
        validateConnexion() {
            const storage = JSON.parse(localStorage.getItem('user')); 
            if (storage === null || Date.now() - storage.time >= 86400000) {
                this.$router.replace('/login')
            }
        },

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
    beforeMount(){
        this.validateConnexion();
    }
}
</script>

<style lang="scss">
@import "../styles/utils/variables";
@import "../styles/utils/mixin";

.createpost {
    @include display_message(35%);
    padding: 20px;
}

.createpost-title{
    display: flex;
    justify-content: center;
    border-bottom: 1px solid $border_color;
}

.createpost-form {
    width: 100%;
    & textarea {
        height: 150px;
        background-color: $background_color_primary;
        border-radius: 0px;
        border: none;
    }
    &_image {
        margin-bottom: 20px;
        border: 1px solid $border_color;
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }
}

.createpost-button {
    margin: auto;     
    @include button_submit(25%)
}

</style>