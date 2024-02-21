import Home from "./Components/home.js";
// import Profile from "./Components/profile.js";
import Registration from "./Components/registration.js";
import Login from "./Components/login.js";

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home"
    },
    {
        path: "/register",
        component: Registration,
        name: "Registration"
    },
    {
        path: "/login",
        component: Login,
        name: "Login"
    
    }
];


const router = new VueRouter({
    routes
});

export default router;