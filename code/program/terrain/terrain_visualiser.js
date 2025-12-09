import * as THREE from 'three';
import CONFIG from '../../config.js';

export default class Terrain_Mesh {

    // Mesh data contains the position //
    constructor(mesh_data, scene) {
        this.mesh_data = mesh_data;

        // Construct the mesh
        this.mesh = this._construct_mesh(mesh_data);
        this.scene = scene
        this.in_scene = false;
    }

    add_to_scene() {
        if (this.in_scene == false) {
            this.scene.add(this.mesh);
            this.mesh.position.x = this.mesh_data.chunk_x * CONFIG.CHUNK_SIZE;
            this.mesh.position.y = this.mesh_data.chunk_y * CONFIG.CHUNK_SIZE;
            this.in_scene = true;
            return 0;
        }

        return 1;
    }

    _construct_mesh(mesh_data) {
        const data = mesh_data.terrain_data

        // -- Loop through and construct 3D Geomtry in TEMP arrays -- //
        let vertex_count = 0;         // 1 Vertex = 3 floats

        let vertices = [];
        let triangles = [];
        let uvs = [];

        for (let x = 0; x < CONFIG.CHUNK_SIZE; x++) {
            for (let y = 0; y < CONFIG.CHUNK_SIZE; y++) {
                let cell = data[x][y]

                if (cell === 1) {

                    // -- Compute Vertices -- //
                    let v00 = [x, y, 0];
                    let v10 = [x + 1, y, 0];
                    let v01 = [x, y + 1, 0];
                    let v11 = [x + 1, y + 1, 0];

                    // Push vertices //
                    vertices.push(...v00);
                    vertices.push(...v01);
                    vertices.push(...v10);
                    vertices.push(...v11);

                    // -- Compute Triangles -- //
                    let v00_i = vertex_count + 0;
                    let v01_i = vertex_count + 1;
                    let v10_i = vertex_count + 2;
                    let v11_i = vertex_count + 3;

                    // 0 0
                    // 0 0
                    let t0 = [v00_i, v01_i, v10_i];
                    let t1 = [v01_i, v11_i, v10_i];

                    triangles.push(...t0);
                    triangles.push(...t1);

                    // -- Compute UVs -- //
                    let uv00 = [0.0, 0.0];
                    let uv10 = [1.0, 0.0];
                    let uv01 = [0.0, 1.0];
                    let uv11 = [1.0, 1.0];

                    uvs.push(...uv00);
                    uvs.push(...uv01);
                    uvs.push(...uv10);
                    uvs.push(...uv11);

                    // -- Incriment vertex counts and whatnot -- //
                    vertex_count += 4
                }
            }
        }

        // -- Convert temp arrays to Buffers -- //
        const vertices_buffer = new Float32Array(vertices);
        const triangles_buffer = new THREE.Uint32BufferAttribute(new Uint32Array(triangles), 1);
        const uvs_buffer = new Float32Array(uvs);

        // -- Actually make the 3D geometry now -- //
        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute('position', new THREE.BufferAttribute(vertices_buffer, 3));
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs_buffer, 2))
        geometry.setIndex(triangles_buffer);
        geometry.computeVertexNormals();

        const material = new THREE.MeshStandardMaterial({
            color: 0x808000,
            side: THREE.DoubleSide
        })

        const mesh = new THREE.Mesh(geometry, material);
        return mesh;
    }


}