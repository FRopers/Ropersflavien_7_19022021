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
                    <textarea id="text" v-model="post" placeholder="Que voulez vous dire?" required></textarea>
                </div>

                <div>
                    <img v-if="imageUrl" :src="imageUrl" alt="image du post"/>
                </div>
               
                <div class="createpost-form-image">
                    <p>Ajouter à votre publication</p>

                    <div class="createpost-form-image_upload">
                        <label for="image"><font-awesome-icon icon="file-image" /></label>
                        <input type="file" id="image" accept="image/*" @change="uploadFile" />
                    </div>
                </div>

                <button class="createpost-button" type="submit">Publier</button>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import Header from '../components/Header'

export default {
    name: "CreatePost",
        components: {
            Header,
    },

    data() {
        return {
            post: "",
            imageUpload: null,
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

        uploadFile(event) {
            const file = event.target.files[0];
            this.imageUpload = file;
            this.imageUrl = URL.createObjectURL(file);       
        },

        postNewPost(){
            const storage = JSON.parse(localStorage.getItem('user')); 
            const formData = new FormData();
            const data = {
                post: this.post,
                userId: storage.userId
            }
            formData.append('data', JSON.stringify(data));
            formData.append('image', this.imageUpload)
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

    @media (max-width: 1450px) {
        width: 40%;
    }
    @media (max-width: 1200px) {
        width: 50%;
    }
    @media (max-width: 950px) {
        width: 65%;
    }
    @media (max-width: 700px) {
        padding: 10px;
        width: 95%;
    }
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
}

.createpost-form-image {
    margin-bottom: 20px;
    border: 1px solid $border_color;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    &_upload {
        justify-content: flex-end;
        & input {
            display: none;
        }
        & label {
            color: $color_txt_tertiary;
            font-size: 1.3em ;
        }
    }
}
    .upload {
        justify-content: flex-end;
        & input {
            display: none;
        }
        & label {
            color: $color_txt_tertiary;
            font-size: 1.3em ;
        }
    }

.createpost-button {
    margin: auto;     
    @include button_submit(25%)
}

</style>