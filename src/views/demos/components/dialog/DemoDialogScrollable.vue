<script lang="ts" setup>
const countryList = [
  { label: 'Bahamas, The', value: 'bahamas' },
  { label: 'Bahrain', value: 'bahrain' },
  { label: 'Bangladesh', value: 'bangladesh' },
  { label: 'Barbados', value: 'barbados' },
  { label: 'Belarus', value: 'belarus' },
  { label: 'Belgium', value: 'belgium' },
  { label: 'Belize', value: 'belize' },
  { label: 'Benin', value: 'benin' },
  { label: 'Bhutan', value: 'bhutan' },
  { label: 'Bolivia', value: 'bolivia' },
  { label: 'Bosnia and Herzegovina', value: 'bosnia' },
  { label: 'Botswana', value: 'botswana' },
  { label: 'Brazil', value: 'brazil' },
  { label: 'Brunei', value: 'brunei' },
  { label: 'Bulgaria', value: 'bulgaria' },
  { label: 'Burkina Faso', value: 'burkina' },
  { label: 'Burundi', value: 'burundi' },
  { label: 'Cabo Verde', value: 'cabo_verde' },
  { label: 'Cambodia', value: 'cambodia' },
  { label: 'Cameroon', value: 'cameroon' },
  { label: 'Canada', value: 'canada' },
  { label: 'Central African Republic', value: 'central_african_republic' },
  { label: 'Chad', value: 'chad' },
  { label: 'Chile', value: 'chile' },
  { label: 'China', value: 'china' },
  { label: 'Colombia', value: 'colombia' },
  { label: 'Comoros', value: 'comoros' },
  { label: 'Congo, Democratic Republic of the', value: 'congo_democratic_republic' },
  { label: 'Congo, Republic of the', value: 'congo_republic' },
  { label: 'Costa Rica', value: 'costa_rica' },
  { label: 'Croatia', value: 'croatia' },
  { label: 'Cuba', value: 'cuba' },
  { label: 'Cyprus', value: 'cyprus' },
  { label: 'Czech Republic', value: 'czech_republic' },
  { label: 'Denmark', value: 'denmark' },
  { label: 'Djibouti', value: 'djibouti' },
  { label: 'Dominica', value: 'dominica' },
  { label: 'Dominican Republic', value: 'dominican_republic' },
]

const selectedCountry = ref('')
const isDialogVisible = ref(false)
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    scrollable
    transition="slide-x-reverse-transition"
    fullscreen
    origin="overlap"
    class="v-dialog-sm"
    content-class="scrollable-dialog"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        Open Dialog
      </VBtn>
    </template>

    <!-- Dialog close btn -->
    <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

    <!-- Dialog Content -->
    <VCard>
      <VCardItem class="pb-5">
        <VCardTitle>Select Country</VCardTitle>
      </VCardItem>

      <VDivider />
      <VCardText>
        <VRadioGroup
          v-model="selectedCountry"
          :inline="false"
        >
          <VRadio
            v-for="country in countryList"
            :key="country.label"
            :label="country.label"
            :value="country.value"
            color="primary"
          />
        </VRadioGroup>
      </VCardText>

      <VDivider />

      <VCardText class="d-flex justify-end flex-wrap gap-3 pt-5 overflow-visible">
        <VBtn
          color="secondary"
          variant="tonal"
          @click="isDialogVisible = false"
        >
          Close
        </VBtn>
        <VBtn @click="isDialogVisible = false">
          Save
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.scrollable-dialog {
  overflow: visible !important;
}

.customizer-heading {
  padding-block: 1.3rem;
  padding-inline: 1.5rem;
}

.forceLocation {
  inset-inline: 0 !important;
  inset-inline-start: auto !important;
}

.v-dialog--fullscreen > .v-overlay__content {
  inset-inline: 0 !important;
  inset-inline-start: auto !important;
}
</style>
