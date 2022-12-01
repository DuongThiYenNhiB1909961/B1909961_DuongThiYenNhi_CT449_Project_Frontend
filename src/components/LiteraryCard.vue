<script>
export default {
    props: {
        literary: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên tác phẩm:</strong>
            {{ literary.name }}
        </div>
        <div class="p-1">
            <strong>Tác giả:</strong>
            {{ literary.author }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ literary.address }}
        </div>
        <div class="p-1">
            <strong>Năm sinh:</strong>
            {{ literary.year }}
        </div>
        <div class="p-1">
            <strong>Mô tả:</strong>
            {{ literary.describe }}
        </div>
        <div class="p-1">
            <strong>Sơ lược tác phẩm:</strong>
            {{ literary.brief }}
        </div>
        <div class="p-1">
            <strong>Liên hệ yêu thích:&nbsp;</strong>
            <i v-if="literary.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>