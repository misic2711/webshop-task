<script setup>
import { 
    defineProps, 
    ref,
    computed
 } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentPage = ref(1);
const itemsPerPage = 6;

const props = defineProps({
  products: Object,
  isSingleProductComponent: Boolean
});

const setPage = page => {
    if(!totalPages.value) {
        return;
    }

    page >= 1 && page <= totalPages.value ? 
        currentPage.value = page : 
        null;
};

const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if(!props.products) {
        return;
    }

    return props.products.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
    if(!props.products) {
        return;
    }

    return Math.ceil(props.products.length / itemsPerPage);
});

const openPdp = (id) => {
    router.push({ 
        name: 'ProductDetailPage', 
        params: { 
            id: id
        }
     });
}
</script>

<template>
     <section class="product-card-container">
        <template v-if="props.isSingleProductComponent">
            <div class="product-card">
                <div>
                    <img :src="props.products ? props.products.image : ''" alt="product image" />
                </div>
                <div>
                    <h3>{{ props.products ? props.products.title : '' }}</h3>
                </div>
                <div>
                    <h3>$ {{ props.products ? props.products.price : '' }}</h3>
                </div>
            </div>
        </template>

        <template v-else>
            <div 
                v-for="(product, index) in paginatedData" 
                :key="index" 
                :id="`product-${product.id}`" 
                class="product-card"
                @click="openPdp(product.id)"
            >
                <div>
                    <img :src="product.image" alt="product image" />
                </div>
                <div>
                    <h3>{{ product.title }}</h3>
                </div>
                <div>
                    <h3>$ {{ product.price }}</h3>
                </div>
                <div>
                    <button type="button">Add to WishList</button>
                    <button type="button">Add to Cart</button>
                </div>
            </div>
        </template>
    </section>

    <div class="pagination" v-if="!props.isSingleProductComponent">
            <button 
                @click="setPage(currentPage - 1)" 
                :disabled="currentPage === 1"
            >
                Previous
            </button>

            <span style="margin: 0 10px;">{{ currentPage }} / {{ totalPages }}</span>

            <button 
                @click="setPage(currentPage + 1)" 
                :disabled="currentPage === totalPages"
            >
                Next
            </button>
    </div>
</template>