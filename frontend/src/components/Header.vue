<template>
    <header>
        <nav>
            <h1>
                <router-link to="/"><img src="../assets/logo_groupomania.svg" alt="logo Groupomania"></router-link>
            </h1>

            <ul>
                <li v-for="item in navbars" :key="item.name">
                    <router-link class="link" :to="{path: item.router}">{{ item.name }}</router-link>
                </li>
            </ul>
            <button v-if="logout" v-on:click="launchLogout()">Déconnexion</button>
        </nav>
    </header>
</template>

<script>

export default {
    name: 'Header',
    props: ['navbars', 'logout'],

    methods: {
        launchLogout() {
            localStorage.removeItem('user');
            this.$router.replace('/login'); 
        },
    },
}
</script>

<style lang="scss">
    * {
        margin: 0;
        padding: 0;        
    }
    header{
        background-color: white;
    }
    nav {
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
    }
    ul {
        display: flex;
    }
    li {
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        font-size: 0.9em;
        font-weight: 700;
        padding: 0 15px;
        height: 40px;
        border-radius: 30px;
        background-color: #0079d3;
    }
    img {
        width: 200px;
    }
    .link {
        color: white;
        text-decoration: none;
        :hover {
            color: white;
        }
    }
</style>
