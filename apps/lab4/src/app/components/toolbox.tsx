import styled from "styled-components";

import edit from '../../assets/edit-outline.svg';
import pen from '../../assets/brush-outline.svg';
import del from '../../assets/trash-2-outline.svg';

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

const ToolBox = () => {
    return ( 
        <ToolBoxWrapper>
            <img src={edit} />
            <img src={pen} />
            <img src={del} />
        </ToolBoxWrapper>
    );
};


export default ToolBox;