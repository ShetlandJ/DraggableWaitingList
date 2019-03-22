<template>
  <div class="row">
    <div class="col-8">
      <h3>Draggable table</h3>

      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <draggable @change="log" v-model="theList" tag="tbody">
          <tr v-for="item in theList" :key="item.name">
            <td scope="row">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.created }}</td>
          </tr>
        </draggable>
      </table>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "table-example",
  display: "Table",
  order: 7,
  components: {
    draggable
  },
  data() {
    return {
      dragging: false,
    };
  },
  methods: {
    log(event) {
      // debugger;
      let oldIndex = event.moved.oldIndex;
      let newIndex = event.moved.newIndex;

      console.log("old", oldIndex, "new", newIndex);

      if (oldIndex > newIndex) {
        this.moveUpQueue(oldIndex, newIndex)
      } else {
        this.moveDownQueue(oldIndex, newIndex)
      }
    },

    async moveUpQueue(oldIndex, newIndex) {
      let newTimestamp = this.list[newIndex].created;

      let payload = {
        index: oldIndex,
        created: newTimestamp - 1
      }

      await this.$store.dispatch('GET_LIST_ITEM_CREATED', payload)
    },

    async moveDownQueue(oldIndex, newIndex) {
      let newTimestamp = this.list[newIndex].created;

      let payload = {
        index: oldIndex,
        created: newTimestamp + 1
      }

      await this.$store.dispatch('GET_LIST_ITEM_CREATED', payload)
    }
  },
  computed: {
    theList: {
      get() {
        return this.$store.getters.list.sort((a, b) => a.created - b.created);
      },

      set(value) {
        this.list = value.sort((a, b) => a.created - b.created);
      }
    }
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}

table {
  background: #ffffff;
  margin-bottom: 1.25rem;
  border: solid 3px #ebebeb;
  table-layout: auto;
}
table caption {
  background: transparent;
  color: #09425e;
  font-size: 1rem;
  font-weight: bold;
}
table thead {
  background: #f0f0f0;
}
table thead tr th,
table thead tr td {
  padding: 0.5rem 0.625rem 0.625rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #09425e;
}
table tfoot {
  background: #f0f0f0;
}
table tfoot tr th,
table tfoot tr td {
  padding: 0.5rem 0.625rem 0.625rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #09425e;
}
table tr th,
table tr td {
  padding: 0.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #535353;
  text-align: left;
}
table tr.even,
table tr.alt,
table tr:nth-of-type(even) {
  background: #f8f8f8;
}
table thead tr th,
table tfoot tr th,
table tfoot tr td,
table tbody tr th,
table tbody tr td,
table tr td {
  display: table-cell;
  line-height: 1.125rem;
}
</style>
