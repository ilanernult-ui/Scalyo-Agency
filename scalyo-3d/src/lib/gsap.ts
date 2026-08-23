import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistré une seule fois pour toute l'app.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
