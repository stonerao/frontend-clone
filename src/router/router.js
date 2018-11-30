export default [{
  path: '/',
  name: 'Index',
  component: () =>
    import ('@/views/Topo_1/index.vue')
}, {
  path: '/topo',
  name: 'topo',
  component: () =>
    import ('@/views/Topo/index.vue')
}, {
  path: '/map',
  name: 'Map',
  component: () =>
    import ('@/views/Map/index.vue')
}
, {
  path: '/drag',
  name: 'Drag',
  component: () =>
    import ('@/views/Drag/index.vue')
}
, {
  path: '/select',
  name: 'Select',
  component: () =>
    import ('@/views/Select/index.vue')
}
]
