<template>
    <Header :navbars ="navbars"/>
    <div class="login">
        <form @submit.prevent='signup()'><!-- réponse marine -->
            <div>
                <label for="email"></label>
                <input type="email" id="email" name="email" class="form_login" placeholder="E-mail" v-model="email" required>
            </div>
            <div>
                <label for="password" placeholder></label>
                <input type="password" id="password" name="password" class="form_login" placeholder="Mot de passe" v-model="password" required>
            </div>
            <button type="submit">S'inscrire</button>
        </form>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
const axios = require('axios');

export default {
  components: { Header },
    name: "Login",

    data() {
        return {
            email: "",
            password: "",
            navbars: [
                {name: 'Connexion', router: 'login'}
            ]
        }
    },

    methods:{
        signup(){
            axios.post('http://localhost:3000/signup', {
                email: this.email,
                password: this.password
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
form {
    display: flex;
    flex-direction: column;
    width: 28%;
}
.form_login{
    width: 95%;
    height: 40px;
    margin-bottom: 20px;
}
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
}
button {
    border: transparent;
    font-size: 0.9em;
    font-weight: 700;
    color: white;
    width: 25%;
    height: 40px;
    border-radius: 30px;
    margin: auto;
    background-color: #0079d3;
    outline: none;
}
</style>