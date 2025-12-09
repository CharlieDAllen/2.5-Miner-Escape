import { defineConfig } from 'vite';

export default defineConfig({
    // Sets the root of your project to the 'code' subdirectory.
    root: './code',
    server: {
        watch: {
            usePolling: true
        }
    }
});