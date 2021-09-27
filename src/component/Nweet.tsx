import {dbService} from "../fbase";
import {useState} from "react";

type INweet = {
    nweetObj: any;
    isOwner: boolean;
}

const Nweet: React.FC<INweet> = ({ nweetObj, isOwner }) => {

    const [editing, setEditing] = useState<boolean>(false);
    const [newNweet, setNweet] = useState<string>(nweetObj.text);

    const onDeleteCLick = async() => {
        const ok = window.confirm("삭제하시겠습니다?");
        console.log(ok);
        if (ok) {
            console.log(nweetObj.id);
            const data = await dbService.doc(`nweets/${nweetObj.id}`).delete();
            console.log(data);
        }
    }

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