<template>
    <Header :navbars ="navbars"/>
    <div class="post">
        <div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.text }}</p>
        </div>

        <div>
            <h3>Commentaires:</h3>
        </div>

        <div v-for="comment in comments" :key="comment" >
            <p>pseudo</p>
            <p>{{ comment.comment }}</p>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
const authToken = localStorage.getItem('token');

import Header from '../components/Header'

export default {
    name: "Post",  
    components: {
        Header
    },

    data() {
        return {
            post: "", 
            comments: [],          
            navbars: [
                {name: 'Créer un post', router: 'createpost'}
            ]
        }
    },

    methods: {
        getOnePost(){
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

        getAllComments(){
        let searchParams = new URLSearchParams(window.location.search);
        let id = searchParams.get("id");
        axios.get('http://localhost:3000/comment/'+ id,
        {
            headers: {
                'Authorization': `Bearer ${authToken}` 
            }
        })
        .then(res => {
            this.comments = res.data;
            console.log(res.data);
        })
        .catch(err => console.log(err));
        },
    },

    beforeMount(){
        this.getOnePost();
        this.getAllComments();
    }
}
</script>

<style lang="scss">
    h3 {
        margin-top: 10px;
    }

</style>