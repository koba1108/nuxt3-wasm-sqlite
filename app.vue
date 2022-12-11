<template>
  <div>
    <h1>App</h1>
    <ul>
      <li v-for="u in users">
        <div>id: {{ u.id }}</div>
        <div>name: {{ u.name }}</div>
        <div>createdAt: {{ u.createdAt }}</div>
        <div>updatedAt: {{ u.updatedAt }}</div>
      </li>
    </ul>
    <button @click="fetchUsers">Fetch User From Sqlite</button>
  </div>
</template>
<script lang="ts" setup>
import {useNuxtApp} from "#imports";

const {$db} = useNuxtApp()

interface User {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

const users = ref<User[]>([])

const fetchUsers = () => {
  const query = `SELECT * FROM users`;
  $db.exec(query).map((row) => {
    users.value = []
    row.values.map((v) => {
      users.value.push({
        id: Number(v[0]),
        name: `${v[1]}`,
        createdAt: `${v[2]}`,
        updatedAt: `${v[3]}`
      });
    });
    return row;
  });
}
</script>
