<template>
  <b-row>
    <b-col lg="12">
      <h1 id="tables" class="bv-no-focus-ring" tabindex="-1">
        <span class="bd-content-title">Search</span>
      </h1>
      <b-overlay :show="busy" rounded="lg">
        <b-input-group size="sm" class="searchWrapper mb-2 mt-2">
          <b-form-input
            v-model="preSearch"
            trim
            id="wordSearch"
            ref="wordSearch"
            placeholder="Please start Typing."
            @update="clearSearch"
            type="search"
          ></b-form-input>
          <b-button-group size="sm">
            <b-button
              squared
              type="submit"
              @click.prevent="preformSearch"
              class="ripple"
              size="sm"
              variant="info"
              ><b-icon-search></b-icon-search>Search</b-button
            >
          </b-button-group>
        </b-input-group>
        <b-table></b-table>
      </b-overlay>
    </b-col>
    <b-col lg="12">
      <b-table
        id="wordsTable"
        ref="wordsTable"
        head-variant="dark"
        sticky-header
        class="table table-striped"
        sort-desc
        :fields="headers"
        :items="wordList"
        :bordered="true"
        :hover="true"
        :current-page="currentPage"
        :per-page="perPage"
        :busy="busy"
        small
        responsive
        tbody-tr-class="materials_table-row"
      >
        <template v-slot:footer> </template>
      </b-table>
      <b-pagination
        ref="materialPagination"
        variant="info"
        align="center"
        first-class="ripple"
        next-class="ripple"
        ellipsis-class="ripple"
        last-class="ripple"
        page-class="ripple"
        prev-class="ripple"
        v-model="currentPage"
        :total-rows="totalRowsLenght"
        :per-page="perPage"
        size="md"
        first-text="<<"
        prev-text="<"
        next-text=">"
        last-text=">>"
        ellipsis-text="..."
      ></b-pagination>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      headers: [
        {
          label: "id",
          key: "id",
        },
        {
          label: "Word",
          key: "word",
        },
      ],
      search: "",
      currentPage: 1,
      productHeaders: [],
    };
  },
  computed: {
    ...mapGetters({
      perPage: "getPerPage",
      busy: "getBusy",
      wordList: "getFilteredWords",
    }),
    preSearch: {
      get() {
        this.$store.getters["DbStore/getDashboardSearch"];
      },
      set(val) {
        this.search = val;
      },
    },
    totalRowsLenght() {
      return this.wordList.length;
    },
  },
  methods: {
    preformSearch() {
      this.$store.dispatch("setInput", this.search);
    },
    clearSearch(val) {
      if (val == "") this.$store.dispatch("clearUserInput", {});
    },
  },
};
</script>
<style lang="scss">
</style>