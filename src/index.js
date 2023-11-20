import { mkdir, readFile, writeFile, cp, rm, unlink } from 'node:fs/promises';
import { readdirSync, lstatSync, mkdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rmdirSync, cpSync, rmSync, statSync, watch } from 'node:fs';
import { join } from 'node:path';

class nodefs{
   
    static async getFile(opts = {}) {
        const x = opts.path;
        const y = opts.ext;
        let z = [];
        x.forEach( (aa) => {
            const b = readdirSync(aa,{recursive: true});
            let bbb = [];
            b.forEach((bb) =>{
                const ba = `/${aa}/${bb}`;
                bbb.push(ba);
            });
            z.push(bbb);
        });
        const c = z.flatMap(item => item);
        let ee = [];
        c.forEach((cc) =>{
            const d = cc.split('/').slice(-1)[0].split('.');
            const s = cc.split('/').slice(0,-1).join('/');
            const p = d.join('.');
            let e;
            if(d.length > 1 && y.includes(d[1])){
                e = `${s}/${p}`;
            }else {
                e = '';
            }
        ee.push(e);
        });
        const cee = ee.filter(item => item !== '');
        return cee;
    }
    /**
     * Returns the parent directory of the given path if it's a directory, 
     * otherwise returns the file name.
     *
     * @param {string} path - The path to a file.
     * @return {string} The parent directory or file name.
     */
    static getParent(path) {
    const stats = lstatSync(path);
    return stats.isDirectory() ? path : path.split('/').slice(0,-1).join('/');
    }
    /**
     * Creates a new directory at the specified path.
     *
     * @param {string} path - The path where the directory should be created.
     * @return {Promise<void>} A Promise that resolves when the directory is successfully created.
     */
    static async mkdir(path) {
        const projectFolder = join(process.cwd(), path) ;
        
        try {
            await mkdir(projectFolder, { recursive: true });
            console.log(`created ${projectFolder}`);
        } catch (err) {
            console.error(err.message);
        }
    }
    /**
     * Creates a directory synchronously at the specified path.
     *
     * @param {string} path - The path where the directory should be created.
     * @return {void} This function does not return anything.
     */
    static mkdirSync(path){
        try {
            const projectFolder = join(process.cwd(), path) ;
            mkdirSync(projectFolder, { recursive: true });
            console.log(`created ${projectFolder}`);
        } catch (err) {
            console.error(err.message);
        }
    }
    /**
     * Reads a file from the specified path.
     *
     * @param {string} path - The path of the file to read.
     * @return {Promise<string|null>} The contents of the file as a string, or null if an error occurred.
     */
    static async readFile(path) {
        try {
            const filePath = join(process.cwd(), path) ;
            const contents = await readFile(filePath, { encoding: 'utf8' });
            return contents;
        } catch (err) {
            console.error(err.message);
            return null;
        }
    }
    /**
     * Reads the contents of a file synchronously.
     *
     * @param {string} path - The path of the file to be read.
     * @return {string} The contents of the file.
     */
    static readFileSync(path) {
    const filePath = join(process.cwd(), path) ;
    const contents = readFileSync(filePath, { encoding: 'utf8' });
    
    return contents;
    }
    /**
     * Writes data to a file at the specified file path. If the directory does not exist, it creates the directory first.
     *
     * @param {string} filePath - The path to the file.
     * @param {string} data - The data to write to the file.
     * @return {Promise<void>} - A promise that resolves when the file has been successfully written.
     */
    static async writeFile(filePath, data) {
        const a = filePath.split('/').slice(0,-1).join('/');
        if(a){await this.mkdir(a);}
        setTimeout(async()=>{
            await writeFile(filePath, data);
        },1000);
        
    }
    /**
     * Writes data to a file synchronously.
     *
     * @param {string} filePath - The path to the file.
     * @param {any} data - The data to write to the file.
     * @return {void} 
     */
    static writeFileSync(filePath, data) {
        const a = filePath.split('/').slice(0,-1).join('/');
        if(a){this.mkdirSync(a);}
        setTimeout(()=>{
            writeFileSync(filePath, data);
        },1000);
    }
    /**
     * Recursively deletes all files and subdirectories in the specified directory.
     *
     * @param {string} directoryPath - The path of the directory to be cleared.
     * @param {boolean} notFirstCall - Optional. Indicates whether this is the first call to the function. Default is false.
     */
    static clearDirectory(directoryPath, notFirstCall = false){
        if (existsSync(directoryPath)) {
        readdirSync(directoryPath).forEach((file) => {
            const curPath = path.join(directoryPath, file);
            if (lstatSync(curPath).isDirectory()) {
            clearDirectory(curPath, true);
            } else {
            unlinkSync(curPath);
            }
        });
        if (notFirstCall) {
            try {
            rmdirSync(directoryPath);
            } catch (error) {
            console.error(error);
            }
        }
        }
    }
    /**
     * Copies a directory from the source to the destination.
     *
     * @param {string} src - The path of the source directory.
     * @param {string} dest - The path of the destination directory.
     * @return {Promise} A Promise that resolves when the directory is successfully copied, or rejects with an error if the copy operation fails.
     */
    static async copy(src, dest) {
        try {
            await cp(src, dest, {recursive: true});
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Copies a directory from source to destination synchronously.
     *
     * @param {string} src - The path of the source directory or file.
     * @param {string} dest - The path of the destination directory or file.
     * @return {undefined} - This function does not return a value.
     */
    static copySync(src, dest) {
        try {
            cpSync(src, dest, {recursive: true});
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Removes a file or directory at the specified path.
     *
     * @param {string} path - The path to the file or directory to be removed.
     * @return {Promise<void>} A Promise that resolves when the removal is complete.
     */
    static async remove(path) {
       await rm(path, { recursive: true });
    }
    /**
     * Removes a file or directory synchronously.
     *
     * @param {string} path - The path to the file or directory to be removed.
     * @return {void} This function does not return a value.
     */
    static removeSync(path) {
        rmSync(path, { recursive: true });
    }
    /**
     * Delete a file at the given path.
     *
     * @param {string} path - The path to the file to be deleted.
     * @return {Promise<void>} - A promise that resolves when the file is deleted.
     */
    static async unlink(path) {
        try {
            await unlink(path);
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Retrieves the last modified time of a file.
     *
     * @param {string} path - The path of the file.
     * @return {string} The last modified time of the file in ISO format.
     */
    static lastUpdate(path){
        const stats = statSync(path);
        const lastModifiedTime = stats.mtime.toISOString();
        return lastModifiedTime;
    }
    /**
     * Checks if the given path is a directory.
     *
     * @param {string} path - The path to check.
     * @return {boolean} Returns true if the path is a directory, false otherwise.
     */
    static isDir(path){
        try {
            return fs.statSync(path).isDirectory();
        } catch {
            return false;
        }
    }
    /**
     * Checks if the given path is a file.
     *
     * @param {string} path - The path to check.
     * @return {boolean} Returns true if the path is a directory, false otherwise.
     */
    static isFile (path){
        try {
        const stat = fs.lstatSync(path);
        return stat.isFile();
        } catch {
        return false;
        }
    }
    /**
     * Watches the specified directories for changes.
     *
     * @param {Array} opts.dir - An array of directories to watch.
     */
    static watch(opts={}) {
        const dir = opts.dir;
        dir.forEach((di) => {
            const watcher = watch(di, {recursive: true});
        
            watcher.on('change',(event,filePath)=> {
                console.log(`${filePath} has been changed`);
            });
              
            watcher.on('error',(err)=>{
                console.log(err);
            });
        });
    }
}

export { nodefs as default };
//# sourceMappingURL=index.js.map
