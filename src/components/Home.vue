<script setup>
import Movie from './ListMovie/Movie.vue';
import {allShows, searchShows} from './../api/Api'
import {onMounted, reactive, watch} from 'vue'
import ListMovie from './ListMovie/ListMovie.vue';

const state = reactive({
  topRatedShows: [],
  query: '',
  shows: [],
})

watch(
  () => state.query,
  async (newQuery) => {
    state.shows = await searchShows(newQuery)
  },
)

onMounted(async () => {
  const shows = await allShows()

  state.topRatedShows = shows.filter((item) => item.rating.average >= 7.5)
  console.log(state.topRatedShows)
})



</script>

<template>
  <input v-model="state.query" type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none" placeholder="Search shows...">
  <div class="shows grid md:grid-cols-3 lg:grid-cols-5 gap-8" data-test="items">
      <ListMovie
        v-for="item in state.shows"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :image="item.image?.medium || '/cover-default.jpg'"
        :genres="item.genres"
        :rating="item.rating.average || 0"
        :url="item.url"
      />
    </div>
  <Movie class="mt-3" :shows="state.topRatedShows"/>
</template>

