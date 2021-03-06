<template>
    <div class="log">        
        <div class="login">
            <h1 class="logo">
                <img src="../assets/logo_groupomania.svg" alt="logo Groupomania" class="logo"> 
            </h1>

            <form @submit.prevent='signup()' class="form-log">
                <div>
                    <label for="pseudo"></label>
                    <input type="text" id="pseudo" name="pseudo" class="form_login" placeholder="Pseudo" v-model="pseudo" required>
                </div>

                <div>
                    <label for="email"></label>
                    <input type="email" id="email" name="email" class="form_login" placeholder="E-mail" v-model="email" required>
                </div>

                <div>
                    <label for="password" placeholder></label>
                    <input type="password" id="password" name="password" class="form_login" placeholder="Mot de passe" v-model="password" required>
                </div>
                <button type="submit" class="login_button">S'inscrire</button>

                <div  class="redirect">
                <p>Vous avez déjà un compte?<router-link to="login" class="redirect_login"> Connexion</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: "Login",

    data() {
        return {
            pseudo: "",
            email: "",
            password: "",
            privilege: "user",
        }
    },

    methods:{
        signup(){
            axios.post('http://localhost:3000/signup', {
                pseudo: this.pseudo,
                email: this.email,
                password: this.password,
                privilege: this.privilege
            })
            .then((res) => {
                //ce connecter automatiquement ?
                console.log(res);
            })
            .catch((err) => { 
                console.log(err) 
            });
        },
    }
}
</script>

<style lang="scss">
    .redirect {
        display: flex;
        justify-content: center;
        margin: 30px 0;
        text-decoration: none;
        &_login{
            text-decoration: none;
            color: #0079d3;
        }
    }
</style>