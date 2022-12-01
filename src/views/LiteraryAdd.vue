<template>
    <div v-if="literary" class="page mt-3">
        <h4 class="p-2 bg-success text-light rounded-pill text-center">Thêm Tác phẩm</h4>
        <LiteraryForm
            :literary="literary"
            @submit:literary="addLiterary"
        />
        <div class="nav-item col">
                <router-link :to="{ name: 'LiteraryBook' }" class="navbar-brand">
                    <b>QUẢN LÝ TÁC PHẨM VĂN HỌC </b>
                    <i class="fas fa-address-card"></i>
                </router-link>
        </div>
        <p>{{ message }}</p>
    </div>
</template>
<script>
import LiteraryForm from "@/components/LiteraryForm.vue";
import LiteraryService from "@/services/literary.service";

export default {
    components: {
        LiteraryForm,
    },
    data() {
        return {
            literary: {},
            message: "",
        };
    },
    methods: {
        async addLiterary(data) {
            try {
                await LiteraryService.create(this.literary);
                this.message = "Tác phẩm đã được thêm thành công.";
            } catch (error) {
                console.log(error);
                console.log(data);
            }
        },
    },
};
</script>