import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../store";
import { Profile } from "../common/profile"; 

import { v4 as uuidv4 } from 'uuid';

import del from '../../assets/trash-2-outline.svg';
import add from '../../assets/plus-outline.svg';
import { useEffect, useRef, useState } from "react";


const GroupWrapper = styled.div`
    display: flex;
    color: white;

    flex-direction: column;

    width: 100%;
    height: 100%;

    overflow: scroll;
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

    > input {
        width: 120px;
        background: none;
        color: white;
        border: 3px solid #4f4b4b !important;
    }
`;


const Group = () => {
    const dispatch = useDispatch();

    const [editable, setEditable] = useState(true);
    const [selected, setSelected] = useState<Group>();

    const editableInput = useRef(null);

    const group = useSelector((state: State)  => state.profile.groups);

    useEffect(() => {
        if(editableInput?.current)
            editableInput.current.focus();
    }, [selected, editable]);

    const createGroup = () => {
        const payload: Group = {color: 'white', name: "new group", id: uuidv4()}

        setSelected(payload);
        setEditable(true);

        dispatch(Profile.createGroup({...payload}));
    };

    const deleteGroup = (group: Group) => dispatch(Profile.deleteGroup({...group}));

    const updateGroup = (group: Group) => {
        dispatch(Profile.updateGroup(group))
    };

    const startEdit = (group: Group) => {
        setSelected(group);
        setEditable(true);
    };

    const stopEdit = () => {
        setEditable(false);
        updateGroup(selected);
    }

    return (
        <GroupWrapper>
            <GroupHeader>
                <h1>Group</h1>
            </GroupHeader>
            <GroupItems>
                {group.map((item, index) => {
                    return (               
                        <GroupItem key={index}>
                            {editable && selected.id == item.id ?
                                    <input className="group-editable"
                                        ref={editableInput}
                                        type="text"
                                        value={selected.name} 
                                        onChange={(e) => setSelected({...selected, name: e.target.value})}
                                        onBlur={() => stopEdit()}
                                    />
                                : 
                                    <span onClick={() => startEdit(item)}>{item.name}</span>
                            }
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