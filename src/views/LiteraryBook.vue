<template>
    <div class=" row ">
        <div class="col-md-10 mx-auto">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6 mx-auto">
            <h4 class="text-danger">
                Tác Phẩm
                <font-awesome-icon icon="fa-solid fa-books-medical" />
            </h4>
            <LiteraryList v-if="filteredLiterariesCount > 0" :literaries="filteredLiteraries"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có tác phẩm nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-success" @click="goToAddLiterary">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllLiteraries">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeLiterary">
                <h4 class="text-danger">
                Chi tiết Liên hệ
                <i class="fas fa-address-card"></i>
                </h4>
                <LiteraryCard :literary="activeLiterary" />
                <router-link
                    :to="{
                        name: 'literary.edit',
                        params: { id: activeLiterary._id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span
                    >
                </router-link>
                
            </div>
        </div>
    </div>
</template>
<script>
import LiteraryCard from "@/components/LiteraryCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import LiteraryList from "@/components/LiteraryList.vue";
import LiteraryService from "@/services/literary.service";
export default {
    components: {
        LiteraryCard,
        InputSearch,
        LiteraryList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            literaries: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        literaryStrings() {
            return this.literaries.map((literary) => {
                const { name, author, address, year, describe, brief } = literary;
                return [name, author, address, year, describe, brief].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredLiteraries() {
            if (!this.searchText) return this.literaries;
            return this.literaries.filter((_literary, index) =>
                this.literaryStrings[index].includes(this.searchText)
            );
        },
        activeLiterary() {
            if (this.activeIndex < 0) return null;
            return this.filteredLiteraries[this.activeIndex];
        },
        filteredLiterariesCount() {
            return this.filteredLiteraries.length;
        },
    },
    methods: {
        async retrieveLiteraries() {
            try {
                this.literaries = await LiteraryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveLiteraries();
            this.activeIndex = -1;
        },
        async removeAllLiteraries() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await LiteraryService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddLiterary() {
            this.$router.push({ name: "literary.add" });

        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 100%;
}
</style>