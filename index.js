import {removeLockFileFrom, sendFiles, verifyDirectory} from "./js/sender.js";

(async () => {
    // We verify the uploads/ folder, generally this folder must be created
    // in the system files of the server before being able to continue with
    // the execution of the service, but in servers where a new deployment
    // is made this folder in which case there is a forgetting to create it
    // will be created automatically to avoid an exception when not finding it.
    await verifyDirectory(process.env.DIRECTORY_BUCKET);
    // We verify the exposed precondition, what happens if the service ends
    // unexpectedly and the lock on the FTP sending directory is maintained,
    // because the service will not send any file until this lock has been
    // removed, with this approach what we will do is to unlock the directory
    // in case it has been blocked by an unexpected exit of the service.
    // This function will be executed only once when the service is started,
    // or reset.
    await removeLockFileFrom(process.env.DIRECTORY_BUCKET);
})();

// Each 90 seg. this functions is executed. The objective is to allow sending
// files that have been stuck in the folder due to a failure in the
// communication with the FTP service. If a failure occurs, it is guaranteed
// that every 90 seconds this function will be executed until no file is left
// in the directory.
setInterval(async () => {
    await sendFiles();
}, Number(process.env.FTPS_CYCLE_MS));

console.log("Cycle each: " + Number(process.env.FTPS_CYCLE_MS) / 1000 + " seconds.");