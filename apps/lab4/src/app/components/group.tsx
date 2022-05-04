import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../store";
import { Profile } from "../common/profile"; 

import { v4 as uuidv4 } from 'uuid';

import del from '../../assets/trash-2-outline.svg';
import add from '../../assets/plus-outline.svg';


const GroupWrapper = styled.div`
    display: flex;
    color: white;

    flex-direction: column;

    width: 100%;
    height: 100%;
`;

const GroupHeader = styled.section`
    align-self: center;
`;

const GroupItems = styled.section`
    padding: 10px;

    > * {
        margin-bottom: 20px;
    }
`;

const GroupItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #2b2b2b;

    width: auto;
    height: 60px;

    border: 3px solid #4f4b4b;
    border-radius: 5px;

    > img {
        width: 25px;
        height: 20px;
        filter: invert(99%) sepia(3%) saturate(614%) hue-rotate(329deg) brightness(117%) contrast(100%);
        cursor: pointer;
    }
`;


const Group = () => {
    const dispatch = useDispatch();

    const group = useSelector((state: State)  => state.profile.groups);

    const createGroup = () => {
        const payload = {color: 'white', name: "new group", id: uuidv4()}
        
        dispatch(Profile.createGroup({...payload}));
    };

    const deleteGroup = (group: Group) => dispatch(Profile.deleteGroup({...group}))

    return (
        <GroupWrapper>
            <GroupHeader>
                <h1>Group</h1>
            </GroupHeader>
            <GroupItems>
                {group.map((item, index) => {
                    return (               
                        <GroupItem key={index}>
                            <span>{item.name}</span>
                            <img src={del} onClick={() => deleteGroup(item)} />
                        </GroupItem>
                    );
                })}

                <GroupItem className="group-item-new" onClick={() => createGroup()}>
                    <span>Add new </span>
                    <img src={add} />
                </GroupItem>
            </GroupItems>
        </GroupWrapper>
    );
};

export default Group;