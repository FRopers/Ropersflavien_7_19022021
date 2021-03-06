<template>
    <header>
        <nav>
            <h1>
                <router-link to="/"><img src="../assets/logo_groupomania.svg" alt="logo Groupomania" class="logo"></router-link>
            </h1>

            <ul>
                <li>
                    <router-link to="createpost"><font-awesome-icon icon="edit" /></router-link>
                </li>
                                <li>
                    <router-link to="#"><font-awesome-icon icon="users-cog" /></router-link>
                </li>
                <li v-on:click="launchLogout()">
                    <p><font-awesome-icon icon="power-off" /></p>
                </li>
            </ul>
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

.edit {
    color: black;
    font-size: 1.3em;
}

.logo {
    width: 250px;
}

.link {
    color: black;
    text-decoration: none;
    :hover {
        color: black;
    }
}
</style>
