// Swathi
import React, { useState } from "react";
import { Card, Col, Row, Button, Modal, Form } from "react-bootstrap";
import "../style.css";

import * as SockJS from "sockjs-client";

const Stomp = require("stompjs");

function Experience() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showchat, setShowchat] = useState(false);

  const handleClosechat = () => setShowchat(false);
  const handleShowchat = () => setShowchat(true);

  const mes =
    "Could not connect to WebSocket server. Please refresh this page to try again!";
  var usernamePage = document.getElementById("#username-page");
  let chatPage = document.getElementById("#chat-page");
  let usernameForm = document.getElementById("#usernameForm");
  let messageForm = document.getElementById("#messageForm");
  // var messageInput = document.getElementById("#message");
  var messageArea = document.getElementById("#messageArea");
  const connectingElement = document.getElementById(".connecting");

  var stompClient = null;
  // var username = null;
  const [username, setUserName] = useState("");
  const [messageInput, setMessageInput] = useState([]);
  var colors = [
    "#2196F3",
    "#32c787",
    "#00BCD4",
    "#ff5652",
    "#ffc107",
    "#ff85af",
    "#FF9800",
    "#39bbb0",
  ];

  function connect(event) {
    event.preventDefault();
    console.log(username);
    if (username) {
      // usernamePage.classList.add("hidden");
      // chatPage.classList.remove("hidden");
      let socket = new SockJS("/comment");
      let stompClient = Stomp.over(socket);
      stompClient.connect({}, onError, onConnected);
      console.log(username);
      // console.log(chatPage);
    }
  }

  function onConnected() {
    // Subscribe to the Public Topic
    stompClient.connect("/topic/public", onMessageReceived(username));

    // Tell your username to the server
    stompClient.send(
      "/app/chat.register",
      {},
      JSON.stringify({ sender: username, type: "JOIN" })
    );
    console.log(JSON.stringify({ sender: username, type: "JOIN" }));
    // connectingElement.classList.add("hidden");
  }

  function onError(error) {
    console.log(connectingElement);
    connectingElement.textContent = mes;
    // connectingElement.style.color = "red";
  }

  function send(event) {
    var messageContent = messageInput.value;

    if (messageContent && stompClient) {
      var chatMessage = {
        sender: username,
        content: messageInput.value,
        type: "CHAT",
      };

      stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
      messageInput.value = "";
    }
    event.preventDefault();
  }

  function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement("li");

    if (message.type === "JOIN") {
      messageElement.classList.add("event-message");
      message.content = message.sender + " joined!";
    } else if (message.type === "LEAVE") {
      messageElement.classList.add("event-message");
      message.content = message.sender + " left!";
    } else {
      messageElement.classList.add("chat-message");

      var avatarElement = document.createElement("i");
      var avatarText = document.createTextNode(message.sender[0]);
      avatarElement.appendChild(avatarText);
      avatarElement.style["background-color"] = getAvatarColor(message.sender);

      messageElement.appendChild(avatarElement);

      var usernameElement = document.createElement("span");
      var usernameText = document.createTextNode(message.sender);
      usernameElement.appendChild(usernameText);
      messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement("p");
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }

    var index = Math.abs(hash % colors.length);
    return colors[index];
  }

  return (
    <div>
      <Col sm={4}>
        <Card bg="light" className="cardborder">
          <Card.Body>
            <h5>User 1</h5>
            <Row>
              <Col sm={12} xl={8}>
                <Col>
                  <h2>My Experience</h2>
                </Col>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Button onClick={handleShow}>Click here to chat with</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="username-page">
              <div className="username-page-container">
                <h1 className="title">Type your username</h1>
                <Form
                  id="usernameForm"
                  name="usernameForm"
                  onSubmit={(event) => connect(event)}
                >
                  <Form.Group>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Username"
                      autoComplete="off"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button
                      type="submit"
                      className="accent username-submit"
                      onClick={(e) => handleShowchat(e)}
                    >
                      Start Chatting
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={showchat} onHide={handleClosechat} id="chat-page">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="chat-container">
                <div className="chat-header">
                  <h2>Chat with them</h2>
                </div>
                <div className="connecting">Connecting...</div>
                <ul id="messageArea"></ul>
                <form
                  id="messageForm"
                  name="messageForm"
                  nameForm="messageForm"
                  onSubmit={send}
                >
                  <div className="form-group">
                    <div className="input-group clearfix">
                      <input
                        type="text"
                        // value={messageInput}
                        onChange={(event) => setMessageInput(event)}
                        placeholder="Type a message..."
                        autoComplete="off"
                        className="form-control"
                      />
                      <button type="submit" className="primary">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Col>
    </div>
  );
}

export default Experience;
