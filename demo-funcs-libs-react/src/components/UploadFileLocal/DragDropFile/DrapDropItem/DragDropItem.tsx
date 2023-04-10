import React from 'react';
import './DragDropItem.scss';
import {IFilePreview} from "../DragDropFile";
type DragDropItemProp = {
    file: IFilePreview,
    onDelete?:(id: number) => void;
}
const DragDropItem = (props: DragDropItemProp) => {
    const {file, onDelete = () => null} = props;

    return (
        <div className={'drag-drop-item-root'}>
            {file && (
                <div className={`item-container`}>
                    <div>{file?.name}</div>
                    <button onClick={() => onDelete(file.id)}>delete</button>
                </div>

            )}
        </div>
    );
};

export default DragDropItem;