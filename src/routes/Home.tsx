import React, {useEffect, useState} from "react";
import {dbService} from "../fbase";
import Nweet from "../component/Nweet";

type IHome = {
    userObj: any;
}


const Home:React.FC<IHome> = ({ userObj }) => {
    const [nweet, setNweet] = useState<any>("");
    const [nweets, setNweets] = useState<Array<any>>([])

    const onSubmit = async (event: any) => {
      event.preventDefault();
      await dbService.collection("nweets").add({
          text: nweet,
          createAt: Date.now(),
          creator: userObj.uid,
      });
      setNweet("");
    }

    const onChange = (event: any) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    useEffect(()=> {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        })
    }, []);

    return (
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="submit" value="Nweet"/>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </form>
    )
}

export default Home;