const CONFIG = {
    MIN_ZOOM_DIST: 5,
    DEFAULT_ZOOM_DIST: 20,
    MAX_ZOOM_DIST: 500,
    MOVE_SPEED: 0.5,
    ZOOM_SPEED: 0.1,

    CHUNK_SIZE: 16,        // Smaller chunks because cells are destroyed and the mesh re-rendered //
    MINE_EXTRUSION: 1,       // Z direction extrusion of the 2.5D effect //

    DATA_DISTANCE: 10,  // How far out the chunk DATA is computed (lower priority than render dist)
    RENDER_DISTANCE: 8,
}

export default CONFIG