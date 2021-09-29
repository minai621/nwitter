import { authService, dbService } from "../fbase";
import {useHistory} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import Nweet from "../component/Nweet";

type IProfile = {
    userObj: any;
    refreshUser: Function;
}
const Profile:React.FC<IProfile> = ({ userObj, refreshUser }) => {
    const [nweets, setNweets] = useState<Array<any>>([]);
    const [newDisplayName, setNewDisplayName] = useState<string | any>(userObj.displayName);
    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createAt", "asc")
            .get();
        setNweets(nweets.docs.map((doc) => doc.data()));
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userObj.displayName);
        console.log(newDisplayName);
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    }
    useEffect(() => {
        getMyNweets();
    }, [])

    return(
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display Name"
                    value={newDisplayName}
                />
                <input
                    type="submit"
                    value="Update Profile"
                />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
            {nweets.filter(
                nweet =>
                    nweet.text != ""
            ).map((nweet) => (
                <Nweet
                    key={nweet.id}
                    nweetObj={nweet}
                    isOwner={nweet.creatorId === userObj.uid}
                />
            ))}
        </>
    );
};

export default Profile;