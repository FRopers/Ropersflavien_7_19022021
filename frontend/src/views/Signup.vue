<template>
    <div>        
        <div class="signup">
            <h1 class="signup-logo">
                <img src="../assets/logo_groupomania_black.svg" alt="logo Groupomania"> 
            </h1>

            <form @submit.prevent='signup()' class="signup-form">
                <div>
                    <label for="pseudo"></label>
                    <input type="text" id="pseudo" name="pseudo" placeholder="Pseudo" v-model="user.pseudo" required>
                </div>

                <div>
                    <label for="email"></label>
                    <input type="email" id="email" name="email" placeholder="E-mail" v-model="user.email" required>
                </div>

                <div>
                    <label for="password" placeholder></label>
                    <input type="password" id="password" name="password" placeholder="Mot de passe" v-model="user.password" required>
                </div>

                <div>
                    <p>Photo de profil</p>
                    <Upload 
                        @image_uploaded="saveImage"
                    />
                </div>

                 <div class="avatar_content">
                    <img v-if="imageUrl" :src="imageUrl" :alt="imageName" class="avatar_img" />
                </div>

                <button type="submit">S'inscrire</button>

                <div class="signup-redirect">
                    <p>Vous avez déjà un compte?<router-link to="login" class="signup-redirect_login"> Connexion</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import Upload from '../components/Upload'

export default {
    name: "Signup",
        components: {
            Upload
        },

    data() {
        return {
            user: {
                email: "",
                password: "",
                pseudo: "",
            },
            image: null,
            imageName: null,
            imageUrl: null,
            privilege: "user",
        }
    },

    methods:{
        saveImage(payload) {
            this.image = payload.image;
            this.imageName = payload.image_name;
            this.imageUrl = payload.image_url;
        },

        signup(){
            const formData = new FormData();
            formData.append('user', JSON.stringify(this.user));
            formData.append('image', this.image)
            axios.post('http://localhost:3000/signup', formData)

            .then((res) => {
                this.login();
                console.log(res);
            })
            .catch((err) => { 
                console.log(err) 
            });
        },

        login(){
            axios.post('http://localhost:3000/login', {
                email: this.user.email,
                password: this.user.password
            })
            .then((res) => {
                this.saveUserInformation(res);
                this.$router.push('/');
                console.log(res);
            })
            .catch((err) => { 
                console.log(err) 
            });
        },

        saveUserInformation(res) {
            let user = {
                userId: res.data.userId,
                token: res.data.token,
                privilege: res.data.privilege,
                time: Date.now()
            }

            localStorage.setItem('user', JSON.stringify(user));
        }
    }
}
</script>

<style lang="scss">
@import "../styles/utils/variables";
@import "../styles/utils/mixin";

.signup {
    @include display_auth;
}

.signup-logo {
    @include display_auth_logo;
}

.signup-form {
    width: 85%;
    & input {
        @include display_auth_form;
    }
    & button {
        @include button_submit(100%);
    }
}

.signup-redirect {
    display: flex;
    justify-content: center;
    margin: 30px 0;
    text-decoration: none;
    &_login {
        text-decoration: none;
        color: $color_txt_tertiary;
    }
}
</style>