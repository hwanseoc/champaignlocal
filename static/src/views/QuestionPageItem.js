import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultNavbar from "components/DefaultNavbar.js";
import QuestionPageHeader from "components/Headers/QuestionsPageHeader.js"

const Item = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({});
    const [itemid, setItemid] = useState("");
    const [editMode, setEditMode] = useState(false);

    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Comment, setComment] = useState("");

    const getItem = () => {
        let cleanID = id.replace(/['"]+/g, "");
        setItemid(cleanID);
        fetch("/api/questions/item/" + cleanID)
        .then(res => {
            return res.json();
        }).then(res => {
            let parsedResponse = JSON.parse(res.data);
            setItem(parsedResponse)
            setTitle(parsedResponse.Title);
            setContent(parsedResponse.Content);
            setComment(parsedResponse.Comment);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getItem();
    }, []);

    const editItem = (itemId) => {
        console.log(itemId)
        setEditMode(!editMode);
    }

    const updateItem = (e) => {
        e.preventDefault();
        const itemData = {
            itemid: itemid,
            Title: Title,
            Content: Content,
            Comment: Comment
        }
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        }
        fetch("/api/questions/update/" + itemid, options)
        .then(res => {
            return res.json();
        }).then(res => {
            console.log(res)
            navigate("/questions/getitems");
        }).catch(err => {
            console.log(err)
        });
    }

    let editForm;
    if (editMode) {
        editForm =
        <React.Fragment>
            <form className="editForm" onSubmit={updateItem}>
                <p> Add your Comment</p>
                <div className="control">
                    <label htmlFor="Comment">Comment: </label>
                    <input type="text" name="Comment" onChange={e => setComment(e.target.value)} />
                </div>
                <input type="submit" value="Update Item"/>
            </form>
        </React.Fragment>
    }

    return (
        <>
        <DefaultNavbar/>
        <QuestionPageHeader/>
        <React.Fragment>
            <div className="single">
                <h3>Title: {item.Title}</h3>
                <h3>Content: {item.Content}</h3>
                <h3>Comments: {item.Comment}</h3>
            <button className="edit" onClick={(e) => editItem(itemid)}>Add Comment</button>
            </div>
            {editForm}
        </React.Fragment>
        </>
    );
}
export default Item;
