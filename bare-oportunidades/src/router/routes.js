const routes = [{
    path: "/",
    component: () => import("layouts/LoginLayout.vue")
  },
  {
    path: "/home-students",
    component: () => import("layouts/Aluno/MainLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Index.vue")
    }]
  },
  {
    path: "/register",
    component: () => import("layouts/Cadastro/Index.vue")
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
