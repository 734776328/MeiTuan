<template lang="html">
  <div class="m-detail-list">
    <ul>
      <li>
        <h4>
          {{ list.filter(item=>item.photos.length).length }}款套餐
        </h4>
      </li>
      <item
        v-for="(item,idx) in list"
        :key="idx"
        :meta="item" />
    </ul>
  </div>
</template>

<script>
import Item from './item.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type:Array,
      default:()=>{
        return []
      }
    }
  },
}
</script>
<style scoped>
.m-detail-list {
  background-color: #fff;
  padding: 10px 0 0 10px;
} 
.m-detail-list h4 {
  font-size: 18px;
  padding-left: 0;
  margin-left: 0;
  font-weight: 600;
  color: #000;
}
.m-detail-list li {
  list-style-type: none;
}
</style>