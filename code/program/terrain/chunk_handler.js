import Chunk from "./chunk.js";
import CONFIG from "../../config.js";

export default class Chunk_Handler {
    constructor(camera, scene, render_distance, data_distance) {
        this.camera = camera,
            this.scene = scene,
            this.render_distance = render_distance,
            this.data_distance = data_distance,
            this.chunks = {}
    }

    // Returns true if the chunk_data for all chunks surrounding on x, y = -1, +1 exists
    // Even if the chunk itself does not exist or has no data //
    chunk_surrounded(chunk) {
        let chunks = this.chunks
        let x = chunk.chunk_x;
        let y = chunk.chunk_y;

        return (
            chunks[this._chunk_hash(x - 1, y)] != null &&
            chunks[this._chunk_hash(x + 1, y)] != null &&
            chunks[this._chunk_hash(x, y - 1)] != null &&
            chunks[this._chunk_hash(x, y + 1)] != null
        )
    }

    // This function returns the cell at the absolute input positions, if it hasn't been generated null is returned //
    get_cell(abs_x, abs_y) {
        const chunk_x = Math.floor(abs_x / CONFIG.CHUNK_SIZE);
        const chunk_y = Math.floor(abs_y / CONFIG.CHUNK_SIZE);

        const rel_x = abs_x % CONFIG.CHUNK_SIZE;
        const rel_y = abs_y % CONFIG.CHUNK_SIZE;

        const chunk = this.chunks[this._chunk_hash(chunk_x, chunk_y)];

        if (chunk) {
            return chunk.get_voxel(rel_x, rel_y);
        }
    }

    _chunk_hash(x, y) {
        return `${x},${y}`;
    }

    // ** // ** //
    // -- -- -- // CHUNK LOADING STUFF //
    // ** // ** //
    _get_camera_chunk_pos() {
        let chunk_size = CONFIG.CHUNK_SIZE

        let pos_x = this.camera.position.x;
        let pos_y = this.camera.position.y;
        let chunk_x = Math.floor(pos_x / chunk_size);
        let chunk_y = Math.floor(pos_y / chunk_size);

        return { x: chunk_x, y: chunk_y };
    }

    // Returns the position of the next chunk which should be data loaded //
    _get_next_chunk_data_load(chunk_pos) {
        let current_x = chunk_pos.x;
        let current_y = chunk_pos.y;

        let min_x = current_x - CONFIG.DATA_DISTANCE;
        let min_y = current_y - CONFIG.DATA_DISTANCE;
        let max_x = current_x + CONFIG.DATA_DISTANCE;
        let max_y = current_y + CONFIG.DATA_DISTANCE;

        let chunks = this.chunks;

        for (let x = min_x; x <= max_x; x++) {
            for (let y = min_y; y <= max_y; y++) {
                if (chunks[this._chunk_hash(x, y)] == null) {
                    console.log(`CHUNK AT POS: ${x}, ${y}`);
                    console.log(`EXISTS: ${chunks[this._chunk_hash(x, y)] != null}`)
                    return { x: x, y: y };
                }
            }
        }
    }

    // Returns the chunk pos of the next chunk to render //
    _get_next_chunk_render(chunk_pos) {
        let current_x = chunk_pos.x;
        let current_y = chunk_pos.y;

        let min_x = current_x - CONFIG.RENDER_DISTANCE;
        let min_y = current_y - CONFIG.RENDER_DISTANCE;
        let max_x = current_x + CONFIG.RENDER_DISTANCE;
        let max_y = current_y + CONFIG.RENDER_DISTANCE;

        let chunks = this.chunks;

        for (let x = min_x; x <= max_x; x++) {
            for (let y = min_y; y <= max_y; y++) {

                // For a chunk to be rendered it must exist and it must be surrounded //
                //  by chunks which exist on a data level //
                let chunk = chunks[this._chunk_hash(x, y)]

                if (chunk != null && chunk.chunk_mesh == null && this.chunk_surrounded(chunk) == true) {
                    return { x: x, y: y };
                }
            }
        }
    }

    // Creates the chunk, computes its terrain data and loads its //
    _generate_chunk(chunk_pos) {
        let key = this._chunk_hash(chunk_pos.x, chunk_pos.y);
        console.log(chunk_pos);
        console.log(key);

        if (this.chunks[key] != null) {
            console.warn(`Trying to make a chunk at ${chunk_pos} when a chunk already exists at that position`);
            return 1;
        } else {

            let chunk = new Chunk(this, this.scene, chunk_pos.x, chunk_pos.y);
            chunk.generate_data();

            this.chunks[this._chunk_hash(chunk_pos.x, chunk_pos.y)] = chunk;
            return 1;
        }
    }

    _render_chunk(chunk) {
        console.log(chunk);
        let code = chunk.generate_mesh();

        if (code == 0) {
            let code_add = chunk.add_to_scene();
            console.log(code_add);
            console.log("LONG");
        }
    }

    // Runs each frame and should determine what chunks should be loaded and unloaded //
    update(tick) {

        // First see what chunks are out of range and unload them //

        // Then determine what chunks need to be loaded and load them //
        const chunk_pos = this._get_camera_chunk_pos();

        let data_load_pos = this._get_next_chunk_data_load(chunk_pos);
        let render_pos = this._get_next_chunk_render(chunk_pos);

        if (data_load_pos != null) {
            this._generate_chunk(data_load_pos);
        }

        if (render_pos != null) {
            this._render_chunk(this.chunks[this._chunk_hash(render_pos.x, render_pos.y)]);
        }
    }
}