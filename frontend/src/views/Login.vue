<template>
        <Header 
        :navbars="navbars"
        :logout="logout"
    />
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
            <button type="submit" class="button_primary">Se connecter</button>
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
            logout: false,
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
    width: 95%;
    height: 40px;
    margin-bottom: 20px;
}
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>