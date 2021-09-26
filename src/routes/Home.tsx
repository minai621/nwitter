import React, {useEffect, useState} from "react";
import {dbService} from "../fbase";

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
    };

    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetObject = {...document.data(), id: document.id};
            setNweets((prev) => [document.data(), ...prev]);
        });
    }

    const onChange = (event: any) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    useEffect(()=> {
        getNweets();
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
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </form>
    )
}

export default Home;