<template>
        <Header 
        :navbars="navbars"
        :logout="logout"
    />
    <div class="post">
        <div>
            <button v-if="admin">x</button>
            <h2>{{ post.title }}</h2>
            <p>{{ post.text }}</p>
        </div>

        <form @submit.prevent='postNewComment()'><!-- réponse marine -->
            <div>
                <label for="comment"></label>
                <textarea id="comment" v-model="comment" placeholder="Ajouter un commentaire" required></textarea>
            </div>
            
            <button type="submit">Ajouter</button>
        </form>
        
        <div>
            <h3>Commentaires:</h3>
        </div>

        <div v-for="item in thread" :key="item" >
            <button v-if="admin">x</button>
            <p>{{ item.pseudo }}</p>
            <p>{{ item.comment }}</p>
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


</style>