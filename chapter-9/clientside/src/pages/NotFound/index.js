import React from "react";
import { Alert, Container } from "reactstrap";

export default function NotFound(){
    return(
        <div>
            <Container className="my-5">
                <Alert color="primary">
                 Not Found
                </Alert>
            </Container>
            
        </div>
    )
}