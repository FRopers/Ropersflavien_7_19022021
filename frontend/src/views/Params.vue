<template>
    <div>
        <Header />

        <section class="params">
            <div class="params-avatar">
                <label for="image"><img :src= imageUrl alt="avatar utilisateur"></label>
                <input type="file" id="image" accept="image/*" @change="uploadFile"/>

                <div v-if="imageUrl !== user.avatar" class="params-avatar-button">
                    <button @click="sendImageChoice()" class="params-avatar-button_submit">Valider</button>

                    <button @click="cancelImageChoice()" class="params-avatar-button_cancel">Annuler</button>
                </div>
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

                <form @submit.prevent='getUserSearch()' class="params-search">
                    <div class="params-search-account">
                        <label for="pseudo-search" class="hidden">Pseudo du compte</label>
                        <input type="search" id="pseudo-search" name="search" placeholder=" Pseudo du compte" v-model="pseudo" />

                        <button><font-awesome-icon icon="search" title="recherche" /></button>
                    </div>

                    <div class="params-search-error">
                        <p v-if="error !== null">{{ error }}</p>
                    </div>
                </form>
                
                <div v-if="accounts.length > 0" class="params-delete-account">
                    <div v-for="(item, index) in accounts" :key="item.id" class="params-delete-account_card">
                        <div class="params-delete-account_info">
                            <div>
                                <h4>Pseudo:</h4>

                                <p>{{ item.pseudo }}</p>
                            </div>

                            <div>
                                <h4>Email:</h4>

                                <p>{{ item.email }}</p>
                            </div>

                            <div>
                                <h4>Statut:</h4>
                                
                                <p>{{ item.privilege }}</p>
                            </div>
                        </div>
                        <button @click="deleteAccount(item.id, index)">Supprimer le compte</button> <!-- length équivaut à accounts.length--> 
                    </div>           
                </div>
            </div>
        </section>
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
            accounts: "",
            imageUrl: "",
            imageUpload: "",
            error: null,
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

        uploadFile(event) {
            const file = event.target.files[0];
            this.imageUpload = file;
            this.imageUrl = URL.createObjectURL(file);       
        },

        sendImageChoice() {
            const storage = JSON.parse(localStorage.getItem('user'));
            const formData = new FormData();
            const data = {
                oldImage: this.user.avatar,
                userId: storage.userId
            }
            formData.append('data', JSON.stringify(data));
            formData.append('image', this.imageUpload)
            axios.put('http://localhost:3000/avatar', formData, {  
                  
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(() => {
                this.getUser();
            })
            .catch(err => console.log(err));
        },

        cancelImageChoice() {
            this.imageUrl = this.user.avatar;
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
                this.imageUrl = res.data[0].avatar;
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
                this.error = null;
                this.accounts = res.data;
                console.log(this.accounts);
                })
            .catch(err => {
                this.accounts = "";
                this.error = err.response.data.error;
            });
        },

        deleteAccount(id, index) {
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
                this.accounts.splice(index, 1)
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
    display: flex;
    flex-direction: column;
    margin: auto;
    background-color: $background_color_primary;
    width: 50%;
    padding: 20px;
    & h2 {
        border-bottom: 1px solid $border_color_primary;
        padding-bottom: 20px;
        margin: 40px 0;
        @media (max-width: 900px) {
            margin: 40px 10px,
        }
    }
    @media (max-width: 1400px) {
      width: 60%;
    }
    @media (max-width: 1200px) {
      width: 70%;
    }
    @media (max-width: 1100px) {
      width: 80%;
    }
    @media (max-width: 900px) {
      width: 90%;
      padding: 0;
    }
    @media (max-width: 750px) {
      width: 100%;
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
            @media (max-width: 900px) {
                margin-left: 20px;
            }
            @media (max-width: 750px) {
                margin-left: 0;
                width: 100%;
            }
        }
        & p {
            margin-left: 10px;
            display: flex;
            align-items: center;
            @media (max-width: 750px) {
                margin: 10px 0 0 0;
            }
        }
        @media (max-width: 750px) {
            flex-direction: column;
            margin-left: 15px;
        }
    }
}

.params-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0 50px 0;
    & label {
        @include avatar_border(125px);
        cursor: pointer;
    }
    & input {
        display: none;
    }  
    & img {
        @include avatar_image;
        &:hover {
            filter: brightness(90%);
        }
    }
    & p{
        margin-top: 5px;
        font-weight: 700;
        font-size: 1.2em;
        display: flex;
        justify-content: center;
    }
}

.params-avatar-button {
    margin-top: 15px;
    &_submit {
        @include button_submit(70px);
        margin-right: 30px; 
    }
    &_cancel {
        @include button_cancel(70px);
    }
}

.params-admin {
    & h3 {
        margin-bottom: 20px;
        @media (max-width: 900px) {
            margin: 0 15px 20px 15px,
        }
    }
}

.params-search {
    display: flex;
    margin: 0 0 20px 10px;
    width: 220px;
    @media (max-width: 900px) {
        margin: 0 auto 20px auto;
    }
}

.params-search-account{
    display: flex;
    flex-direction: row;
    & input {
        height: 35px;
        width: 85%;
        border-radius: 10px 0 0 10px;
        padding-left: 8px;
        border: 1px solid $border_color_secondary;
        background-color: $background_color_secondary;
        &:focus {
            outline: none;
        }
    }
    & button {
        background-color: $button_color_primary;
        color: $color_txt_primary;
        width: 15%;
        border: transparent;
        border-radius: 0 10px 10px 0;
        margin-left: -2px;
        &:focus {
            outline: none;
        } 
    }
}

.params-search-error {
    display: flex;
    justify-content: center;
    color: $color_txt_error;
    margin-top: 10px;
}

.params-delete-account {
    display: flex;
    flex-wrap: wrap;
    margin-right: 20px;

    &_card {
        width: 45%;
        margin: 0 10px;
        margin-bottom: 20px;
        @media (max-width: 800px) {
            width: 100%;
        }
    }
    &_info {
        border: $border_color_secondary 1px solid;
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
    @media (max-width: 800px){
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>