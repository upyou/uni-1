import { useCartStore } from "../store/cart";
import { createSSRApp, watch } from 'vue'
import App from '../App.vue'
import pinia from '../store/store'
const app = createSSRApp(App)
app.use(pinia)
const store = useCartStore()
export default {
	data(){
		return{
			store:store,
			total:store.setTotal
		}
	},
	onShow(){
		store.setBadge()
	}
}