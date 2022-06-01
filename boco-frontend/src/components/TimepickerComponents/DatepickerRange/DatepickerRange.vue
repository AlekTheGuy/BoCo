<template>
  <div>
    <div class="input" v-on:click="openCalendar()">
      <label>
        <input
          type="text"
          v-model="value"
          v-bind:placeholder="messageOnDisplay"
        />
      </label>
    </div>
    <div class="picker" :style="style">
      <div class="calenders">
        <div>
          <month-selector
            @back="back"
            type="month"
            @forward="forward('month')"
            :month="month"
          ></month-selector>
          <calendar-component
            :month="month"
            :start="startDate"
            :end="endDate"
            @selectDate="selectDate"
            :blockedDaysRange="blockedDaysRange"
          ></calendar-component>
        </div>
      </div>
      <div class="footer">
        <p v-if="error" class="error">{{ errorMessage }}</p>
        <div v-else></div>
        <div class="buttons">
          <button class="btn btn-gray" v-on:click="reset()">RESET</button>
          <button class="btn btn-blue" v-on:click="complete()">COMPLETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarComponent from "./CalendarComponent.vue";
import MonthSelector from "./MonthSelector.vue";
export default {
  components: {
    CalendarComponent,
    MonthSelector,
  },
  props: {
    range: {
      type: Boolean,
      default: true,
    },
    blockedDaysRange: {
      type: Array,
      default: () => [],
    },
    messageOnDisplay: String,
  },
  data() {
    return {
      month: new Date(),
      monghM: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
      startDate: new Date(Number.MAX_VALUE),
      endDate: null,
      error: false,
      errorMessage: "Produktet kan ikke utlånes i denne perioden",
      open: false,
      value: null,
      style: {
        display: "none",
      },
    };
  },
  methods: {
    openCalendar() {
      // Edit style
      this.open = true;
      this.style = {
        display: "flex",
      };
    },
    reset() {
      this.startDate = new Date(Number.MAX_VALUE);
      this.endDate = null;
      this.value = null;
      this.error = false;
      this.$emit("value", {
        startDate: null,
        endDate: null,
      });
    },
    complete() {
      if (this.error) return;
      this.open = false;
      this.style = {
        display: "none",
      };

      // Set value to the start and end date
      this.value = `${this.startDate.toLocaleDateString()} - ${this.endDate.toLocaleDateString()}`;
      this.$emit("value", {
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
    selectDate(date) {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      if (this.isBlocked(day, month, year)) return;
      if (date > this.startDate) {
        this.endDate = date;
      } else {
        this.startDate = date;
      }

      if (this.range) {
        this.value = `${this.startDate?.toLocaleDateString()} - ${
          this.endDate?.toLocaleDateString() || ""
        }`;
      } else {
        this.value = `${this.startDate.toLocaleDateString()}`;
      }
      // Check if start and end check if any days in range is blocked
      for (
        let i = new Date(this.startDate.toUTCString());
        i <= this.endDate;
        i.setDate(i.getDate() + 1)
      ) {
        if (this.isBlocked(i.getDate(), i.getMonth(), i.getFullYear())) {
          this.error = true;
          return;
        }
      }

      if (this.error) this.error = false;
    },
    isBlocked(day, month, year) {
      return this.blockedDaysRange.some(([start, end]) => {
        // Check if start is the same day
        if (
          start.getDate() === day &&
          start.getMonth() === month &&
          start.getFullYear() === year
        ) {
          return true;
        }
        return (
          start <= new Date(year, month, day) &&
          new Date(year, month, day) <= end
        );
      });
    },
    back(type) {
      switch (type) {
        case "month": {
          this.month.setMonth(this.month.getMonth() - 1);
          this.month = new Date(this.month);
          break;
        }
        case "monghM":
          this.monghM.setMonth(this.monghM.getMonth() - 1);
          this.monghM = new Date(this.monghM);
          if (this.monghM.getMonth() === this.month.getMonth()) {
            this.month.setMonth(this.month.getMonth() - 1);
            this.month = new Date(this.month);
          }
          break;
      }
    },
    forward(type) {
      switch (type) {
        case "month": {
          this.month.setMonth(this.month.getMonth() + 1);
          this.month = new Date(this.month);
          if (this.month.getMonth() == this.monghM.getMonth()) {
            this.monghM.setMonth(this.monghM.getMonth() + 1);
            this.monghM = new Date(this.monghM);
          }
          break;
        }
        case "monghM":
          this.monghM.setMonth(this.monghM.getMonth() + 1);
          this.monghM = new Date(this.monghM);
          break;
      }
    },
  },
};
</script>

<style scoped>
.input label {
  display: block;
  position: relative;
}

.input input {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  padding-right: 50px;
}

.picker {
  position: absolute;
  background-color: white;
  margin-top: 5px;
  z-index: 50;
  border: 1px solid black;
  border-radius: 4px;
  padding: 5px;
  flex-direction: column;
  width: auto;
  max-width: 700px;
  overflow: auto;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 14px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 14px 5px rgba(0, 0, 0, 0);
}
.split {
  border-left: 2px solid black;
  margin-left: 10px;
  margin-right: 10px;
  height: auto;
}

.calenders {
  display: flex;
}

.footer {
  display: flex;
  justify-content: space-between;
}

.error {
  align-self: center;
  color: red;
}

.buttons {
  float: right;
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 800px) {
  .calenders {
    flex-direction: column;
  }

  .picker {
    max-width: 420px;
  }
}
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-primary-light text-white;
}
.btn-blue:hover {
  @apply bg-primary-medium;
}
.btn-gray:hover {
  @apply bg-gray-300;
}
</style>
