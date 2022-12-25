import { createRouter, createWebHashHistory } from 'vue-router'
import isAuthenticatedGuard from './auth-guard';


const routes = [
    {
        path: '/', 
        redirect: '/pokemon'
    },
    { 
        path: '/pokemon',
        name: 'pokemon', 
        component: () => import(/* webpackChunkName: "PokemonLayout" */'../modules/pokemon/layouts/PokemonLayout'),
        children: [
            { 
                path: '', 
                name: 'pokemon-home',
                component: () => import(/* webpackChunkName: "ListPage" */'../modules/pokemon/pages/ListPage')
            },
            { 
                path: 'about', 
                name: 'pokemon-about',
                component: () => import(/* webpackChunkName: "AboutPage" */'../modules/pokemon/pages/AboutPage')
            },
            { 
                path: 'pokemonid/:id', 
                name: 'pokemon-id',
                component: () => import(/* webpackChunkName: "PokemonPage" */'@/modules/pokemon/pages/PokemonPage'),
                props: (route) => {
                    const id  = Number(route.params.id);
                    return isNaN(id)? {id:1}: {id}
                }
            },
            {
                path: '', 
                redirect: {name: "pokemon-about"}
            },
        ]
    },
    {
        path: '/', 
        redirect: '/pokemon'
    },
    { 
        path: '/dbz',
        name: 'dbz', 
        beforeEnter: [isAuthenticatedGuard],
        component: () => import(/* webpackChunkName: "DBZLayout" */'../modules/dbz/layouts/DragonBallLayout'),
        children: [
            { 
                path: 'about', 
                name: 'dbz-about',
                component: () => import(/* webpackChunkName: "DBZAboutPage" */'../modules/dbz/pages/AboutPage')
            },
            { 
                path: 'characters', 
                name: 'dbz-characters',
                component: () => import(/* webpackChunkName: "DBZCharacterPage" */'../modules/dbz/pages/CharactersPage')
            },
            {
                path: '', 
                redirect: {name: "dbz-characters"}
            },
        ]
    },

    
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/* webpackChunkName: "NoPageFound" */'@/modules/shared/pages/NoPageFound')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
// ----------------------------------------------------- //
// ------------ Guard Global -sincrono ----------------- //
// ----------------------------------------------------- //
// router.beforeEach((to, from, next) => {
//     console.log({to, from, next});

//     const random = Math.random() * 100
    // if(random > 50 ){
    //     console.log('autenticado')
    //     next()
    // } else {
    //     console.log(random, "bloqueado por el beforeEach Guard")
    //     next({name: 'pokemon-home'})
    // }
// })


// ----------------------------------------------------- //
// ------------ Guard Global -Asincrono ----------------- //
// ----------------------------------------------------- //
// const canAccess = () => {
//     return new Promise(resolve => {
//         const random = Math.random() * 100
//         if(random > 50 ){
//             console.log('autenticado - canAccess')
//             resolve(true)
//         } else {
//             console.log(random, "bloqueado por el beforeEach Guard")
//             resolve(false)
//         }

//     })
// }

// router.beforeEach( async (to, from, next) => {

//     const authorized = await canAccess()

//     authorized 
//         ? next()
//         : next({name: 'pokemon-home'})
// })

export default router;