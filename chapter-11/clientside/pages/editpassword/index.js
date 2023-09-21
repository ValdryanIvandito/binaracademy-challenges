import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import styles from "../../styles/editpassword.module.css";
import Spinner from "react-bootstrap/Spinner";

const EditPasswordPage = () => {
  const [hideAlert, setHideAlert] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [colorMessage, setColorMessage] = useState("danger");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [payload, setPayLoad] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  function handleChange(value) {
    setPayLoad({ ...payload, ...value });
  }

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    console.log(token);
    console.log(email);
    try {
      if (!token) {
        console.log("Not Authorize !");
        window.location.replace("/login");
      } else {
        const response = await Axios.post(
          `${process.env.REACT_APP_BE_URL}/usergame/get`,
          { email },
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setId(response.data.data.id);
      }
    } catch (error) {
      console.log("Internal Server Error !");
      window.location.replace("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const updatePasswordApi = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_BE_URL}/usergame/update/password`,
        {
          id,
          newPassword: payload.newPassword,
          confirmNewPassword: payload.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      console.log(response.data.status);
      setColorMessage("success");
      setAlertMessage(response.data.status);
      setHideAlert(false);
      setUpdateSuccess(true);
    } catch (error) {
      setColorMessage("danger");
      setAlertMessage(error.response.data.message);
      setHideAlert(false);
    } finally {
      setLoading(false);
    }
  };

  const redirectEditProfile = () => {
    window.location.replace("/editprofile");
  };

  const textTitle = {
    fontSize: "21px",
    textAlign: "center",
  };

  const textDescription = {
    fontSize: "16px",
    textAlign: "center",
  };

  return (
    <div className={styles.EditPasswordImage}>
      <h1 className={styles.textH1}>Change Password</h1>
      <div className={styles.imageContainer}>
        <Alert color={colorMessage} hidden={hideAlert}>
          {alertMessage}
        </Alert>
      </div>
      <div className={styles.formContainer}>
        <Form>
          <FormGroup id="formBasicEmail">
            <Label className={styles.textLabel}>New Password</Label>
            <Input
              type="password"
              value={payload.newPassword}
              onChange={(event) =>
                handleChange({ newPassword: event.target.value })
              }
            />
          </FormGroup>
          <FormGroup id="formBasicPassword">
            <Label className={styles.textLabel}>Confirm New Password</Label>
            <Input
              type="password"
              value={payload.confirmNewPassword}
              onChange={(event) =>
                handleChange({ confirmNewPassword: event.target.value })
              }
            />
          </FormGroup>
          <br></br>
          <Button
            color="primary"
            block
            style={{ width: "100%" }}
            onClick={updatePasswordApi}
            disabled={loading || updateSuccess}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="mr-2" />
                Processing
              </>
            ) : updateSuccess ? (
              "Done"
            ) : (
              "Update Password"
            )}
          </Button>
          <br></br>
          <br></br>
          <Button
            color="primary"
            block
            style={{ width: "100%" }}
            onClick={redirectEditProfile}
          >
            Back
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditPasswordPage;
