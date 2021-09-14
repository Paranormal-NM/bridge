import {Image, ListGroup} from "react-bootstrap";
import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';

export const StoryListCard = ({story}) => {

    const profiles = useSelector(state => state.profiles ? state.profiles : null);
    const FindUserName = () => {
        const profile = profiles.find(profile => story.storyProfileId === profile.profileId)
        return (
            <>
                {profile && <p>{profile.profileUsername} </p>}
            </>

        )
    }

    const StoryTeaser = ({story}) => {

        const storyTeaser = story.substr(0,40)
        return (
            <>
                <p>
                    {storyTeaser}
                </p>
            </>
        )
    }
        let history = useHistory()
        function handleClick(){
            history.push(`/story/${story.storyId}`)
        }

    return (
        <>
            <ListGroup.Item action onClick={handleClick} variant="light" ><span className={"storyTitle"}>{story.storyTitle}</span>
                <span className="details">
                <FindUserName/>
                <StoryTeaser story={story.storyBody}/>
                </span></ListGroup.Item>
        </>
    )
}
