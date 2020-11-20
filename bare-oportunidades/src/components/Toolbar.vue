<template>
  <div>
    <q-toolbar id="toolbar">
      <img
        id="logo"
        src="~assets/img/marca-bare.oportunidades-02.svg"
        alt="Bare Oportunidades"
        width="150px"
      />
      <q-space />
      <q-tabs v-model="tab" shrink @click="eventoTab">
        <slot />
      </q-tabs>
      <q-avatar size="60px" color="primary" text-color="white" id="avatar" @click="drawer = !drawer">
        {{nomeLogo}}
      </q-avatar>
    </q-toolbar>
    <q-drawer
      side="right"
      v-model="drawer"
      :width="250"
      :breakpoint="500"
      overlay
      bordered
      :content-style="{ backgroundColor: '#FBFBFB' }"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" style="color:#e65100" />
            </q-item-section>
            <q-item-section
              style="color:#e65100"
              @click="logout(menuItem.label)"
            >
              {{ menuItem.label }}
            </q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
const menuList = [
  {
    icon: "account_box",
    label: "Perfil",
    separator: true
  },
  {
    icon: "school",
    label: "Faculdade",
    separator: false
  },
  {
    icon: "feedback",
    label: "Sobre o Sistema",
    separator: false
  },
  {
    icon: "exit_to_app",
    label: "Sair",
    separator: false
  }
];
export default {
  name: "Tollbar",
  data() {
    return {
      tab: "",
      drawer: false,
      menuList,
      nomeLogo:"BO"
    };
  },
  mounted() {
    const usuario =  JSON.parse(sessionStorage.getItem("usuario")).email;
    const nl = usuario.split(" ");
    const nl2 = usuario.split("");
    this.nomeLogo = `${nl2[0]}`.toUpperCase();
  },
  methods: {
    logout(e) {
      if (e === "Sair") {
        sessionStorage.clear();
        window.location = "http://localhost:8080/";
      }
    },
    eventoTab() {
      this.$emit("tabHeader", this.tab);
    }
  }
};
</script>
<style>
#logo {
  align-self: center;
  margin-left: 5%;
}
.q-toolbar {
  height: 80px;
  background: #fbfbfb;
  border-bottom: solid 2px #e65100;
  opacity: 5;
}

.q-tab__label {
  color: #e65100;
}

.items-center {
  align-items: flex-end;
}

.q-avatar {
  margin-bottom: 0.5%;
  margin-right: 6%;
}

.q-avatar:hover {
  cursor: pointer;
}
</style>
