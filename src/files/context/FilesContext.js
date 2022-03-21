import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { storage } from '../../../firebase-config';

const FilesContext = createContext();
export { FilesContext };

const useFilesContext = () => {
    const context = useContext(FilesContext);
    if (context === undefined) {
        throw new Error('useFilesContext was used outside of its Provider');
    }
    return context;
};
export { useFilesContext };

const FilesContextProvider = props => {

    const [uploadingFile, setUploadingFile] = useState({
        status: null,
        progress: null,
        error: null,
        downloadURL: null
    });

    const uploadFile = useCallback(async (file, storagePath) => {
        try {
            const res = await fetch(file.uri);
            const blob = await res.blob();
            const splittedFileUrl = file.uri.split('/');
            const fileName = splittedFileUrl[splittedFileUrl.length - 1];
            const storageRef = ref(storage, storagePath + fileName);
            const uploadTask = uploadBytesResumable(storageRef, blob);
            const snapshot = await uploadTask;
            const downloadURL = await getDownloadURL(snapshot.ref);
            setUploadingFile({...uploadingFile, status:'over',  downloadURL});
            return {...uploadingFile, status:'over', downloadURL};
        } catch (error) {
            throw error;
        }
    }, [uploadingFile]);

    const deleteFile = useCallback(async (fileUrl) => {
        try {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
            return;
        } catch (error) {
            if (error.code === 'storage/object-not-found') {
                return;
            }
            throw error;
        }
    }, []);

    const contextValues = useMemo(() => ({
        uploadingFile,
        uploadFile,
        deleteFile
    }), [uploadingFile, uploadFile, deleteFile]);

    return(
        <FilesContext.Provider value={contextValues}>
            {props.children}
        </FilesContext.Provider>
    );

}
export default FilesContextProvider;