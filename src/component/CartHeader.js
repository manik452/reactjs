import { Link } from "react-router-dom";
import { Container, Dropdown, FormControl, Navbar, Nav, Badge, img, Button, NavDropdown } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../context/Contex";
import { AiFillDelete } from "react-icons/ai";


const CartHeader = () => {
    const { state: { cart }, dispatch, productDispatch } = CartState();
    return (
        <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/"> Shopping Cart
                    </Link>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/cart">Cart</Nav.Link>
                        <Nav.Link href="/welcome">Authorized</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item to="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item to="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item to="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item to="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text className='search'>
                    <FormControl style={{ width: 500 }} onChange={(e) => {
                        productDispatch({
                            type: "FILTER_BY_SEARCH",
                            payload: e.target.value
                        })
                    }}
                        placeholder='Search a product' className="m-auto" />
                </Navbar.Text>
                <Nav>
                    <Dropdown >
                        <Dropdown.Toggle variant="success">
                            <FaShoppingCart color="white" fontSize="25px" />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>

                            {cart.length > 0 ? (
                                <>
                                    {cart.map(prod => (
                                        <span className="cartitem">
                                            <img src={prod.image} className='cartItemImg' alt={prod.name} ></img>
                                            <div className="cartItemDetail">
                                                <span>{prod.name} </span>
                                                <span>Tk {prod.price} </span>
                                            </div>
                                            <AiFillDelete fontSize="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: prod
                                                })} />
                                        </span>
                                    ))}
                                    < Link to="/cart">
                                        <Button style={{ width: "95%", margin: "0 10px" }}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>

                            ) : (
                                <span style={{ padding: 10 }}> Cart is Empty!</span>
                            )

                            }

                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default CartHeader;