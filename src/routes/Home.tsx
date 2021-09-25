import React, {useState} from "react";

const Home:React.FC = () => {
    const [nweet, setNweet] = useState<any>("");

    const onSubmit = (event: any) => {
      event.preventDefault();
    };

    const onChange = (event: any) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setNweet(value);
    };

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
        </form>
    )
}

export default Home;