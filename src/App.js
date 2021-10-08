import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import initializeFireBaseApp from "./Config/Firebase.init";

function App() {
    // State for email and password
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");

    // form handling

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleRegistration = (e) => {
        e.preventDefault();

        // fire base authentication

        initializeFireBaseApp(); //initialize app

        // password authentication with firebase
        const auth = getAuth();
        if (Password.length < 6) {
            setError("Password Must Be At Least 6 Character");
            return;
        } else {
            setError("");
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(Password)) {
            setError("Password Must Contain 2 Upper Case");
            return;
        } else {
            setError("");
        }
        createUserWithEmailAndPassword(auth, Email, Password)
            .then((result) => {
                // Signed in
                const user = result.user;
                console.log(user);
                setError("");
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            });
    };

    return (
        <div className="App">
            <div className="form-container w-50 d-flex justify-content-end mt-5 ">
                <Form onSubmit={handleRegistration}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            onBlur={handleEmailChange}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            onBlur={handlePasswordChange}
                            type="password"
                            placeholder="Password"
                            required
                        />
                        <p className="text-danger">{error}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default App;
