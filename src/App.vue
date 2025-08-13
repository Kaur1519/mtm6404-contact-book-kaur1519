<script setup>
</script>

<template>
  <header class="app-header">
    <nav class="container">
      <router-link to="/" class="logo">Contact Book</router-link>
      <router-link to="/contacts/new" class="btn primary">+ New Contact</router-link>
    </nav>
  </header>

  <main class="container">
    <router-view />
  </main>
</template>

<style>
:root {
  --bg:#f7f8fa; --fg:#111; --muted:#6b7280; --brand:#2563eb; --card:#fff; --border:#e5e7eb;
}
*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:var(--fg);background:var(--bg)}
.container{max-width:900px;margin:0 auto;padding:16px}
.app-header{background:#fff;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10}
nav{display:flex;gap:12px;align-items:center;justify-content:space-between}
.logo{font-weight:700;text-decoration:none;color:var(--fg)}
.btn{padding:8px 12px;border:1px solid var(--border);border-radius:8px;text-decoration:none;background:#fff;cursor:pointer;display:inline-block}
.btn:hover{filter:brightness(0.98)}
.btn.primary{border-color:transparent;background:var(--brand);color:#fff}
.card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px}
.input{width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:#fff}
.row{display:flex;gap:12px;flex-wrap:wrap}
.actions{display:flex;gap:8px;flex-wrap:wrap}
a{color:var(--brand);text-decoration:none}
a:hover{text-decoration:underline}
</style>
