import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Container,
  Row,
  Col,
  Label,
} from "reactstrap";

import Slider from "nouislider";

// core components

function StoresSearch() {
  const [query, setQuery] = React.useState("");
  const [minRating, setMinRating] = React.useState(4.0);
  const [stores, setStores] = React.useState([]);

  React.useEffect(
    () => {
      const slider = document.getElementById("minRatingSlider");
      Slider.create(slider, {
        start: [4.0],
        connect: [false, true],
        step: 0.1,
        range: { min: 0, max: 5.0 },
      });
      slider.noUiSlider.on('update', (values, handle) => {
        setMinRating(values[handle]);
      });
    }, []
  );

  function handleOnInput(event) {
    const q = event.target.value;
    setQuery(q);
  }

  async function handleSearchClick(event) {
    const takeoutArr = [];
    if (document.getElementById('takeoutOpen').checked) takeoutArr.push('OPEN');
    if (document.getElementById('takeoutTakeout').checked) takeoutArr.push('OPEN(Takeout)');
    if (document.getElementById('takeoutClosed').checked) takeoutArr.push('CLOSED');
    const response = await fetch(
      `/api/stores/name-search?keyword=${query}&minRating=${minRating}&takeout=${JSON.stringify(takeoutArr)}`
    );
    const body = await response.json();
    if (body.ok) {
      setStores(body.stores);
    }
  }

  return (
    <>
      <div className="section content">
        <Container>
          <div className="owner">
            <div className="name">
              <h2 className="title">
                Find Your Store! <br />
              </h2>
            </div>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              <p>
                Enter in store Name and our list will update to show you what we have
              </p>
              <br />
              <InputGroup>
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split"></i>
                </InputGroupText>
                <Input
                  type="text"
                  placeholder="Search"
                  onInput={handleOnInput}
                />
              </InputGroup>
              <br />
              <p>
                Only show stores with ratings above {Number(minRating).toFixed(1)}
              </p>
              <div className="slider" id="minRatingSlider" />
              <br />
              <p>
                Only show stores with Covid Restrictions that are:
              </p>
              <br />
              <Label><Input defaultChecked defaultValue="" type="checkbox" id="takeoutOpen"/>Open</Label>
              <br />
              <Label><Input defaultChecked defaultValue="" type="checkbox" id="takeoutTakeout"/>Open(Takeout)</Label>
              <br />
              <Label><Input defaultChecked defaultValue="" type="checkbox" id="takeoutClosed"/>Closed</Label>
              <br />
              <Button
                className="btn-round"
                color="default"
                outline
                onClick={handleSearchClick}
              >
                Go!
              </Button>
            </Col>
          </Row>
          <br />
          <Row style={{ margin: "auto", justifyContent: "center" }}>
            {
              stores.map((store, key) => {
                return (
                  <Card style={{ width: "30rem" }} key={key}>
                    <CardBody>
                      <CardTitle>{store.name}</CardTitle>
                      <CardText>Store ID: {store.id}</CardText>
                      <CardText>Covid Restrictions: {store.covid_restrictions}</CardText>
                      <CardText>Hours: {store.hours}</CardText>
                      <CardText>Store Location: {store.location}</CardText>
                      <CardText>Store Owner: {store.owner}</CardText>
                      <CardText>ratings: {store.ratings}</CardText>
                    </CardBody>
                  </Card>
                )
              })
            }
          </Row>
        </Container>
      </div>
    </>
  );
}

export default StoresSearch;
