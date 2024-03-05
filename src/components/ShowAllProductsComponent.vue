<script setup>
import {
    ref,
    onMounted
} from 'vue';
import ProductComponent from './ProductComponent.vue';

const productData = ref([]);

const fetchProducts = async () => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products`);

        if(response.ok) {
            const json = await response.json();
            productData.value = json;
        }
    } catch(error) {
        throw error;
    }
}


onMounted(() => fetchProducts());
</script>

<template>
    <ProductComponent :products="productData" :isSingleProductComponent="false" />
</template>
