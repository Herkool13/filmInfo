<template>
  <router-link :to="{ name: 'filmInfo', params: { id: film.id } }">
    <div class="flex flex-row film-card">
      <img :src="filmPoster" alt="" srcset="" class="filmPoster" />
      <div class="card-info">
        <h3 class="card-title">{{ film.original_title }}</h3>
        <div>
          <div class="flex flex-flow justify-start items-center date-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-calendar"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
              />
            </svg>
            <p class="date">{{ film.release_date }}</p>
          </div>
          <div>
            <p class="ganre">{{ ganreString }}</p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  props: ["film", "genres"],
  setup(props) {
    const filmPoster = ref("");
    const ganreString = ref("");
    filmPoster.value = `https://image.tmdb.org/t/p/w500${props.film.poster_path}`;
    watch(props, () => {
      filmPoster.value = `https://image.tmdb.org/t/p/w500${props.film.poster_path}`;
    });
    let listOfGanre = [];
    props.film.genre_ids.forEach((g) =>
      listOfGanre.push(
        JSON.parse(JSON.stringify(props.genres)).filter(
          (film) => film.id == g
        )[0].name
      )
    );
    ganreString.value = listOfGanre.join(" | ");
    return { filmPoster, ganreString };
  },
};
</script>

<style scoped>
.filmPoster {
  width: 128px;
  height: 189px;
  border-radius: 6px 0px 0px 6px;
  margin: auto 1px;
}
.film-card {
  width: 295px;
  height: 195px;
  background: #f1f1f1;
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  margin-bottom: 35px;
  align-content: center;
  justify-content: start;
}
.card-info {
  display: flex;
  flex-flow: column nowrap;
  margin-left: 11px;
  justify-content: space-between;
}
.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-top: 16px;
  margin-right: 17px;
}
.date {
  margin-left: 3px;
  color: #4e4e4e;
  margin-bottom: 0;
}
.date-box {
  color: #4e4e4e;
  margin: 0;
}
.ganre {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #505050;
  margin-bottom: 28px;
  margin-top: 15px;
}
</style>