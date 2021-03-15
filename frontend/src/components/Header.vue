<template>
    <header>
        <nav>
            <h1>
                <router-link to="/" aria-label="retour à la page principale"><img src="../assets/logo_groupomania_white.svg" alt="logo Groupomania" class="header-logo"></router-link>
            </h1>

            <ul>
                <li>
                    <router-link to="createpost" aria-label="création de post"><font-awesome-icon icon="edit" class="header-icone" /></router-link>
                </li>
                
                <li>
                    <router-link to="params" aria-label="paramètres"><font-awesome-icon icon="users-cog" class="header-icone" /></router-link>
                </li>

                <li v-on:click="launchLogout()">
                    <router-link to="login" aria-label="Déconnexion"><font-awesome-icon icon="power-off" class="header-icone" /></router-link>
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
        },
    },
}
</script>

<style lang="scss">
@import "../styles/utils/variables";

.header-logo {
    width: 250px;
    @media (max-width: 650px) {
      width: 125px;
    }
}

.header-icone {
    cursor: pointer;
    font-size: 1.15em;
    margin-left: 12px;
    color: $color_txt_primary;
    text-decoration: none;
    @media (max-width: 650px) {
        font-size: 1em;
        margin-left: 20px;
    }
    :hover {
        color: $color_txt_primary;
    }
}
</style>
