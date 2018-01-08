#### CODING CHALLENGE
# rain-maker
Create a canvas based particle system to simulate rainfall.

### Targets
	[x] Create a canvas with random number of particles spaced at random intervals that animate down through the height of the canvas
	[x] For every fame of the animation, update the number of rain drops to create a continuous, infinite rainfall
	[x] As the rain reaches the bottom of hte canvas, have them form a puddle which fills the screen evenly

### Bonus
	[x] Add some wind to blow the rain diaginally
	[x] Add a UI to allow users to control the 
		[x] start
		[x] stop
		[x] reset
		[x] speed
		[x] density
		[x] wind

_tip_
Manage those rain drops, make sure the drops you create are destroyed once they have finished animating!

---

# Learnings

### Canvas
I've never worked with canvas before, this was a great way to understand the basics of drawing and animating with it. 

### Managing updates
My first attempt came across massive performance issues where the animation would become very janky. This was down to handling too many updates at any given time. Drops that had completed their animation were not deleted. The 'puddle' was updating with every update of every drop(!). 

Re-Thinking about and planning the lifecycles improved the performance massively, where it was previously lagging with hundred of drops, it is now smooth with thousands


