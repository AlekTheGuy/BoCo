<template>
  <div class="calendar">
    <div
      class="grid grid-cols-7 py-2 mt-0.5 border-b border-black border-opacity-10 dark:border-litepie-secondary-700 dark:border-opacity-100"
    >
      <div class="months" v-for="day in days" :key="day">{{ day }}</div>
    </div>
    <div class="daysList grid grid-cols-7 gap-y-0.5 my-1">
      <div
        class="days blocked"
        v-for="index in daysBeforeStartOfMonth"
        :key="index"
      >
        <button>
          {{ daysInMonthBeforeMonth - (daysBeforeStartOfMonth - index) }}
        </button>
      </div>
      <div
        class="days relative"
        v-for="index in daysInMonth"
        :key="index"
        :class="{
          disabled: this.isBlocked(index),
          selected: this.isDayStartDate(index) && !this.endDate,
          start: this.isDayStartDate(index),
          end: this.isDayEndDate(index),
          error: !!(
            this.isBlocked(index) && this.isDayBetweenStartAndEndDate(index)
          ),
          between: this.isDayBetweenStartAndEndDate(index),
        }"
      >
        <span class="overlay absolute inset-0"></span>
        <button v-on:Click="selectDate(index)">{{ index }}</button>
      </div>
      <div
        class="days blocked"
        v-for="index in daysRemainingInLastWeek"
        :key="index"
      >
        <button>{{ index }}</button>
      </div>
    </div>
    <p v-if="doesDaysSelectedContainBlockedDays()" class="text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    month: {
      type: Date,
      required: true,
    },
    blockedDaysRange: {
      type: Array,
      default: () => [],
    },
    start: {
      type: Date,
      default: () => null,
    },
    end: {
      type: Date,
      default: () => null,
    },
    errorMessage: {
      type: String,
      default: () => "You cannot select a blocked day",
    },
  },
  data() {
    return {
      days: ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"],
    };
  },
  computed: {
    monthDate() {
      return new Date(this.month);
    },
    startDate() {
      return this.start ? new Date(this.start) : null;
    },
    endDate() {
      return this.end ? new Date(this.end) : null;
    },
    blockedDays() {
      const blockedDays = [];
      this.blockedDaysRange.forEach((blockedDay) => {
        if (blockedDay.length === 2) {
          const start = new Date(blockedDay[0]);
          const end = new Date(blockedDay[1]);

          // Check if the start or end dates range ends in the current month or after the current month
          if (
            start.getMonth() <= this.monthDate.getMonth() &&
            end.getMonth() >= this.monthDate.getMonth()
          ) {
            if (
              start.getMonth() === this.monthDate.getMonth() &&
              end.getMonth() === this.monthDate.getMonth()
            ) {
              for (let i = start.getDate(); i <= end.getDate(); i++) {
                blockedDays.push(i);
              }
            } else if (
              start.getMonth() < this.monthDate.getMonth() &&
              end.getMonth() > this.monthDate.getMonth()
            ) {
              // Add all days of month to the list
              for (let i = 1; i <= this.daysInMonth; i++) {
                blockedDays.push(i);
              }
            } else if (start.getMonth() === this.monthDate.getMonth()) {
              // Add all days of start month to the list
              for (let i = start.getDate(); i <= this.daysInMonth; i++) {
                blockedDays.push(i);
              }
            } else if (end.getMonth() === this.monthDate.getMonth()) {
              // Add all days of end month to the list
              for (let i = 1; i <= end.getDate(); i++) {
                blockedDays.push(i);
              }
            }
          }
        } else {
          // check that day is in this month
          const day = new Date(blockedDay[0]);
          if (day.getMonth() !== this.monthDate.getMonth()) return;
          blockedDays.push(day.getDate());
        }
      });
      return blockedDays;
    },
    daysInMonth() {
      return new Date(
        this.monthDate.getFullYear(),
        this.monthDate.getMonth() + 1,
        0
      ).getDate();
    },
    daysRemainingInLastWeek() {
      return (
        7 -
        new Date(
          new Date(this.month).getFullYear(),
          new Date(this.month).getMonth() + 1,
          0
        ).getDay()
      );
    },
    daysInMonthBeforeMonth() {
      let daysInMonth = new Date(
        new Date(this.month).getFullYear(),
        new Date(this.month).getMonth(),
        0
      ).getDate();
      return daysInMonth;
    },
    daysBeforeStartOfMonth() {
      let firstDayOfMonth = new Date(
        new Date(this.month).getFullYear(),
        new Date(this.month).getMonth(),
        1
      );
      let dayOfWeek = firstDayOfMonth.getDay();
      let daysBefore = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      return daysBefore;
    },
  },
  methods: {
    isDateInMonth(date) {
      if (!date) return null;
      return (
        date.getFullYear() === this.monthDate.getFullYear() &&
        date.getMonth() === this.monthDate.getMonth()
      );
    },
    isDayStartDate(day) {
      // Check that start day is in month
      if (!this.isDateInMonth(this.startDate)) return false;
      return this.startDate && this.startDate.getDate() === day;
    },
    isDayEndDate(day) {
      // Check that end day is in month
      if (!this.isDateInMonth(this.endDate)) return false;
      return this.endDate && this.endDate.getDate() === day;
    },
    selectDate(day) {
      const date = new Date(
        this.monthDate.getFullYear(),
        this.monthDate.getMonth(),
        day
      );
      this.$emit("selectDate", date);
    },
    isBlocked(day) {
      return this.blockedDays.includes(day);
    },
    // Get date from day and month and check if it is between start and end
    isDayBetweenStartAndEndDate(day) {
      if (!this.startDate || !this.endDate) return false;
      const date = new Date(
        this.monthDate.getFullYear(),
        this.monthDate.getMonth(),
        day
      );
      return (
        this.startDate.getTime() < date.getTime() &&
        date.getTime() < this.endDate.getTime()
      );
    },
    doesDaysSelectedContainBlockedDays() {
      return false;
    },
  },
};
</script>

<style scoped>
.calendar {
  max-width: 400px;
}

.months {
  font-size: small;
  text-align: center;
}
.days {
  font-size: small;
  text-align: center;
}

.blocked button {
  cursor: not-allowed;
  color: gray;
}

.disabled {
  cursor: not-allowed;
}

.disabled button {
  cursor: not-allowed;
}

button {
  background-color: transparent;
  width: 3rem;
  height: 3rem;
}

.disabled span {
  background-color: red;
  border-radius: 5px;
  opacity: 0.6;
}

.disabled button {
  color: black;
}

.selected.start span {
  background-color: blue;
  opacity: 0.8;
  border-radius: 5px;
}

.start span {
  background-color: blue;
  opacity: 0.8;
  border-radius: 10px 0 0 10px;
}

.start button {
  color: white;
  font-weight: bold;
}

.end button {
  color: white;
  font-weight: bold;
}

.between span {
  background-color: lightblue;
  opacity: 0.8;
}

.error span {
  background-color: red;
  opacity: 0.7;
  border-radius: 0;
}

.end button {
  color: white;
  font-weight: bold;
}

.end span {
  background-color: blue;
  opacity: 0.8;
  border-radius: 0 10px 10px 0;
}

.overlay {
  z-index: -1;
}
</style>
