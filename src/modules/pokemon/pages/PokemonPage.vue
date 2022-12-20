<template>
    <h1>Pokemon: <span>#{{ id }}</span></h1>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            requiered:true
        },
    },

    data() {
        return {
            // id: null
        }
    },
    created(){
        // const {id} = this.$route.params
        // console.log(id)
        // this.id =id
        console.log(this.$attrs)
    }
}
</script>