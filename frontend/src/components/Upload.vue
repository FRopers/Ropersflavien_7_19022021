<template>
    <div>
        <label for="image"><font-awesome-icon icon="file-image" /></label>
        <input type="file" id="image" accept="image/*" @change="uploadFile" />
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
                
                this.$emit('image_uploaded', {
                    image: file,
                    image_name: file.name.split('.')[0],
                    image_url: URL.createObjectURL(file)
                });
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
        color: #0079d3;
        font-size: 1.3em ;
    }
</style>