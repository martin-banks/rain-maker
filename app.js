const app = document.querySelector('#app')
const canvas = document.querySelector('canvas')
const optionInput = document.querySelectorAll('.controls input')
const buttons = {
	run: document.querySelector('button.run'),
	clear: document.querySelector('button.clear')
}
const ctx = canvas.getContext('2d')
canvas.width = '300'
canvas.height = '300'
let active = false
let x = -50
let drops = []
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


let fillHeight = 0

function rainDrop(id) {
	const radius = 2
	const getHeight = () => (4 * options.speed) + 1
	return {
		speed: [
			(options.wind * ((Math.random() * 3) + 5)), 
			(options.speed * ((Math.random() * 3) + 5))
		], //(0.5 * (Math.random() * 5))
		id,
		active: true,
		height: getHeight(),
		width: 2,
		coords: [Math.floor(Math.random() * width), 0 - getHeight()],
		template() {
			const x = this.coords[0]
			const y = this.coords[1]
			ctx.beginPath()
			ctx.fillRect(x, y, this.width, this.height)
			ctx.fillStyle = 'lightblue'
			ctx.fill()
		},
		render() {
			ctx.beginPath()
			ctx.rect(0, height - fillHeight, width, fillHeight)
			ctx.fill()
			this.template()
		},
		update() {
			if (
				this.coords[0] + radius >= width || 
				this.coords[1] + radius >= (height - fillHeight)
			) {
				// console.log('stopping')
				// this.render()
				fillHeight += 0.01
				this.active = false
				return
			}
			this.coords = this.coords.map((c, i) => c + this.speed[i])
			this.render()
		},
		remove() {},
	}
}

function createRain() {
	const newDrops = [... new Array(Math.floor(Math.random() * 1.05 + (options.frequency * 10)))]
		.map(x => rainDrop())
	drops.push(...newDrops)
}

function clearCanvas() {
	ctx.clearRect(0,0,width,height)
	buttons.clear.setAttribute('data-show', false)
}

let loop = null

function start() {
	const interval = 32
	const drop = rainDrop('test')
	createRain()
	buttons.clear.setAttribute('data-show', false)
	drops.forEach(d => d.render())
	loop = setInterval(() => {
		createRain()
		clearCanvas()
		// const innactive = drops.reduce((output, drop, i) => {
		// 	let update = output
		// 	if (!drop.active) {
		// 		update[i] = drop
		// 	}
		// 	return update
		// }, {})
		drops = drops.filter(d => d.active)
		drops.forEach(d => d.update())

	}, interval)

}

function stop() {
	clearInterval(loop)
	buttons.clear.setAttribute('data-show', true)
}


function toggleAnimation() {
	if (active) {
		stop()
		active = false
		buttons.run.innerText = 'Start'
		return
	} else {
		start()
		buttons.clear.setAttribute('data-show', false)
		active = true
		buttons.run.innerText = 'Stop'
		return
	}
}


buttons.run.addEventListener('click', toggleAnimation)
buttons.clear.addEventListener('click', clearCanvas)