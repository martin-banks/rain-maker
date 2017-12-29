// DOM ELEMENTS
// Storing DOM elements to use
const app = document.querySelector('#app')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const optionInput = document.querySelectorAll('.controls input')
const buttons = {
	run: document.querySelector('button.run'),
	clear: document.querySelector('button.clear')
}

// SETUP 
// Global values
let mouseDown = false
let active = false
let x = -50
let drops = []
let fillHeight = 0
let loop = null
const landscape = window.innerWidth >= window.innerHeight ? true : false
const sizeToUse = (landscape ? window.innerHeight : window.innerWidth) * 0.8

// Default options, these are updated on load
const options = {
	speed: 0.5,
	wind: 0,
	frequency: 0.1,
}

// Set up canvas
canvas.width = sizeToUse
canvas.height = sizeToUse
const { width: cWidth, height: cHeight } = canvas


// MAIN RAIN DROP FACTORY
// Returns an object for each drop with various methods for creating and updating
// Also removes drop and updates the puddle when drop hits the bottom
function rainDrop(id) {
	const radius = 2
	const getHeight = () => (4 * options.speed) + 1
	return {
		speed() { return [
			(options.wind * ((Math.random() * 3) + 5)), 
			(options.speed * ((Math.random() * 3) + 5))
		]},
		id,
		active: true,
		height: getHeight(),
		width: 2,
		coords: [Math.floor(Math.random() * cWidth), 0 - getHeight()],
		template() {
			const x = this.coords[0]
			const y = this.coords[1]
			ctx.beginPath()
			ctx.fillRect(x, y, this.width, this.height)
			ctx.fillStyle = 'dodgerblue'
			ctx.fill()
		},
		render() {
			ctx.beginPath()
			ctx.rect(0, cHeight - fillHeight, cWidth, fillHeight)
			ctx.fill()
			this.template()
		},
		update() {
			if (
				this.coords[0] + radius >= cWidth || 
				this.coords[1] + radius >= (cHeight - fillHeight)
			) {
				fillHeight += 0.01
				this.active = false
				return
			}
			this.coords = this.coords.map((c, i) => c + this.speed()[i])
			this.render()
		},
		remove() {},
	}
}

// MAKING RAIN DROPS
// Creates new rarry of random length based on the limit set by frequency option
// Each entry is an instance of the rainDrop factory
// This new array is spread into the main drops array fro updating later
function createRain() {
	const newDrops = [... new Array(Math.floor(Math.random() * 1.05 + (options.frequency * 10)))]
		.map(x => rainDrop())
	drops.push(...newDrops)
}

// UPDATE CANVAS FUNCTIONS
// Remove all elements from the canvas
function clearCanvas() {
	ctx.clearRect(0, 0, cWidth, cHeight)
	buttons.clear.setAttribute('data-show', false)
}

// Making it rain
function start() {
	const interval = 32
	const drop = rainDrop('test')
	createRain()
	buttons.clear.setAttribute('data-show', false)
	drops.forEach(d => d.render())
	loop = setInterval(() => {
		createRain()
		clearCanvas()
		drops = drops.filter(d => d.active)
		drops.forEach(d => d.update())
	}, interval)
}

// Stopping the rain
function stop() {
	clearInterval(loop)
	buttons.clear.setAttribute('data-show', true)
}


// FUNCTIONS FOR UI ENVENTS
// Start and stop (pause) the rain animation from the start/stop buttons
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

// Update the value of hte option changed from UI
function updateOptions(e) {
	let { name, value } = e.target ? e.target : e
	if (name === 'wind') value -= 50
	options[name] = value / 100
	console.log(options)
}


// STARTING THE APP
// Update the options from the UI elements and listen for future changes
optionInput.forEach(opt => {
	updateOptions(opt)
	opt.addEventListener('mousedown', () => {
		mouseDown = true
	})
	opt.addEventListener('mouseup', () => {
		mouseDown = false
	})
	opt.addEventListener('mousemove', e => {
		if (!mouseDown) return
		updateOptions(e)
	})
	opt.addEventListener('change', updateOptions)
})

// Listen for clicks on start/stop and clear buttons
buttons.run.addEventListener('click', toggleAnimation)
buttons.clear.addEventListener('click', clearCanvas)
