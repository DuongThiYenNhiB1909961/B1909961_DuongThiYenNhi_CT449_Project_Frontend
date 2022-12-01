<template>
    <div v-if="literary" class="page mt-3">
        <h4 class="p-2 bg-success text-light rounded-pill text-center">Hiệu chỉnh Tác phẩm</h4>
        <LiteraryForm :literary="literary" @submit:literary="updateLiterary" @delete:literary="deleteLiterary" />
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
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            literary: null,
            message: "",
        };
    },
    methods: {
        async getLiterary(id) {
            try {
                this.literary = await LiteraryService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateLiterary(data) {
            try {
                await LiteraryService.update(this.literary._id, data);
                this.message = "Tác phẩm được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
        async deleteLiterary() {
            if (confirm("Bạn muốn xóa Tác phẩm này?")) {
                try {
                    await LiteraryService.delete(this.literary._id);
                    this.$router.push({ name: "literarybook" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getLiterary(this.id);
        this.message = "";
    },
};
</script>