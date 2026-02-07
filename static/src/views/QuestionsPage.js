import React, {useState} from "react";
import DefaultNavbar from "components/DefaultNavbar";
import { useNavigate } from "react-router-dom";
import QuestionPageHeader from "components/Headers/QuestionsPageHeader";

// reactstrap components
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
} from "reactstrap";

const QuestionPage = () => {
  const [DiscussionTitle, setTitle] = useState("");
  const [DiscussionContent, setContent] = useState("");
  const [DiscussionComment, setComment] = useState("");
  const navigate = useNavigate();

  const createQuestion = (e) => {
    e.preventDefault();

    const item = {
      Title: DiscussionTitle,
      Content: DiscussionContent,
      Comment: [
        DiscussionComment
      ]
    }

    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    }

    if (DiscussionTitle && DiscussionContent) {
      fetch("/api/questions", options)
        .then(res => {
          return res.json()
        }).then(() => {
          navigate("/questions/getitems");
        }).catch(err => {
          console.log(err)
        })
    } else {
      console.log("The form is not valid to be sent")
    }
  }

  return (
    <>
      <DefaultNavbar />
      <QuestionPageHeader />
      <React.Fragment>
        <form className="QuestionPage" onSubmit={createQuestion}>
          <div className="owner">
            <div className="name">
              <h2 className="title">
                Ask a Question! <br />
              </h2>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <label htmlFor="ID">Question Title</label>
              <InputGroup>
                <InputGroupText>
                  <i className="nc-icon nc-single-02" />
                </InputGroupText>
                <Input placeholder="Title" type="text" name="Title" onChange={e => setTitle(e.target.value)} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <label htmlFor="ID">Discussion Question</label>
              <InputGroup>
                <InputGroupText>
                  <i className="nc-icon nc-single-02" />
                </InputGroupText>
                <Input placeholder="Content" type="text" name="Content" onChange={e => setContent(e.target.value)} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <InputGroup>
                <input type="submit" value="create post" />
              </InputGroup>
            </Col>
          </Row>
        </form>
        <Col className="ml-auto mr-auto" md="6">
          <Button
            className="btn-round"
            color="info"
            href="/questions/getitems"
          >
            All Questions listed
          </Button>
        </Col>
      </React.Fragment>
    </>
  )
}
export default QuestionPage;
