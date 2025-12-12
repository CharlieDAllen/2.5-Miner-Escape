import Terrain_Data from "./terrain_generator";
import Terrain_Mesh from "./terrain_visualiser";

export default class Chunk {
    constructor(chunk_handler, scene, chunk_x, chunk_y) {
        this.chunk_handler = chunk_handler;
        this.scene = scene;
        this.chunk_x = chunk_x;
        this.chunk_y = chunk_y;
        this.absolute_x = chunk_x * CONFIG.CHUNK_SIZE;
        this.absolute_y = chunk_y * CONFIG.CHUNK_SIZE;
        this.chunk_data = null;
        this.chunk_mesh = null;
    }

    generate_data() {
        if (this.chunk_data != null) {
            warn("Attempted to generate data for chunk which data has been generated for!");
            return 1;
        } else {
            this.chunk_data = new Terrain_Data(this.chunk_x, this.chunk_y)
            return 0;
        }
    }

    // To generate the mesh, the data of the chunks surrounding the current chunk must 
    //  be known so the marching squares algorithm works // 
    generate_mesh() {
        // If the chunk data exists for itself and all surrounding chunks //
        if (this.chunk_data) {
            this.chunk_mesh = new Terrain_Mesh(this.chunk_data, this.chunk_handler, this.scene);
            return 0;
        } else {
            return 1;
        }
    }

    add_to_scene() {
        if (this.chunk_mesh != null) {
            return this.chunk_mesh.add_to_scene();
        } else {
            return 1;
        }
    }
}