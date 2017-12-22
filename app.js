const app = document.querySelector('#app')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = '300'
canvas.height = '300'
console.log(ctx.__proto__)

let x = -50

const drops = []

const { width, height } = canvas
// function circle() {
// 	setInterval(function(){
// 		const radius = height / 4
// 		const y = height / 2
// 		ctx.clearRect(0, 0, width, height)
// 		ctx.beginPath()
// 		ctx.arc(x, y, radius, 0, 2*Math.PI)
// 		ctx.stroke()
// 		x++
// 		if (x > canvas.width + 50) x = -50
// 	}, 16)
// }

// function getInputValue(name) {
// 	return [...optionInput]
// 		.find(opt => opt.getAttribute('name') === name)
// 		.value
// }
const optionInput = document.querySelectorAll('.options input')
const options = {
	speed: 0.5,
	wind: 0,
	frequency: 0.1,
}

function updateOptions(e) {
	const { name, value } = e.target
	options[name] = value / 100
	console.log(options)
}

console.log(options)

optionInput.forEach(opt => {
	opt.addEventListener('change', updateOptions)
})

// const baseSpeed = 3 * 1

function rainDrop(id) {
	return {
		template() {
			const radius = 2
			const x = this.coords[0]
			const y = this.coords[1]

			ctx.beginPath()
			ctx.arc(x, y, radius, 0, (2 * Math.PI))
			ctx.stroke()
			// console.log('template')
		},
		render() {
			this.template()
			// console.log('rendering')
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
	// drop.render()
	// setInterval(() => {
	// 	if (drop.active) {
	// 		drop.update()
	// 	}
	// 	// console.log(drop.coords)
	// }, 32)
}

start()