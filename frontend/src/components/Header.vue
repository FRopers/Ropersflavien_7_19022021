<template>
    <header>
        <nav>
            <h1>
                <router-link to="/"><img src="../assets/logo_groupomania_white.svg" alt="logo Groupomania" class="header-logo"></router-link>
            </h1>

            <ul>
                <li>
                    <router-link to="createpost"><font-awesome-icon icon="edit" class="header-icone" /></router-link>
                </li>
                
                <li>
                    <router-link to="params"><font-awesome-icon icon="users-cog" class="header-icone" /></router-link>
                </li>
                <li v-on:click="launchLogout()">
                    <p><font-awesome-icon icon="power-off" class="header-icone"/></p>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

export default {
    name: 'Header',

    methods: {
        launchLogout() {
            localStorage.removeItem('user');
            this.$router.replace('/login'); 
        },
    },
}
</script>

<style lang="scss">
@import "../styles/utils/variables";

.header-logo {
    width: 250px;
}

.header-icone {
    cursor: pointer;
    font-size: 1.15em;
    margin-left: 12px;
    color: $color_txt_primary;
    text-decoration: none;
    :hover {
        color: $color_txt_primary;
    }
}
</style>
