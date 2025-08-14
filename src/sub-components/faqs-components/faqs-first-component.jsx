import { Container, Row, Col, Accordion, Tab, Nav, Form, Button } from "react-bootstrap";
import '../../assets/css/faqs-components-style/faqs-first-component.css'
import { useEffect, useState } from "react";

function FAQsFComponent() {

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [categoryArray, setCategoryArray] = useState([])

  const [tabTitle, setTabTitle] = useState([])
  const [accordion, setAccordion] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch('https://tamkeen-dev.com/api/faq-list', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(serverError => {
            throw new Error(serverError.message);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setAccordion(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setTimeout(() => setLoading(false), 2000));
  }, [])

  console.log("accordion is", accordion)

  useEffect(() => {
    const categories = accordion.map(item => item.category);
    const uniqueCategories = [...new Set(categories)];
    setTabTitle(uniqueCategories);
  }, [accordion]);




  console.log("tab titles is ", tabTitle)

  return (
    <Container fluid >
      <Row className="faqs-first-compontent-row my-5">
        <Col xs={12}>
          <Row className="mb-5">
            <Col xs={12}>
              <div className="browse text-center">Frequently asked questions</div>
            </Col>
          </Row>

          <Row className="justify-content-between ">
            <Col xs={12} lg={9}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="Nulla" className="tabs-container">
                <Row >
                  <Col xs={12} lg={4}>
                    <Nav variant="pills" className="flex-column py-1">
                      {tabTitle.map((tab, index) => (
                        <Nav.Item key={index + 1} className="tab-container">
                          <Nav.Link eventKey={tab} className="tab-link">{tab}</Nav.Link>
                        </Nav.Item>
                      ))}
                    </Nav>
                  </Col>

                  <Col xs={12} lg={8}>
                    <Tab.Content className="tabs-content">
                      {tabTitle.map((tab, index) => (
                        <Tab.Pane eventKey={tab} key={index + 1}>
                          <Accordion defaultActiveKey="0" alwaysOpen>
                            {accordion
                              .filter(acc => acc.category === tab)
                              .map((acc, index) => (
                                <Accordion.Item className="accor-item mb-2" eventKey={String(index)} key={index + 1}>
                                  <Accordion.Header className="accor-title">{acc.title}</Accordion.Header>
                                  <Accordion.Body>
                                      <div dangerouslySetInnerHTML={{ __html: acc.body }} />
                                  </Accordion.Body>
                                </Accordion.Item>
                              ))}
                          </Accordion>
                        </Tab.Pane>
                      ))}

                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>


            </Col>
            <Col xs={12} lg={3} className="question-form-container py-4">
              <Row>
                <div>
                  Don't find your answer!
                </div>
                <p>
                  Don't worry, write your question here and our support team will help you.
                </p>
              </Row>
              <Form onSubmit={undefined}>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-3" controlId="formSubject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={undefined}
                        onChange={undefined}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-3" controlId="formMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={undefined}
                        onChange={undefined}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button className='contact-btn' type="submit">
                  Submit question
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );

}
export default FAQsFComponent;