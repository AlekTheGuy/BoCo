<template>
  <div class="mt-10 bg-white justify-center w-screen">
    <div id="contact" class="grid place-items-center w-full">
      <div class="lg:mb-0 text-gray-700 w-full">
        <div class="mx-4">
          <h2
            class="flex justify-center text-primary-dark mb-6 uppercase font-bold text-2xl mt-4"
          >
            Kontakt oss
          </h2>
          <p
            class="flex justify-center mx-auto text-gray-500 leading-relaxed mb-12 max-w-md mt-8"
          >
            {{ contact.description }}
          </p>
        </div>
        <div class="flex justify-center mb-12 w-full">
          <div class="max-w-14 max-h-14 min-h-14 min-w-14">
            <LocationMarkerIcon
              class="w-14 h-14 text-primary-dark rounded mr-4"
            />
          </div>
          <div class="">
            <h4 class="font-bold text-gray-800 text-xl mb-1">Lokaler</h4>
            <p>{{ contact.address }}</p>
            <p>{{ contact.city }}</p>
            <p>{{ contact.country }}</p>
          </div>
        </div>
        <div class="flex justify-center mb-10 w-full pr-11">
          <div class="max-w-14 max-h-14 min-h-14 min-w-14">
            <MailIcon class="w-14 h-14 text-primary-dark rounded mr-4" />
          </div>
          <div class="">
            <h4 class="font-bold text-gray-800 text-xl mb-1">E-postadresse</h4>
            <p>{{ contact.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="faq">
      <div
        class="mx-auto text-center px-4 mt-8 text-2xl text-primary-dark font-semibold"
      >
        Ofte stilte spørsmål
      </div>
      <div
        class="mt-8 mx-auto max-w-screen-sm lg:max-w-screen-lg flex flex-col lg:grid lg:grid-cols-2"
      >
        <dl v-for="(faqItem, index) in FAQ" :key="index">
          <div id="faqItem" class="">
            <div
              id="question-and-answer"
              class="select-none cursor-pointer border-2 mx-8 my-3 px-6 py-4 rounded-lg text-sm group"
            >
              <dt id="question" @click="toggle(faqItem)">
                <div class="flex justify-between text-gray-800">
                  <div class="font-bold">
                    {{ faqItem.question }}
                  </div>
                  <div>
                    <div v-if="!faqItem.toggle" @click="toggle(faqItem)">
                      <ChevronDoubleDownIcon
                        class="h-5 w-5 block rounded-full p-1"
                      />
                    </div>
                    <div v-else @click="toggle(faqItem)">
                      <ChevronDoubleUpIcon
                        class="h-5 w-5 block rounded-full p-1"
                      />
                    </div>
                  </div>
                </div>
              </dt>
              <dd v-if="faqItem.toggle" class="mt-2 leading-snug text-gray-700">
                {{ faqItem.answer }}
              </dd>
            </div>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChevronDoubleDownIcon,
  LocationMarkerIcon,
  ChevronDoubleUpIcon,
  MailIcon,
} from "@heroicons/vue/outline";

export default {
  data() {
    return {
      contact: {
        description:
          "BoCo (Borrow Community) er et norsk selskap som tilbyr en plattform for utlån av gjenstander for privatpersoner og bedrifter. BoCo streber for å bli den foretrukne plattformen for lån for privatpersoner og bedrifter i Norge.",
        email: "kontakt@boco.no",
        address: "O. S. Bragstads Plass 2G",
        city: "Trondheim",
        country: "Norge",
      },
      FAQ: [
        {
          question: "Hvordan kan jeg legge ut en gjenstand til leie?",
          answer:
            "Ved å trykke på plus-ikonet i navigasjons-baren øverst på siden. Dette vil ta deg til et skjema for å legge ut en ny gjenstand.",
          toggle: false,
        },
        {
          question: "Hvordan kan jeg opprette en ny gruppe?",
          answer:
            "Fra hovedsiden kan man trykke på pluss-person-ikonet ved siden av mine grupper som vil ta deg til skjemaet for å lage en ny gruppe.",
          toggle: false,
        },
        {
          question: "Hvordan kan jeg bli med i en gruppe?",
          answer:
            "På hovedsiden vil alle offentlige og lukkede grupper vises. Når du trykker på ønsket gruppe vil du få muligheten til å bli med/sende medlemsforespørsel.",
          toggle: false,
        },
        {
          question:
            "Hva vil jeg ha tilgang til ved å logge inn/opprette en bruker?",
          answer:
            "Uten å være logget inn vil du kunne se alle grupper, og også se gjenstander som ligger ute til lån i offentlige grupper. For å kunne låne en gjenstand må du være med i gruppen gjenstanden ligger i, og for dette må du være innlogget. Du må også være innlogget for å sende medlemsforespørsel i lukkede grupper.",
          toggle: false,
        },
      ],
    };
  },
  components: {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
    MailIcon,
    LocationMarkerIcon,
  },
  methods: {
    toggle(faqItem) {
      faqItem.toggle = !faqItem.toggle;
    },
  },
};
</script>
