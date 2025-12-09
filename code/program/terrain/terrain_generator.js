import CONFIG from "../../config.js"
import { createNoise2D } from 'simplex-noise'

const noise_2d = createNoise2D()

let noisescale = 20;
let seed = 10;

export default class Terrain_Data {
    constructor(chunk_x, chunk_y) {
        this.terrain_data = this._generate_terrain(chunk_x, chunk_y)
        this.chunk_x = chunk_x
        this.chunk_y = chunk_y
    }

    _generate_terrain(chunk_x, chunk_y) {
        const data = []

        for (let x = 0; x < CONFIG.CHUNK_SIZE; x++) {
            data[x] = []

            for (let y = 0; y < CONFIG.CHUNK_SIZE; y++) {
                let absolute_x = chunk_x * CONFIG.CHUNK_SIZE + x
                let absolute_y = chunk_y * CONFIG.CHUNK_SIZE + y

                let height = (noise_2d(absolute_x / noisescale, absolute_y / noisescale, seed) + 1)

                if (height > 0.8) {
                    data[x][y] = 1
                } else {
                    data[x][y] = 0
                }
            }
        }

        return data
    }
}