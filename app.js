const app = document.querySelector('#app')
const canvas = document.querySelector('canvas')
const optionInput = document.querySelectorAll('.options input')

const ctx = canvas.getContext('2d')
canvas.width = '300'
canvas.height = '300'

let x = -50
const drops = []
const { width, height } = canvas
const options = {
	speed: 0.5,
	wind: 0,
	frequency: 0.1,
}

function updateOptions(e) {
	let { name, value } = e.target ? e.target : e
	if (name === 'wind') value -= 50
	options[name] = value / 100
	console.log(options)
}

optionInput.forEach(opt => {
	updateOptions(opt)
	opt.addEventListener('change', updateOptions)
})

function rainDrop(id) {
	return {
		template() {
			const radius = 2
			const x = this.coords[0]
			const y = this.coords[1]

			ctx.beginPath()
			ctx.arc(x, y, radius, 0, (2 * Math.PI))
			ctx.stroke()
		},
		render() {
			this.template()
		},
		update() {
			if (this.coords[0] > width || this.coords[1] > height) {
				this.active = false
			}
			this.coords = this.coords.map((c, i) => c + this.speed[i])
			this.render()
		},
		remove() {},
		coords: [Math.floor(Math.random() * width), 0],
		speed: [(options.wind * ((Math.random() * 3) + 5)), (options.speed * ((Math.random() * 3) + 5))], //(0.5 * (Math.random() * 5))
		id,
		active: true
	}
}

function createRain() {
	const newDrops = [... new Array(Math.floor(Math.random() * 1.05 + (options.frequency * 10)))]
		.map(x => rainDrop())
	drops.push(...newDrops)
}

function start() {
	const interval = 16
	const drop = rainDrop('test')
	createRain()
	drops.forEach(d => d.render())
	setInterval(() => {
		createRain()
		ctx.clearRect(0,0,width,height)
		drops.filter(d => d.active)
		drops.forEach(d => d.update())
	}, interval)

}

// start()