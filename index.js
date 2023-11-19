import { 
    readdir, 
    readFile,
    mkdir,
    writeFile,
    copyFile, 
    cp,
    rm,
    unlink
} from 'node:fs/promises';
import { 
    readdirSync, 
    readFileSync, 
    existsSync, 
    lstatSync, 
    unlinkSync,
    rmdirSync,
    mkdirSync,
    writeFileSync,
    copyFileSync,
    cpSync,
    rmSync,
    statSync
} from 'node:fs';
import { join } from 'node:path';
import { watch } from 'node:fs';

class NodeFs{
    /**
     * Retrieves a list of file paths that match the specified options.
     *
     * @param {Object} opts - The options for retrieving the file paths.
     * @param {string} opts.path - The path to the directory to search for files.
     * @param {Array<string>} opts.ext - The file extensions to include in the search.
     * @return {Promise<Array<string>>} A promise that resolves with an array of filtered file paths.
     */
    static async getFile(opts = {}) {
    const path = opts.path;
    const ext = opts.ext;
    try {
        const files = await readdir(path, {
        recursive: true
        });
        const filePaths = files.map((f) => {
        const a = join(path, f);
        const b = a.split('/').slice(-1)[0].split('.');
        const e = b[1];
        if (b.length === 2 && ext.includes(e)) {
            return a;
        }
        return '';
        });
        const filteredFilePaths = filePaths.filter((item) => item !== '');
        return filteredFilePaths;
    } catch (err) {
        console.error(err);
    }
    }
    /**
     * Retrieves a list of files from the specified path with the given extension.
     *
     * @param {Object} opts - The options for retrieving the files.
     * @param {string} opts.path - The path to the directory.
     * @param {Array<string>} opts.ext - The list of file extensions to filter.
     * @return {Array<string>} - The list of file paths.
     */
    static getFileSync(opts = {}) {
    const { path, ext } = opts;
    const files = [];

    try {
        readdirSync(path, { recursive: true }).forEach((file) => {
        const [name, fileExt] = file.split('.');
        if (ext.includes(fileExt)) {
            files.push(join(path, file));
        }
        });
    } catch (err) {
        console.error(err);
    }

    return files;
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
        const projectFolder = new URL(path, import.meta.url);
        
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
            const projectFolder = new URL(path, import.meta.url);
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
            const filePath = new URL(path, import.meta.url);
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
    const filePath = new URL(path, import.meta.url);
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
        if(a){await this.mkdir(a)}
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
        if(a){this.mkdirSync(a)}
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
     * Copies a file from a source path to a destination path.
     *
     * @param {string} src - The path of the source file.
     * @param {string} dest - The path of the destination file.
     * @return {Promise<void>} - A promise that resolves when the file is copied successfully.
     */
    static async copyFile(src, dest) {
        try {
            await copyFile(src, dest);
            console.log(`${src} was copied to ${dest}`);
        } catch {
            throw new Error('The file could not be copied');
        }
    }
    /**
     * Copy a file from source to destination synchronously.
     *
     * @param {string} src - The path of the source file.
     * @param {string} dest - The path of the destination file.
     * @return {void} - This function does not return a value.
     */
    static copyFileSync(src, dest) {
        try {
            copyFileSync(src, dest);
            console.log(`${src} was copied to ${dest}`);
        } catch {
            throw new Error('The file could not be copied');
        }
    }
    /**
     * Copies a directory from the source to the destination.
     *
     * @param {string} src - The path of the source directory.
     * @param {string} dest - The path of the destination directory.
     * @return {Promise} A Promise that resolves when the directory is successfully copied, or rejects with an error if the copy operation fails.
     */
    static async copyDirectory(src, dest) {
        try {
            await cp(src, dest, {recursive: true});
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Copies a directory from source to destination synchronously.
     *
     * @param {string} src - The path of the source directory.
     * @param {string} dest - The path of the destination directory.
     * @return {undefined} - This function does not return a value.
     */
    static copyDirectorySync(src, dest) {
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
     * @param {string} file - The path of the file.
     * @return {string} The last modified time of the file in ISO format.
     */
    static lastUpdate(file){
        const stats = statSync(file);
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
     * @param {Array} dir - An array of directories to watch.
     */
    static watch(dir = []) {
        const onChange = (event, filePath) => {
            console.log(`${filePath} has been changed`);
        };
    
        const onError = (error) => {
            console.log(error);
        };
    
        dir.forEach((di) => {
            const watcher = watch(di, { recursive: true });
            watcher.on('change', onChange);
            watcher.on('error', onError);
        });
    }
}

export default NodeFs