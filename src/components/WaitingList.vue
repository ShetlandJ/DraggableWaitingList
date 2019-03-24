<template>
  <div class="row">
    <div class="col-8">
      <h3>Draggable table</h3>

      <button @click="addCustomOrderToList">Re-arrange</button>

      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Created</th>
            <th scope="col">customOrder</th>
          </tr>
        </thead>
        <draggable @change="log" v-model="list" tag="tbody">
          <tr v-for="item in list" :key="item.waitingListEntryId">
            <td scope="row">{{ item.waitingListEntryId }}</td>
            <td>{{ item.created }}</td>
            <td>{{ item.customOrder }}</td>
          </tr>
        </draggable>
      </table>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  // name: "table-example",
  // display: "Table",
  // order: 7,
  components: {
    draggable
  },
  data() {
    return {
      dragging: false
    };
  },
  methods: {
    addCustomOrderToList() {
      this.$store.dispatch("GET_CUSTOM_ORDER");
    },

    async log(event) {
      let oldIndex = event.moved.oldIndex;
      let newIndex = event.moved.newIndex;

      let newOrderNumber;

      if (this.itemsAreNeighbours(oldIndex, newIndex)) {
        this.swapOrderNumbers(event, oldIndex, newIndex);
      } else {
        newOrderNumber = this.getNewOrderNumber(newIndex);
      }

      debugger;

      let payload = {
        newOrderNumber: newOrderNumber,
        waitingListEntryId: event.moved.element.waitingListEntryId
      };

      await this.$store.dispatch("GET_CUSTOM_ORDER_NUMBER", payload);
      await this.$store.dispatch("GET_LIST");
    },

    getNewOrderNumber(newIndex) {
      if (newIndex != 0) {
        let oneUpCustomOrderNumber = this.list[newIndex - 1].customOrder;
        let oneDownCustomOrderNumber = this.list[newIndex].customOrder;

        let difference =
          (oneDownCustomOrderNumber - oneUpCustomOrderNumber) / 2;

        let newCustomOrderNumber = oneUpCustomOrderNumber + difference;

        return newCustomOrderNumber;
      } else {
        let oneDownCustomOrderNumber = this.list[newIndex].customOrder;

        let newCustomOrderNumber = oneDownCustomOrderNumber / 2;

        return newCustomOrderNumber;
      }
    },

    async swapOrderNumbers(event, oldIndex, newIndex) {
      let movingItemCustomOrderNumber = this.list[oldIndex].customOrder;
      let nonMovingItemCustomOrderNumber = this.list[newIndex].customOrder;

      let payload = {
        newOrderNumber: nonMovingItemCustomOrderNumber,
        waitingListEntryId: event.moved.element.waitingListEntryId
      };

      await this.$store.dispatch("GET_CUSTOM_ORDER_NUMBER", payload);

      let payload2 = {
        newOrderNumber: movingItemCustomOrderNumber,
        waitingListEntryId: this.list[newIndex].waitingListEntryId
      };

      await this.$store.dispatch("GET_CUSTOM_ORDER_NUMBER", payload2);
    },

    itemsAreNeighbours(oldIndex, newIndex) {
      if (oldIndex - newIndex == 1 || oldIndex - newIndex == -1) {
        return true;
      }
    }
  },
  computed: {
    list: {
      get() {
        return this.$store.getters.list.sort(
          (a, b) => a.customOrder - b.customOrder
        );
      },

      set(value) {
        return value.sort((a, b) => a.customOrder - b.customOrder);
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
