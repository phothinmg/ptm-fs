# Node fs-module some usages
---

![node-js](https://res.cloudinary.com/practicaldev/image/fetch/s--uTQcjpvz--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ewuovtp4hnoyj1d6hszj.png)

---

## About

Native Node.js file system module learning outcomes , esm only.

---

## Install

```bash
npm i ptm-fs
```

---

## Usage


#### watch

***dir :*** An array of directories to watch

```javascript
    import nodefs from 'ptm-fs';

    nodefs.watch({
    dir: ['app']
    });

```

---

#### lastUpdate

***path :*** Path to file  - ***Return*** Formated date string for last update of a file.


```javascript
    import nodefs from 'ptm-fs';

   const date = nodefs.lastUpdate(path);

```

---

#### getFile


***path*** : Array - Path to directory - ***ext*** : Array - File extension  - ***Return***: array of files

#### getParent


***path :*** Path to a file  -  ***Return :*** parent path of file


```javascript
    import nodefs from 'ptm-fs';

    // Return array of files
    const files = await nodefs.getFile({
        path: ['app'],
        ext: ['md']
    });

    const parent =  nodefs.getParent('path_to_file');
```

---

#### mkdir - mkdirSync -  remove - removeSync - unlink


***path :*** Path to directory -  ***Return :*** Make directory . Remove/Delete directory or file.


```javascript
    import nodefs from 'ptm-fs';

    // Make Directory
    await nodefs.mkdir(path);
    nodefs.mkdirSync(path);

    // Remove  - directory or file
    await nodefs.remove(path);
    nodefs.removeSync(path);
    await nodefs.unlink(path);
```

---

#### readFile - readFileSync 

***path :*** Path to file - ***Return :*** Content of file

```javascript
    import nodefs from 'ptm-fs';

    const fileContent = await nodefs.readFile(path);
    const fileContent = nodefs.readFileSync(path);
```

---

#### writeFile - writeFileSync

***filePath :*** Path to file - ***data :*** Content to write  -  ***Return :*** Content of file

```javascript
    import nodefs from 'ptm-fs';

    await nodefs.writeFile(filePath, data);
    nodefs.writeFileSync(filePath, data);
```

---

#### copy - copySync

***src :*** path of the source - ***dest :*** path of the destination

```javascript
    import nodefs from 'ptm-fs';

    await nodefs.copy(src, dest);
    nodefs.copySync(src, dest);
```

---

#### isDir - isFile 

***path :*** Path to file - ***Return :*** Boolean

```javascript
    import nodefs from 'ptm-fs';

    nodefs.isDir(path)
    nodefs.isFile(path)
```
---






