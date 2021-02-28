<template>
    <header>
        <nav>
            <h1>
                <router-link to="home"><img src="../assets/logo_groupomania.svg" alt="logo Groupomania"></router-link>
            </h1>

            <ul>
                <li>
                    <router-link to="post">Créer un post</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header'
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
        list-style: none;
    }
    img {
        width: 200px;
    }

</style>
