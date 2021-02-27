<template>
    <header>
        <nav>
            <h1>
                <a href=""><img src="../assets/logo_groupomania.svg" alt="logo Groupomania"></a>
            </h1>

            <ul>
                <li>
                    <a class="" href="">Créer un post</a>
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
