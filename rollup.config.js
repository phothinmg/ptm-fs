import resolve from '@rollup/plugin-node-resolve';


export default{
    input: 'opt/index.js',
    output: {
		format: 'es',
		dir: 'src',
        sourcemap: true
	},
    plugins: [
        resolve()
    ]
}