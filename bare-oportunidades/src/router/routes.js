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
    path: "/home-college",
    component: () => import("layouts/Faculdade/MainLayout.vue")
  },
    {
    path: "/home-company",
    component: () => import("layouts/Empresa/MainLayout.vue")
  },
  {
    path: "/register",
    component: () => import("layouts/Cadastro/Index.vue")
  },
  {
    path: "/details",
    component: () => import("layouts/Detalhes-Container/index.vue")
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
