import fs from 'fs'
import path from 'path'
import ftp from 'basic-ftp'

/**
 * Checks the existence of the directory, if this directory does not exist it
 * creates it, the default function suppresses the error generated by trying
 * to create a directory that already exists, if you wish to obtain this
 * behavior avoid using this function.
 *
 * @param directory Directory to verify the existence.
 * @returns {Promise<void>} None.
 */
export async function verifyDirectory(directory) {
    try {
        await fs.promises.mkdir(directory)
    } catch (ignored) {
    }
}

/**
 * Move all the files from directory to directory, if the destination
 * directory not exist it function created the directory.
 *
 * @param from Directory from the current files are stored.
 * @param to Destination directory from the files will be saved.
 * @returns {Promise<void>} None
 */
async function moveAllFiles(from, to) {
    // Created the directory if not exist
    await verifyDirectory(to);
    fs.readdir(from, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.rename(path.join(from, file), path.join(to, file), err => {
                if (err) throw err;
            });
        }
    });
}

/**
 * This function is executed only if two conditions are true, the first
 * condition is that there is at least one file in the directory and the
 * second condition is that no other process is blocking the directory.
 *
 * A problem that can occur with this function is that it produces a
 * deadlock, since the existence of a dummy file (in this case a .lock
 * that is used to determine the lock of the directory) can cause the
 * function to stop executing, blocking the other processes that need
 * to access this directory, to avoid this type of problem two conditions
 * must be met:
 *
 * The first condition is that only one function must be in charge of
 * creating the dummy file (in this case the .lock), the second condition
 * is that the function that is in charge of creating the dummy file must
 * be the same function that must also be in charge of deleting it once
 * the directory has been released.
 *
 * @returns {Promise<void>} None
 */
export async function sendFiles() {
    // We verify that the conditions mentioned above are met, i.e., that
    // there is more than one file in the directory and that it is released
    // by another function
    if (fs.readdirSync(process.env.DIRECTORY_BUCKET).length === 0) return;

    await console.log("Begin cycle");
    const client = new ftp.Client();
    // Only for debug session
    client.ftp.verbose = (process.env.DEBUG === 'true');
    try {
        // We make the connection to the FTP server, a feature of this
        // connection is: Unlike a previous implementation, this connection
        // will only be established if there is at least one file to send,
        // if there is no file to send the connection will not be established,
        // saving network resources and avoiding the blocking of the IP by a
        // constant PING done day and night (non-stop).
        await client.access({
            host: process.env.FTPS_HOST,
            port: process.env.FTPS_PORT,
            user: process.env.FTPS_USER,
            password: process.env.FTPS_PASS,
            // Only allow insecure connection with debug flag active (This is
            // useful only when a developer is working), for production it
            // flag is true, meaning that any attempt to connect to an FTP
            // with a self-signed or expired certificate will fail as an
            // exception will be thrown.
            secure: !process.env.DEBUG,
        })

        // Log progress for any transfer from now on.
        client.trackProgress(info => {
            if (process.env.DEBUG === 'true') {
                console.log("File", info.name)
                console.log("Type", info.type)
                console.log("Transferred", info.bytes)
                console.log("Transferred Overall", info.bytesOverall)
            }
        })

        let destinationPath = process.env.FTPS_DIR;
        if (!destinationPath.endsWith('/')) {
            destinationPath += '/'
        }

        await client.ensureDir(destinationPath);
        await client.uploadFromDir(process.env.DIRECTORY_BUCKET);
        await moveAllFiles(process.env.DIRECTORY_BUCKET, process.env.DIRECTORY_BACKUP);
    } catch (err) {
        console.error(err);
    }
    await client.close()
}