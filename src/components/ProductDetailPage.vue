<script setup>
import {
    ref,
    computed,
    onMounted
} from 'vue';
import { useRoute } from 'vue-router';
import ProductComponent from './ProductComponent.vue';

const route = useRoute();
const itemId = computed(() => route.params.id);

const productData = ref([]);

const fetchProducts = async () => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${itemId.value}`);

        if(response.ok) {
            const json = await response.json();
            productData.value = json;
        }
    } catch(error) {
        throw error;
    }
}

onMounted(() => {
    fetchProducts();
});
</script>

<template>
    <ProductComponent :products="productData" :isSingleProductComponent="true" />
</template>