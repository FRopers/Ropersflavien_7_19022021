<template>
    <div class="login">
        <form>
            <div>
                <label for="email"></label>
                <input type="email" id="email"  class="form_login" placeholder="E-mail" v-model="email" required>
            </div>
            <div>
                <label for="password" placeholder></label>
                <input type="password" id="password"  class="form_login" placeholder="Mot de passe" v-model="password" required>
            </div>
            <button type="submit" v-on:click="login()">Se connecter</button>
        </form>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: "Login",

    data() {
        return {
            email: "",
            password: ""
        }
    },

    methods:{
        login(){
            axios.post('http://localhost:3000/login', {
                email: this.email,
                password: this.password
            })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
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