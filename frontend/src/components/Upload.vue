<template>
    <div class="upload">
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

<style lang="scss">
@import "../styles/utils/variables";

    .upload {
        justify-content: flex-end;
        & input {
            display: none;
        }
        & label {
            color: $color_txt_tertiary;
            font-size: 1.3em ;
        }
    }
</style>