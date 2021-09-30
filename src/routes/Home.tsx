import React, {useEffect, useState} from "react";
import {dbService, storageService} from "../fbase";
import Nweet from "../component/Nweet";
import { v4 as uuidv4 } from "uuid";

type IHome = {
    userObj: any;
}


const Home:React.FC<IHome> = ({ userObj }) => {
    const [nweet, setNweet] = useState<any>("");
    const [nweets, setNweets] = useState<Array<any>>([]);
    const [attachment, setAttachment] = useState<any>("");

    const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      let attachmentUrl: string = "";
      if(attachmentUrl !== "")
      {
          const attachmentRef = storageService
              .ref()
              .child(`${userObj.uid}/${uuidv4()}`);
          const response = await attachmentRef.putString(attachment, "data_url", );
          attachmentUrl = await response.ref.getDownloadURL();

      }
        await dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files }
        } = event;
        const theFile: any = files?.[0];
        const reader: FileReader | null = new FileReader();
        reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
            const result = finishedEvent.target?.result;
            setAttachment(result);
        };
        if(Boolean(theFile)) {
            reader.readAsDataURL(theFile);
        }
    }

    const onClearAttachment = () => setAttachment("");

    useEffect(()=> {
        dbService.collection("nweets")
            .orderBy("createAt", "desc")
            .onSnapshot((snapshot) => {
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
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nweet"/>
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>clear</button>
                </div>
            )}
            <div>
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
            </div>
        </form>
    )
}

export default Home;