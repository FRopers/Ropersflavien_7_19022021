<template>
    <div>
        <Header />

        <div class="params">
            <div class="params-avatar">
                <div><img :src= user.avatar alt="avatar utilisateur"></div>
            </div>

            <div class="params-user">
                <h2>Mes informations personnelles</h2>

                <div class="params-user_info">
                    <h3>Pseudo :</h3>
                    <p>{{ user.pseudo }}</p>
                </div>

                <div class="params-user_info">
                    <h3>Adresse email :</h3>
                    <p>{{ user.email }}</p>
                </div>
                
            </div>

            <div v-if="user.privilege === 'ADMIN'" class="params-admin">
                <h2>Gestion des comptes</h2>
                <h3>Suppression de compte</h3>

                <form @submit.prevent='getUserSearch()' class="params-search-account">
                    <label for="pseudo-search"></label>
                    <input type="search" id="pseudo-search" name="search" placeholder=" Pseudo du compte" v-model="pseudo" />

                    <button><font-awesome-icon icon="search" /></button>
                </form>
                
                <div v-if="account.pseudo !== undefined" class="params-delete-account">
                    <div class="params-delete-account_info">
                        <div>
                            <h4>Pseudo:</h4>
                            <p>{{ account.pseudo }}</p>
                        </div>

                        <div>
                            <h4>Email:</h4>
                            <p>{{ account.email }}</p>
                        </div>

                        <div>
                            <h4>Statut:</h4>
                            <p>{{ account.privilege }}</p>
                        </div>
                    </div>
                    <button @click="deleteAccount(account.id)">Supprimer le compte</button>              
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
            user: "",
            pseudo: "",
            account: "",
        }
    },


    methods: {
        validateConnexion() {
            const storage = JSON.parse(localStorage.getItem('user'));
            if (storage === null || Date.now() - storage.time >= 86400000) {
                this.$router.replace('/login')
            } else {
                this.getUser();
            }
        },

        getUser() {
            const storage = JSON.parse(localStorage.getItem('user'));
            axios.get('http://localhost:3000/user/' + storage.userId, 
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(res => {
                this.user = res.data[0];
                console.log(this.user);
                })
            .catch(err => console.log(err));
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
                this.account = res.data[0];
                console.log(this.account);
                })
            .catch(err => console.log(err));
        },

        deleteAccount(id) {
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
@import "../styles/utils/mixin";

.params {
    margin: auto;
    background-color: $background_color_primary;
    width: 50%;
    padding: 20px;
    & h2 {
        border-bottom: 1px solid $border_color;
        height: 40px;
        margin: 40px 0;
    }
}

.params-user {
    margin-bottom: 30px;
    &_info {
        display: flex;
        margin-bottom: 20px;
        & h3 {
            font-size: 1.05em;
            width: 20%;
        }
        & p{
            margin-left: 10px;
            display: flex;
            align-items: center;
        }
    }
}

.params-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0 50px 0;
    & div{
        @include avatar_border(125px);
    }
    & img {
        @include avatar_image;
    }
    & p{
        margin-top: 5px;
        font-weight: 700;
        font-size: 1.2em;
        display: flex;
        justify-content: center;
    }
}

.params-admin {
    & h3 {
        margin-bottom: 20px;
    }
}

.params-search-account{
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    & input {
        height: 35px;
        border-radius: 10px 0 0 10px;
        padding-left: 8px;
        border: 1px solid black;
        background-color: $background_color_secondary;
        &:focus {
            outline: none;
        }
    }
    & button {
        background-color: $button_color_primary;
        color: $color_txt_primary;
        width: 10%;
        border: transparent;
        border-radius: 0 10px 10px 0;
        margin-left: -2px;
        &:focus {
            outline: none;
        }  
    }
}

.params-delete-account {
    display: inline-block;
    &_info {
        border: black 1px solid;
        border-bottom: none;
        border-radius: 5px 5px 0 0;
        padding: 5px;
        background-color: $background_color_secondary;
        & div {
            display: flex;
        }
        & h4 {
            width: 100px;
            margin-bottom: 10px ;
        }
    }
    & button {
        background-color: $button_color_secondary;
        color: $color_txt_primary;
        width: 100%;
        height: 25px;
        border: transparent;
        border-radius: 0 0 10px 10px;
    }
}
</style>