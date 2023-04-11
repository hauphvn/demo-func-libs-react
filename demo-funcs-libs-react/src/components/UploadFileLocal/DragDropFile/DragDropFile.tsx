import React, {useEffect, useState} from 'react';
import './DragDropFile.scss';
import DragDropItem from "./DrapDropItem/DragDropItem";
import {v4 as uuidv4} from 'uuid';
import CSVFileValidator from 'csv-file-validator'
import {configValidateCSV} from "../../../utils/configValidateCSV";

export interface IFilePreview {
    name: string,
    id: number
}

type DragDropFileProp = {
    allowFileTypes?: string[]
}
const DragDropFile = (props: DragDropFileProp) => {
    const {allowFileTypes = undefined} = props;
    const [filesPreview, setFilesPreview] = useState<IFilePreview[]>([]);
    const [filesUploadMap, setFilesUploadMap] = useState(new Map());

    useEffect(() => {
        const files: IFilePreview[] = [];
        filesUploadMap.forEach((item: any, key: number) => {
            files.push(
                {
                    name: item?.name,
                    id: key
                }
            );
        })
        setFilesPreview(files);
    }, [filesUploadMap]);

    function allowDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
    }


    function onDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        // const file = event?.dataTransfer.files[0];
        const droppedFiles = event?.dataTransfer.files;
        const newFiles: any[] = [];
        const length = droppedFiles.length;
        for (let i = 0; i < length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                if (allowFileTypes && !allowFileTypes?.includes(droppedFiles[i]?.type)) {
                    //Change UI at here implement
                    alert(`only accept these file: ',${JSON.stringify(allowFileTypes)}`);
                } else {
                    newFiles.push({
                        name: droppedFiles[i].name,
                        type: droppedFiles[i].type,
                        size: droppedFiles[i].size,
                        data: droppedFiles[i]
                    });
                    // CSVFileValidator(droppedFiles[i], config)
                    //     .then(csvData => {
                    //         // csvData.data // Array of objects from file
                    //         console.log( csvData.data);
                    //         // csvData.inValidData // Array of error messages
                    //     })
                    //     .catch(err => {})
                    if (length === newFiles.length) {
                        const map = new Map(filesUploadMap.entries());
                        newFiles.forEach((file: any) => {
                            const fileId = uuidv4();
                            map.set(fileId, file);
                        })
                        setFilesUploadMap(map);
                    }
                }
            };

            reader.readAsDataURL(droppedFiles[i]);
        }
        // if (file) {
        //
        // }

    }

    function handleDeleteFileItem(id: number) {
        filesUploadMap.delete(id);
        const newMap = new Map(filesUploadMap.entries());
        setFilesUploadMap(newMap);
    }

    function preSubmitSCV() {
        const files = filesUploadMap.entries();
        for (const [index, file] of files) {
            // @ts-ignore
            CSVFileValidator(file.data, configValidateCSV)
                .then((data: any) => {
                    console.log(data);
                    console.log(data?.inValidData);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    return (
        <div className={`drag-drop-file-root`}>
            <div className={'drop-area'} onDragOver={(event) => allowDrop(event)} onDrop={(event) => onDrop(event)}
            >
                <div className={'text-placeholder'}>Drop your file here</div>

            </div>
            <div className="preview">
                {filesPreview.map((item: any) => (
                    <DragDropItem
                        onDelete={handleDeleteFileItem}
                        file={item} key={item.id}/>
                ))}
            </div>
            <div>
                <button onClick={preSubmitSCV}>submit</button>
            </div>
        </div>
    );
};

export default DragDropFile;