import styled from "styled-components";

import edit from '../../assets/edit-outline.svg';
import pen from '../../assets/brush-outline.svg';
import del from '../../assets/trash-2-outline.svg';
import { useState } from "react";

const ToolBoxWrapper = styled.div`
    display: flex;

    position: absolute;
    
    background: #2b2b2b;

    padding: 5px 10px;
    border-radius: 5px;
    gap: 40px;

    top: 20px;

    > img {
        width: 25px;
        height: 40px;

        cursor: pointer;

        filter: invert(99%) sepia(3%) saturate(614%) hue-rotate(329deg) brightness(117%) contrast(100%);
    }
`;

enum EditorMode {
    Edit,
    Draw,
    Delete
};

interface ToolBoxItem {
    image: string;
    mode: EditorMode;
};

const ToolBoxItems: ToolBoxItem[] = [
    { image: edit, mode: EditorMode.Edit },
    { image: pen, mode: EditorMode.Draw },
    { image: del, mode: EditorMode.Delete },
];

const ToolBox = () => {
    const [items] = useState(ToolBoxItems);
    const [mode, setMode] = useState(EditorMode.Edit);

    const changeModeClick = (mode: EditorMode) => {
        setMode(mode);
    }

    return ( 
        <ToolBoxWrapper>
            {items.map((item: ToolBoxItem, idx) => {
                return (
                    <img key={idx} 
                        src={item.image} 
                        className={mode === item.mode ? 'active' : ''} 
                        onClick={() => changeModeClick(item.mode)}
                    />
                );
            })}
        </ToolBoxWrapper>
    );
};

export default ToolBox;