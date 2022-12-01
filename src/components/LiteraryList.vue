<script>
export default {
    props: {
        literaries: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
<template>
    <ul class="list-group">
        <li
            class="list-group-item"
            v-for="(literary, index) in literaries"
            :key="literary._id"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)"
        >
            {{ literary.name }}
        </li>
    </ul>
</template>
