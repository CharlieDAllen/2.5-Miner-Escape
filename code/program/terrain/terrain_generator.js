import CONFIG from "../../config.js"

import { createNoise2D } from 'simplex-noise'

const noise_2d = createNoise2D()

let noisescale = 40;
let seed = 10;

export default class Terrain_Data {
    constructor(chunk_x, chunk_y, chunk_handler) {
        this.terrain_generated = false;
        this.chunk_handler = chunk_handler;

        this.terrain_data = this._generate_terrain(chunk_x, chunk_y);
        this.chunk_x = chunk_x
        this.chunk_y = chunk_y
    }

    _generate_terrain(chunk_x, chunk_y) {
        if (this.terrain_generated == false) {
            const data = []

            for (let x = 0; x < CONFIG.CHUNK_SIZE; x++) {
                data[x] = []

                for (let y = 0; y < CONFIG.CHUNK_SIZE; y++) {
                    let absolute_x = chunk_x * CONFIG.CHUNK_SIZE + x
                    let absolute_y = chunk_y * CONFIG.CHUNK_SIZE + y

                    let height = noise_2d(absolute_x / noisescale, absolute_y / noisescale + seed);
                    height += noise_2d(absolute_x / noisescale, absolute_y / noisescale + seed * seed) * 0.2;


                    if (Math.abs(height) > 0.3) {
                        data[x][y] = 1
                    } else {
                        data[x][y] = 0
                    }
                }
            }

            this.terrain_generated = true;

            return data
        }
    }

    get_voxel(x, y) {
        if (x < 0 || x > CONFIG.CHUNK_SIZE - 1 || y < 0 || y > CONFIG.CHUNK_SIZE - 1) {
            return this.terrain_data[x][y];
        }

        // If not within current chunk use method in chunk_handler //
        else {
            return this.chunk_handler.get_cell(this.absolute_x + x, this.absolute_y + y);
        }
    }
}