<template>
    <div>
        <Header />

        <div class="params">
            <div class="params_option">
                <h2>Gestion des comptes</h2>
                <h3>Suppression de compte</h3>

                <form @submit.prevent='getUserSearch()' class="form-createpost">
                    <label for="pseudo-search">Pseudo du compte:</label>
                    <input type="search" id="pseudo-search" name="search" v-model="pseudo" />

                    <button><font-awesome-icon icon="search" /></button>
                </form>
                
                <div>
                    <h3>Compte</h3>

                    <div class="card">
                        <p>Pseudo: {{ user.pseudo }}</p>
                        <p>Email: {{ user.email }}</p>
                        <p>Statut: {{ user.privilege }}</p>
                        <button @click="deleteUser(user.id)">Supprimer</button>
                    </div>              
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import Header from '../components/Header.vue'

export default {
    name: "Params",  
    components: {
        Header
    },

    data() {
        return {
            pseudo: "",
            user: ""
        }
    },


    methods: {
        validateConnexion() {
            const storage = JSON.parse(localStorage.getItem('user')); 
            if (storage === null || Date.now() - storage.time >= 86400000) {
                this.$router.replace('/login')
            }
        },

        getUserSearch() {
            const storage = JSON.parse(localStorage.getItem('user'));
            axios.get('http://localhost:3000/user', {
                params: {
                    pseudo: this.pseudo
            }, 
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(res => {
                this.user = res.data[0];
                console.log(res);
                })
            .catch(err => console.log(err));
        },

        deleteUser(id) {
            const storage = JSON.parse(localStorage.getItem('user'));
            axios.delete('http://localhost:3000/user/'+ id,
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                },
                data: {
                    userId: storage.userId,
                }
            })
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log(err));
        }
    },
    beforeMount(){
        this.validateConnexion();
    }
}
</script>

<style lang="scss">
@import "../styles/utils/variables";

.params {
    display: flex;
    justify-content: center;
    height: 100%;
    &_option{
        width:50%;
        background-color: $background_color_primary;
    }
}
.body-params {
    width: 40%;
}

</style>