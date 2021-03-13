<template>
    <div>        
        <div class="signup">
            <h1 class="signup-logo">
                <img src="../assets/logo_groupomania_black.svg" alt="logo Groupomania"> 
            </h1>

            <form @submit.prevent='signup()' class="signup-form">
                <div>
                    <label for="pseudo"></label>
                    <input type="text" id="pseudo" name="pseudo" placeholder="Pseudo" v-model="pseudo" required>
                </div>

                <div>
                    <label for="email"></label>
                    <input type="email" id="email" name="email" placeholder="E-mail" v-model="email" required>
                </div>

                <div>
                    <label for="password" placeholder></label>
                    <input type="password" id="password" name="password" placeholder="Mot de passe" v-model="password" required>
                    <p v-if="error !== null" class="signup-form_error">{{ error }}</p>
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

export default {
    name: "Signup",
    
    data() {
        return {
            email: "",
            password: "",
            pseudo: "",
            privilege: "user",
            error: null,
        }
    },

    methods:{
        signup(){
            axios.post('http://localhost:3000/signup', {
                email: this.email,
                password: this.password,
                pseudo: this.pseudo,
            })
            .then(() => {
                this.login();
            })
            .catch((err) => { 
                this.error = err.response.data.error; 
            });
        },

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
    @media (max-width: 650px) {
      width: 100%;
      margin-top: 75px;
    }
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
    &_error {
        color: $color_txt_error;
        margin-bottom: 20px;
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
    @media (max-width: 400px) {
        font-size: 0.8em;
    }
}
</style>