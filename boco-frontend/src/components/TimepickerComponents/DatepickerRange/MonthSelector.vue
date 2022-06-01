<template>
  <div class="container-c main">
    <div class="button" v-on:click="back">
      <button>
        <span>
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </span>
      </button>
    </div>
    <div class="container-c text">
      <div class="date">
        {{ monthShort }}
      </div>
      <div class="date">
        {{ year }}
      </div>
    </div>
    <div class="button" v-on:click="forward">
      <button>
        <span>
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    month: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    monthDate() {
      return new Date(this.month);
    },
    monthShort() {
      return this.monthDate
        .toLocaleString("default", { month: "short" })
        .toUpperCase();
    },
    year() {
      return this.monthDate.getFullYear();
    },
  },
  methods: {
    back() {
      this.$emit("back", this.type);
    },
    forward() {
      this.$emit("forward", this.type);
    },
  },
};
</script>

<style>
.container-c {
  display: flex;
}

.container-c.main {
  justify-content: space-between;
  border: 1px solid black;
  padding: 5px;
  border-radius: 5px;
  max-width: 400px;
}

.text {
  justify-content: space-between;
  width: 50%;
  text-align: center;
}

.date {
  width: 50%;
  text-align: center;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
