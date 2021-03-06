<template>
    <div>
        <Header 
            :navbars="navbars"
            :logout="logout"
        />
        <div class="post body flex">
            <div class="delete">
            <button v-if="admin" class="delete_form">x</button>
            </div>
            <div >
                <h2>{{ post.title }}</h2>
                <p>{{ post.text }}</p>
            </div>

            <form class="form-comment">
                <div class="textarea">
                    <label for="comment"></label>
                    <textarea id="comment" placeholder="Écriver un commentaire" v-model="comment" v-on:keyup.enter="postNewComment()" required></textarea>
                    <p class="instruction">Touchez Entrée pour publier votre commentaire.</p>
                </div>
            </form>

            <div v-for="item in thread" :key="item" >
                <div class="delete">
                    <button v-if="admin" class="delete_form">x</button>
                </div>

                <div class="post-comment">
                    <p>{{ item.pseudo }}</p>
                    <p>{{ item.comment }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import Header from '../components/Header'

export default {
    name: "Post",  
    components: {
        Header
    },

    data() {
        return {
            post: "", 
            comment: "",
            admin: false,
            thread: [], 
            logout: false,         
            navbars: [
                {name: 'Créer un post', router: 'createpost'}
            ]
        }
    },

    methods: {
        verificatedPrivilege(storage) {
            if (storage.privilege === "ADMIN") {
                this.admin = true;
            }
        },

        getOnePost(){
            const storage = JSON.parse(localStorage.getItem('user'));
            this.verificatedPrivilege(storage);
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.get('http://localhost:3000/'+ id,
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(res => {
                this.post = res.data[0];
            })
            .catch(err => console.log(err));
        },

        getThread(){
            const storage = JSON.parse(localStorage.getItem('user'));// Obliger de mettre la constante storage à chaque requête axios (si mit en début de script conserve les anciennes valeurs du localStorage malgré une reconnection)
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.get('http://localhost:3000/comment/'+ id,
            {
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then(res => {
                this.thread = res.data;
                console.log(res.data);
            })
            .catch(err => console.log(err));
            },

        postNewComment(){
            const storage = JSON.parse(localStorage.getItem('user'));
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.post('http://localhost:3000/comment/', {
                userId: storage.userId,
                postId: id,
                comment: this.comment
            }, {    
                headers: {
                    'Authorization': `Bearer ${storage.token}` 
                }
            })
            .then((res) => {
                this.$router.push('/')
                console.log(res)
            })
            .catch(error => console.log(error));
        },
    },

    beforeMount(){
        this.getOnePost();
        this.getThread();
    }
}
</script>

<style lang="scss">
.delete {
    display: flex;
    justify-content: flex-end;
    &_form{
        display: flex;
        justify-content: center;
        padding-top: 2px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: red;
        color: white;
        font-weight: 700;
        border: none;
        outline: none;
    }
}
.flex {
    display: flex;
    flex-direction: column;
}
.form-comment {
    margin-top: 20px;
    width: 100%;
}
.instruction {
    font-size: 0.7em;
}
textarea {
    resize: none;
    padding: 12px 0 12px 8px;
    border-radius: 15px;
    width: 98.5%;
    border: transparent;
    background-color: #f0f2f5;
    outline: none;
}
.post-comment {
    padding: 8px 12px;
    border-radius: 15px;
    background-color: #f0f2f5;
}

</style>