import {dbService, storageService} from "../fbase";
import React, {useState} from "react";
import {storage} from "firebase";

type INweet = {
    nweetObj: any;
    isOwner: boolean;
}

const Nweet: React.FC<INweet> = ({ nweetObj, isOwner }) => {

    const [editing, setEditing] = useState<boolean>(false);
    const [newNweet, setNweet] = useState<string>(nweetObj.text);

    const onDeleteCLick = async() => {
        const ok = window.confirm("삭제하시겠습니다?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            if(nweetObj.attachmentUrl !== "")
                await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    };

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    }

    const onSubmit = async (event: any) => {
        event.preventDefault();
        console.log(nweetObj.id, newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
        setEditing(false);
    }

    return (
        <div>
            {editing ? (
                    <>
                        <form onSubmit={onSubmit}>
                            <input onChange={onChange} value={newNweet} required />
                            <input type="submit" value="Update Nweet" />
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                        <>
                            <h4>{nweetObj.text}</h4>
                            {
                                nweetObj.attachmentUrl && (
                                    <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                                )
                            }
                            {
                                isOwner && (
                                    <>
                                        <button onClick={onDeleteCLick}>Delete Nweet</button>
                                        <button onClick={toggleEditing}>Edit Nweet</button>
                                    </>
                                )
                            }
                        </>
                )}
            </div>
    )
};

export default Nweet;