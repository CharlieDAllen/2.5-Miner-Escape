export default class Controller {

    movement = {
        up: false,
        down: false,
        left: false,
        right: false,
        zoom_in: false,
        zoom_out: false,
    }

    constructor(min_zoom_dist, max_zoom_dist, zoom_speed, move_speed, default_zoom, camera) {
        this.min_zoom_dist = min_zoom_dist
        this.max_zoom_dist = max_zoom_dist
        this.zoom_speed = zoom_speed
        this.move_speed = move_speed
        this.camera = camera
        this.camera.position.z = default_zoom;

        this.setup_input_listeners();
    }

    setup_input_listeners() {
        document.addEventListener('keydown', this._on_key_down.bind(this));
        document.addEventListener('keyup', this._on_key_up.bind(this));
    }

    _on_key_down(event) {
        switch (event.code) {
            case 'KeyW':
                this.movement.up = true;
                break;
            case 'KeyS':
                this.movement.down = true;
                break;
            case 'KeyA':
                this.movement.left = true;
                break;
            case 'KeyD':
                this.movement.right = true;
                break;
            case 'KeyQ':
                this.movement.zoom_in = true;
                break;
            case 'KeyE':
                this.movement.zoom_out = true;
                break;
        }
    }

    _on_key_up(event) {
        switch (event.code) {
            case 'KeyW':
                this.movement.up = false;
                break;
            case 'KeyS':
                this.movement.down = false;
                break;
            case 'KeyA':
                this.movement.left = false;
                break;
            case 'KeyD':
                this.movement.right = false;
                break;
            case 'KeyQ':
                this.movement.zoom_in = false;
                break;
            case 'KeyE':
                this.movement.zoom_out = false;
                break;
        }
    }

    update(delta_time) {
        const move_distance = this.move_speed * delta_time;
        const zoom_distance = this.zoom_speed * delta_time;

        this.camera.position.x += (this.movement.right - this.movement.left) * move_distance;
        this.camera.position.y += (this.movement.up - this.movement.down) * move_distance;
        this.camera.position.z = Math.min(this.max_zoom_dist, Math.max(this.min_zoom_dist, this.camera.position.z + (this.movement.zoom_out - this.movement.zoom_in) * zoom_distance));
    }
}