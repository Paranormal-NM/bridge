import React from "react"
import {Col, Container, Navbar, Nav, Row, Image, Form, FormControl, Button, ListGroup,} from "react-bootstrap";
import logo from "../../images/paranormal-nm-logo.png"
import icon from "../../images/magGlass.png"
import ghost from "../../images/ghostIcon.png"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCategories} from "../../../store/categories";
import {useHistory} from 'react-router-dom'
import {httpConfig} from "../utils/http-config";
import {fetchAuth, getAuth} from "../../../store/auth";
export const LogoBar = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const initialEffects = () => {
        dispatch (fetchAllCategories())
        dispatch(fetchAuth());
    }

    React.useEffect(initialEffects, [dispatch])

    const categories = useSelector(state=> state.categories ?? [])

    const signOut = () => {
        httpConfig.get('/apis/sign-out/').then(reply => {

            if (reply.status === 200) {
                window.localStorage.removeItem('authorization')
                dispatch(getAuth(null))
                window.location = '/'

            }
        })
    }


    const history = useHistory()
    console.log(auth)
    return (
        <>
            <Container>
                <Row className="logoBar">
                    <Col md={5}>
                        <a href="/"><Image fluid="lg" src={logo}/></a>
                    </Col>
                    <Col md={7}>

                        <Link to={"/profile"}> <button type="button" className="buttonStory">SUBMIT YOUR STORY!</button></Link>
                        {auth == null ?
                        <Link to={"/login"}><button type="button" className="buttonLogin">Log In / Sign Up</button></Link>
                        :
                            <button type="button" className="buttonLogin" onClick={signOut}>Sign Out</button>
                        }


                    </Col>
                </Row>
                <Row>
                    <Navbar expand='md'>
                        <Container>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav className="ms-auto">
                                {categories.map(category =>(
                                    <Nav.Link
                                        key={category.categoryId}
                                        className="navGhost" onClick={() => {history.push(`/story-category/${category.categoryId}`)}}>{category.categoryName.toUpperCase()}</Nav.Link>
                                ))}
                                {/*    <Nav.Link className="navGhost" href="#ghosts">GHOST STORIES</Nav.Link>*/}
                                {/*    <Nav.Link className="navPlaces" href="#places">HAUNTED PLACES</Nav.Link>*/}
                                {/*    <Nav.Link className="navNear" href="#near-death">NEAR DEATH EXPERIENCES</Nav.Link>*/}
                                {/*    <Nav.Link className="navPara" href="#paranormal">PARANORMAL EVENTS</Nav.Link>*/}
                                </Nav>

                                {/*<Form className="d-flex" size="sm">*/}
                                {/*    <FormControl size="sm"*/}
                                {/*        type="search"*/}
                                {/*        placeholder="Search"*/}
                                {/*        className="ml-1"*/}
                                {/*        aria-label="Search"*/}
                                {/*    />*/}
                                {/*    <Button><Image src={icon}/></Button>*/}
                                {/*</Form>*/}
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Row>
           </Container>

        </>
    )
}