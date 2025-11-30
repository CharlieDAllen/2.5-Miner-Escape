# 2.5-Miner-Escape
(ill come up with a better name)
2.5D miner escape is a browser game where you must make it as far down as possible by digging through the earth and increasingly difficult enviroments while being chased. As you get further down the enviroment becomes harder to navigate. The game will be made using three.js, and will have a side view perspective view.

# Technical Design:
### Collision Detection:
- Due to the simplistic nature of the game collision detection will be done using axis-aligned-bounding-boxes using the world-data as reference. This is relatively simple to implement along with the bonus of easily being able to determine your inside an object.
- The entities will use this to react to upcoming collisions but the idea is you detect the overlap before it happens so they never has to be collision resolution.
If the discrepency between the visual terrain (angled using marching squares), and the colliders (squares), becomes noticable I will look into using a SAT based collision detector.

### Terrain Generation:
Base generation will use SimpleX noise to get the foundation terrain structure. 
- **Density map** - controls solid vs empty space.
- **Hardness Map** - determines material strength and digtime. (preset materials rather than varying durabilities).
- **Moisture Map** - Influences biome and material type distribution (and fluid distribution)
- **Temperature Map** - Works with moisture to define enviromental zones

### Chunk Based Generation:
Terrain generates in chunks allowing for efficient loading / unloading and infinite downward progression. Chunks will exist in 3 states.
- **Rendered** - Has 3D mesh, actively drawn on screen.
- **Loaded** - Exists in memory, no mesh (for chunks just side view).
- **Unloaded** - Removed from memory.

### Mesh Visualisation:
When chunks of terrain are fed into the visualiser a marching squares algorithm is run on the edges, and a 2d visualisation is created with depth offset by a set amount on the 'z' axis. (could randomise the vertex positions on the edge for a bit more ruggid appearance + same with vertices of solid objects to give it a bit more shape). 
- I'll use a parent chunk handler which allows for world space quieries on existing data (as if chunk borders don't exist).
- Marching squares requires neighbour cells, therefore for each cell they must be chunks completely surrounding it in memory to be visualised.

# Milestones:
## Milestone 1 Core Technologies:
This milestone is just for creating the core technologies that the game builds on.
- Working terrain generation system (doesn't change with depth).
- Terrain visualisation and load manager. (load manager decides when to load, unload, keep a chunk in memory, remove from memory. . . etc.)
- Terrain Destruction.
- Collision System.
- (movement but the player is a disembodied camera with no gravity at this point (for testing))

## Milestone 2 MVP (Alpha Build):
This milestone is the prototype where they is a game to play but its largely unpolished and could use some work but has the core game loop.
- No main menu yet.
- Point tracking system.
- Improved terrain generation, changes as you increase in depth but still basic.
- Basic mole / human entity and worm entity to chase the player. (2 core varients, basic behavior)
- Basic enemy spawning mechanics which increase in difficulty with depth.
- Terrain generation changes with depth. (no fluids yet)
- Simple audio.
- More fleshed out player input controller.

## Milestone 3 Beta Build:
This is the milestone where all the content is in the game but before the final polish of the game.
- Main menu with difficulty selection and settings.
- High score tracker.
- Refined entity AI and spawning behavior.
- Terrain generation refined and terrain generation transition as depth increases improved.
- Enviromental hazards
- Fluid support (water and lava + what happens if they collide - prob just evaporate water cuz simplicity)
- Custom 3d models made for entities.
- If sounds bad find better ones ? (maybe some simple directional audio too)
- Support for mobile.
By this point i'll probably release it somewhere for people to play (though purpose isn't making money it could give me useful feedback)

## Milestone 4 Release:
- Testing.
- Bug fixes.
- Balancing.
- Global leaderboard maybe ?

## Setup:
Run NPM install in root directory to pull all dependencies.