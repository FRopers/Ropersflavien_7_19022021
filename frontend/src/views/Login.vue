<template>
    <div>
        <div class="login">
            <h1 class="login-logo">
                <img src="../assets/logo_groupomania_black.svg" alt="logo Groupomania"> 
            </h1>

            <form @submit.prevent='login()' class="login-form">
                <div>
                    <label for="email"></label>
                    <input type="email" id="email" name="email" placeholder="E-mail" v-model="email" required>
                </div>
                
                <div>
                    <label for="password" placeholder></label>
                    <input type="password" id="password" name="password" placeholder="Mot de passe" v-model="password" required>
                    <p v-if="error !== null">{{ error }}</p>
                </div>
                <button type="submit">Se connecter</button>
            </form>

            <router-link to="signup" class="login_redirect">Créer un compte Groupomania</router-link>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: "Login",

    data() {
        return {
            email: "",
            password: "",
            error: null,
        }
    },

    methods:{
        login(){
            axios.post('http://localhost:3000/login', {
                email: this.email,
                password: this.password
            })
            .then((res) => {
                this.saveUserInformation(res);
                this.$router.push('/');
                console.log(res);
            })
            .catch((err) => { 
                this.error = err.response.data.error;
            });
        },

        saveUserInformation(res){
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

.login {
    @include display_auth;
}

.login-logo {
    @include display_auth_logo;
}

.login-form {
    width: 85%;
    & p {
        color: $color_txt_error;
        margin-bottom: 20px;
    }
    & input {
        @include display_auth_form;
    }
    & button {
        @include button_submit(100%);
    }
}

.login_redirect {
    margin: 30px 0;
    text-decoration: none;
    color: $color_txt_tertiary;
}
</style>