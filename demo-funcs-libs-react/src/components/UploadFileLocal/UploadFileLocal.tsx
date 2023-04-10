import React from 'react';
import './UploadFileLocal.scss';
import DragDropFile from "./DragDropFile/DragDropFile";
import {FileFormat} from "./FileFormat";

const UploadFileLocal = () => {
    return (
        <div className={`upload-file-local-root`}>
            <DragDropFile allowFileTypes={[FileFormat.CSV, FileFormat.PDF]}/>
        </div>
    );
};

export default UploadFileLocal;