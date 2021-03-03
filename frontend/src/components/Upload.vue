<template>
    <div>
        <label for="image">Ajouter image</label>
        <input type="file" id="image" accept="image/*" @change="uploadFile" />
        <div>
            <img v-if="imageUrl" :src="imageUrl" :alt="imageName"/>
        </div>
    </div>
</template>


<script>
    export default {
    name: 'Upload',

        data() {
            return {
                imageName: "",
                imageUrl: null
            }
        },

        methods: {
            uploadFile(event) {
                const file = event.target.files[0];
                this.$emit('image_uploaded',{
                    image: file,
                });
                this.imageName = file.name.split('.')[0];
                this.imageUrl = URL.createObjectURL(file);
            }
        }
    } 
</script>

<style lang="scss" scoped>
    div {
        justify-content: flex-end;
    }
    input {
        display: none;
    }
    label {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9em;
        font-weight: 700;
        color: white;
        width: 100px;
        height: 25px;
        border-radius: 5px;
        background-color: #0079d3;
        outline: none;
    }
</style>