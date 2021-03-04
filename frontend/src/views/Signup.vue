<template>
        <Header 
        :navbars="navbars"
        :logout="logout"
    />
    <div class="login">
        <form @submit.prevent='signup()'><!-- réponse marine -->
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
            <button type="submit" class="button_primary">S'inscrire</button>
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
            pseudo: "",
            email: "",
            password: "",
            privilege: "user",
            logout: false,
            navbars: [
                {name: 'Connexion', router: 'login'}
            ]
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