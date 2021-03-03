<template>
    <Header :navbars ="navbars"/>
    <div class="post">
        <div>
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
            thread: [],          
            navbars: [
                {name: 'Créer un post', router: 'createpost'}
            ]
        }
    },

    methods: {
        getOnePost(){
            const authToken = localStorage.getItem('token');
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.get('http://localhost:3000/'+ id,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}` 
                }
            })
            .then(res => {
                this.post = res.data[0];
            })
            .catch(err => console.log(err));
        },

        getThread(){
            const authToken = localStorage.getItem('token');// Obliger de mettre la constante authToken à chaque requête axios (si mit en début de script conserve l'ancien token malgré une reconnection)
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.get('http://localhost:3000/comment/'+ id,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}` 
                }
            })
            .then(res => {
                this.thread = res.data;
                console.log(res.data);
            })
            .catch(err => console.log(err));
            },

        postNewComment(){
            const authToken = localStorage.getItem('token');// Obliger de mettre la constante authToken à chaque requête axios.post (si mit en début de script conserve l'ancien token malgré une reconnection)
            let searchParams = new URLSearchParams(window.location.search);
            let id = searchParams.get("id");
            axios.post('http://localhost:3000/comment/', {
                userId: +localStorage.getItem('userId'),//le + devant le localStorage permet d'envoyer userId en type:Number
                postId: id,
                comment: this.comment
            }, {    
                headers: {
                    'Authorization': `Bearer ${authToken}` 
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
    h3 {
        margin-top: 10px;
    }

</style>