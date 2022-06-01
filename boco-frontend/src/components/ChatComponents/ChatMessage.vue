<template>
  <div v-bind:class="'blob-container ' + this.side()">
    <div v-bind:class="this.color() + ' message-container ' + this.textColor()">
      <span class="message">{{ this.message.content }}</span>
      <span class="">{{ this.calculateTime() }}</span>
    </div>
  </div>
</template>

<style scoped>
.blob-container {
  display: flex;
  max-width: 100%;
}

.message {
  word-break: break-word;
  display: block;
}

.message-container {
  border-radius: 10px;
  max-width: 70%;
  padding: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
</style>
<script>
import { parseCurrentUser } from "@/utils/token-utils";
//block text-xs text-right
export default {
  props: {
    message: Object,
  },
  data() {
    return {};
  },
  computed: {
    userID() {
      return parseCurrentUser().accountId;
    },
  },
  methods: {
    color() {
      return this?.message.from == this.userID
        ? "bg-gray-300"
        : "bg-primary-medium";
    },
    textColor() {
      return this?.message.from == this.userID ? "text-gray-900" : "text-white";
    },
    side() {
      return this?.message.from == this.userID
        ? "justify-start"
        : "justify-end";
    },
    calculateTime() {
      var time = this?.message.timestamp;
      var date = new Date(time);

      var mmOfMessage = String(date.getMinutes());
      var hhOfMessage = String(date.getHours());
      if (mmOfMessage <= 9) {
        mmOfMessage = "0" + mmOfMessage;
      }
      if (hhOfMessage <= 9) {
        hhOfMessage = "0" + hhOfMessage;
      }
      var ddOfMessage = String(date.getDate()).padStart(2, "0");
      var dayOfMessage = date.toLocaleString("default", { weekday: "short" });
      var monthOfMessage = String(date.getMonth() + 1).padStart(2, "0");
      const shortMonthOfMessage = date.toLocaleString("default", {
        month: "short",
      });
      var yyyyOfMessage = date.getFullYear();

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      if (ddOfMessage == dd) {
        return "" + hhOfMessage + ":" + mmOfMessage + "";
      } else if (this.isDateInThisWeek(date)) {
        return "" + dayOfMessage + "  " + hhOfMessage + ":" + mmOfMessage;
      } else if (monthOfMessage == mm) {
        return "" + ddOfMessage + "  " + hhOfMessage + ":" + mmOfMessage;
      } else if (yyyyOfMessage == yyyy) {
        return "" + shortMonthOfMessage + "  " + ddOfMessage;
      }
      return (
        shortMonthOfMessage + "  " + ddOfMessage + "  " + yyyyOfMessage + ""
      );

      /*
        Take timestamp and display date when message was sent
        If message was sent this day show time (HH:MM) (13:00)
        If message was sent this week show day of the week and time (DDD HH:MM) (Mon 13:00)
        If message was sent this month show day of the month, date and time (DD HH:MM) (13 13:00)
        If message was sent this year show month and day of the month (MMM DD) (Jan 13)
        If message was sent more than a year ago show year with date (MMM DD YYYY) (Jan 13 2020)
      */
    },
    isDateInThisWeek(date) {
      const todayObj = new Date();
      const todayDate = todayObj.getDate();
      const todayDay = todayObj.getDay();

      // get first date of week
      const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay));

      // get last date of week
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

      // if date is equal or within the first and last dates of the week
      return date >= firstDayOfWeek && date <= lastDayOfWeek;
    },
  },
};
</script>
