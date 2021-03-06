<template>
    <div class="log">
        <div class="login">
            <h1 class="logo">
                <img src="../assets/logo_groupomania.svg" alt="logo Groupomania" class="logo"> 
            </h1>

            <form @submit.prevent='login()' class="form-log">
                <div>
                    <label for="email"></label>
                    <input type="email" id="email" name="email" class="form_login" placeholder="E-mail" v-model="email" required>
                </div>
                
                <div>
                    <label for="password" placeholder></label>
                    <input type="password" id="password" name="password" class="form_login" placeholder="Mot de passe" v-model="password" required>
                </div>
                <button type="submit" class="login_button">Se connecter</button>
            </form>

            <router-link to="signup" class="signup">Créer un compte Groupomania</router-link>
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
                console.log(err) 
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

.form_login{
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
}
.log {
    margin-top: 100px;
}
.logo {
    margin: 30px 0;
}

.form-log {
    width: 85%;
}

.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    margin-top: 20px;
    width: 500px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 3px #7e7e7e;
        &_button {
            background-color: #0079d3;
            color: white;
            width: 100%;
            height: 35px;
            border: transparent;
            border-radius: 3px;
        }
}

.signup {
    margin: 30px 0;
    text-decoration: none;
    color: #0079d3;
}
</style>