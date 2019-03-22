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
        <draggable @change="log" v-model="list" tag="tbody">
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
      list: [
        { id: 549, name: "1", created: 1548247219 },
        { id: 569, name: "22", created: 1553261906 },
        { id: 570, name: "333", created: 1553261943 },
        { id: 571, name: "4444", created: 1553261944 },
        { id: 572, name: "5555", created: 1553261945 }
      ]
    };
  },
  methods: {
    log(event) {
      // debugger;
      let oldIndex = event.moved.oldIndex;
      let newIndex = event.moved.newIndex;

      console.log("old", oldIndex, "new", newIndex);
      // debugger;
      let neighbour = 0;
      if (newIndex < 0) {
        neighbour = event.moved.newIndex + 1;
      } else {
        neighbour = event.moved.newIndex + 1;
      }

      let neighbourTimestamp = this.list[neighbour].created;

      if (newIndex < 0 && oldIndex != 0) {
        this.list[1].created = neighbourTimestamp - 1;
      } else if (newIndex > 0) {
        // debugger;
        this.list[oldIndex].created = neighbourTimestamp - 1;
      } else {
        this.list[newIndex].created = neighbourTimestamp - 1;
      }

      this.list = this.list.sort((a, b) => a.created - b.created);
    }
  },
  computed: {
    theList: {
      get() {
        return this.list;
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
