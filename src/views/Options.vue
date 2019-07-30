<template>
 <b-container class="filter-row">
   <b-row class="text-left">
    <b-col></b-col>
    <b-col cols="5">
		
	<b-form-group label="Options:">
      <b-form-checkbox-group
        v-model="selected"
        :options="options"
        switches
        stacked
      ></b-form-checkbox-group>
    </b-form-group>

	
	  <b-button variant="outline-primary">Continue</b-button>
	</b-col>
    <b-col></b-col>
   </b-row>
</b-container>
</template>

<script>
  export default {
    data() {
      return {
		selected: [], // Must be an array reference!
        options: [
          { text: 'Filter available data by study (BrAPI studies-search call)', value: 'study' },
          { text: 'Retrieve available maps (and marker positions) data (BrAPI maps call)', value: 'map', disabled: true }
        ]
      }
    }
  }
</script>