export { fs as default };
declare const fs: typeof NodeFs;
declare class NodeFs {
    /**
     * Retrieves a list of file paths that match the specified options.
     *
     * @param {Object} opts - The options for retrieving the file paths.
     * @param {string} opts.path - The path to the directory to search for files.
     * @param {Array<string>} opts.ext - The file extensions to include in the search.
     * @return {Promise<Array<string>>} A promise that resolves with an array of filtered file paths.
     */
    static getFile(opts?: {
        path: string;
        ext: Array<string>;
    }): Promise<Array<string>>;
    /**
     * Retrieves a list of files from the specified path with the given extension.
     *
     * @param {Object} opts - The options for retrieving the files.
     * @param {string} opts.path - The path to the directory.
     * @param {Array<string>} opts.ext - The list of file extensions to filter.
     * @return {Array<string>} - The list of file paths.
     */
    static getFileSync(opts?: {
        path: string;
        ext: Array<string>;
    }): Array<string>;
    /**
     * Returns the parent directory of the given path if it's a directory,
     * otherwise returns the file name.
     *
     * @param {string} path - The path to a file.
     * @return {string} The parent directory or file name.
     */
    static getParent(path: string): string;
    /**
     * Creates a new directory at the specified path.
     *
     * @param {string} path - The path where the directory should be created.
     * @return {Promise<void>} A Promise that resolves when the directory is successfully created.
     */
    static mkdir(path: string): Promise<void>;
    /**
     * Creates a directory synchronously at the specified path.
     *
     * @param {string} path - The path where the directory should be created.
     * @return {void} This function does not return anything.
     */
    static mkdirSync(path: string): void;
    /**
     * Reads a file from the specified path.
     *
     * @param {string} path - The path of the file to read.
     * @return {Promise<string|null>} The contents of the file as a string, or null if an error occurred.
     */
    static readFile(path: string): Promise<string | null>;
    /**
     * Reads the contents of a file synchronously.
     *
     * @param {string} path - The path of the file to be read.
     * @return {string} The contents of the file.
     */
    static readFileSync(path: string): string;
    /**
     * Writes data to a file at the specified file path. If the directory does not exist, it creates the directory first.
     *
     * @param {string} filePath - The path to the file.
     * @param {string} data - The data to write to the file.
     * @return {Promise<void>} - A promise that resolves when the file has been successfully written.
     */
    static writeFile(filePath: string, data: string): Promise<void>;
    /**
     * Writes data to a file synchronously.
     *
     * @param {string} filePath - The path to the file.
     * @param {any} data - The data to write to the file.
     * @return {void}
     */
    static writeFileSync(filePath: string, data: any): void;
    /**
     * Recursively deletes all files and subdirectories in the specified directory.
     *
     * @param {string} directoryPath - The path of the directory to be cleared.
     * @param {boolean} notFirstCall - Optional. Indicates whether this is the first call to the function. Default is false.
     */
    static clearDirectory(directoryPath: string, notFirstCall?: boolean): void;
    /**
     * Copies a file from a source path to a destination path.
     *
     * @param {string} src - The path of the source file.
     * @param {string} dest - The path of the destination file.
     * @return {Promise<void>} - A promise that resolves when the file is copied successfully.
     */
    static copyFile(src: string, dest: string): Promise<void>;
    /**
     * Copy a file from source to destination synchronously.
     *
     * @param {string} src - The path of the source file.
     * @param {string} dest - The path of the destination file.
     * @return {void} - This function does not return a value.
     */
    static copyFileSync(src: string, dest: string): void;
    /**
     * Copies a directory from the source to the destination.
     *
     * @param {string} src - The path of the source directory.
     * @param {string} dest - The path of the destination directory.
     * @return {Promise} A Promise that resolves when the directory is successfully copied, or rejects with an error if the copy operation fails.
     */
    static copyDirectory(src: string, dest: string): Promise<any>;
    /**
     * Copies a directory from source to destination synchronously.
     *
     * @param {string} src - The path of the source directory.
     * @param {string} dest - The path of the destination directory.
     * @return {undefined} - This function does not return a value.
     */
    static copyDirectorySync(src: string, dest: string): undefined;
    /**
     * Removes a file or directory at the specified path.
     *
     * @param {string} path - The path to the file or directory to be removed.
     * @return {Promise<void>} A Promise that resolves when the removal is complete.
     */
    static remove(path: string): Promise<void>;
    /**
     * Removes a file or directory synchronously.
     *
     * @param {string} path - The path to the file or directory to be removed.
     * @return {void} This function does not return a value.
     */
    static removeSync(path: string): void;
    /**
     * Delete a file at the given path.
     *
     * @param {string} path - The path to the file to be deleted.
     * @return {Promise<void>} - A promise that resolves when the file is deleted.
     */
    static unlink(path: string): Promise<void>;
    /**
     * Retrieves the last modified time of a file.
     *
     * @param {string} file - The path of the file.
     * @return {string} The last modified time of the file in ISO format.
     */
    static lastUpdate(file: string): string;
    /**
     * Checks if the given path is a directory.
     *
     * @param {string} path - The path to check.
     * @return {boolean} Returns true if the path is a directory, false otherwise.
     */
    static isDir(path: string): boolean;
    /**
     * Checks if the given path is a file.
     *
     * @param {string} path - The path to check.
     * @return {boolean} Returns true if the path is a directory, false otherwise.
     */
    static isFile(path: string): boolean;
    /**
     * Watches the specified directories for changes.
     *
     * @param {Array} dir - An array of directories to watch.
     */
    static watch(dir?: any[]): void;
}
//# sourceMappingURL=index.d.ts.map