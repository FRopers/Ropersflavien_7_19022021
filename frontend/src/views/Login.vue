<template>
    <Header :navbars ="navbars"/>
    <div class="login">
        <form @submit.prevent='login()'><!-- réponse marine -->
            <div>
                <label for="email"></label>
                <input type="email" id="email" name="email" class="form_login" placeholder="E-mail" v-model="email" required>
            </div>
            <div>
                <label for="password" placeholder></label>
                <input type="password" id="password" name="password" class="form_login" placeholder="Mot de passe" v-model="password" required>
            </div>
            <button type="submit">Se connecter</button>
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
                {name: 'Inscription', router: 'signup'}
            ]
        }
    },

    methods:{
        login(){
            axios.post('http://localhost:3000/login', {
                email: this.email,
                password: this.password
            })
            .then((res) => {
                this.validateConexion(res);
                this.$router.push('/');
                console.log(res);
            })
            .catch((err) => { 
                console.log(err) 
            });
        },

        validateConexion(res){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('time', Date.now()); // enregistre un timestamp
        }
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