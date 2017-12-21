const app = document.querySelector('#app')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = '300'
canvas.height = '300'
console.log(ctx.__proto__)

let x = -50

function start() {
	setInterval(function(){
		const { width, height } = canvas
		const radius = height / 4
		const y = height / 2
		ctx.clearRect(0, 0, width, height)
		ctx.beginPath()
		ctx.arc(x, y, radius, 0, 2*Math.PI)
		ctx.stroke()
		x++
		if (x > canvas.width + 50) x = -50
	}, 16)
}

