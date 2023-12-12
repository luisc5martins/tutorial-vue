<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import useGenreStore from '@/stores/genre';

const genreStore = useGenreStore();
const router = useRouter()
const genres = ref([]);
const tv = ref([]);
const isLoading = ref(false);

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const listTv = async (genreId) => {
    genreStore.setCurrentGenreId(genreId);
    isLoading.value = true;
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            language: 'pt-BR',
        },
    });
    tv.value = response.data.results;
    isLoading.value = false;
};

onMounted(async () => {
    const response = await api.get('genre/tv/list?language=pt-BR')
    genres.value = response.data.genres
})

onMounted(async () => {
    isLoading.value = true;
    await genreStore.getAllGenres('tv');
    isLoading.value = false;
});
</script>
<template>
    <h1>Programas de TV</h1>
    <ul class="genre-list">
        <li class="genre-item" :class="{ active: genre.id === genreStore.currentGenreId }"
            v-for="genre in genreStore.genres" :key="genre.id" @click="listTv(genre.id)">

            {{ genre.name }}

        </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page />

    <div class="tv-list">
        <div v-for="tv in tv" :key="tv.id" class="tv-card">

            <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.name"
                @click="openTv(tv.id)" />
            <div class="tv-details">
                <p class="tv-name">{{ tv.name }}</p>
                <p class="tv-first_air_date">{{ formatDate(tv.first_air_date) }}</p>
                <p class="tv-genres">
                    <span v-for="genre_id in tv.genre_ids" :key="genre_id" @click="listTv(genre_id)"
                        :class="{ active: genre_id === genreStore.currentGenreId }">
                        {{ genreStore.getGenreName(genre_id) }}
                    </span>
                </p>
            </div>

        </div>
    </div>
</template>
<style scoped>
.active {
    background-color: #67b086;
    font-weight: bolder;
}

.tv-genres span.active {
    background-color: #abc322;
    color: #000;
    font-weight: bolder;
}

.tv-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.tv-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
}

.tv-details {
    padding: 0 0.5rem;
}

.tv-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
}

.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    margin-bottom: 2rem;
}

.genre-item {
    background-color: #387250;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    color: #fff;
}

.genre-item:hover {
    cursor: pointer;
    background-color: #4e9e5f;
    box-shadow: 0 0 0.5rem #387250;
}

.tv-genres {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    gap: 0.2rem;
}

.tv-genres span {
    background-color: #748708;
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    color: #fff;
    font-size: 0.8rem;
    font-weight: bold;
}

.tv-genres span:hover {
    cursor: pointer;
    background-color: #455a08;
    box-shadow: 0 0 0.5rem #748708;
}
</style>