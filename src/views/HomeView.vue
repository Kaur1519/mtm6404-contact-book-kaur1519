<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAllContacts } from '../store/contacts';

const query = ref('');
const contacts = ref([]);

function refresh() {
  contacts.value = getAllContacts(); // already sorted by last name
}
onMounted(refresh);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return contacts.value;
  return contacts.value.filter(c =>
    (c.firstName || '').toLowerCase().includes(q) ||
    (c.lastName || '').toLowerCase().includes(q)
  );
});
</script>

<template>
  <section class="card">
    <input
      class="input"
      v-model="query"
      type="search"
      placeholder="Search by first or last name"
      aria-label="Search contacts"
    />
  </section>

  <section style="margin-top:12px">
    <div v-if="filtered.length === 0" class="card">
      <p class="muted">No contacts yet or no results. Click “+ New Contact” to add one.</p>
    </div>

    <ul v-else class="list">
      <li v-for="c in filtered" :key="c.id" class="card">
        <div class="row" style="align-items:center; justify-content:space-between">
          <div>
            <router-link :to="`/contacts/${c.id}`" class="name">
              {{ c.firstName }} {{ c.lastName }}
            </router-link>
            <div class="muted">{{ c.email }}</div>
          </div>
          <router-link class="btn" :to="`/contacts/${c.id}`">View</router-link>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.list { list-style:none; padding:0; margin:0; display:grid; gap:10px; }
.name { font-weight:600; text-decoration:none; }
.name:hover { text-decoration:underline; }
.muted { color:#6b7280; }
</style>
