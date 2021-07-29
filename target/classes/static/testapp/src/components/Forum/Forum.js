// Swathi
import React from "react";
import { Form, Button, FormLabel, Col, Row } from "react-bootstrap";
import Tags from "@yaireo/tagify/dist/react.tagify";
import Experience from "./Experience";
import "../style.css";
import { Plus, PlusCircle, PlusCircleFill } from "react-bootstrap-icons";
const baseTagifySettings = {
  blacklist: [],
  maxTags: 6,
  backspace: "remove",
  placeholder: "type something",
  editTags: 1,
  dropdown: {
    enabled: 0,
  },
  callbacks: {},
};

function TagField({ label, name, initialValue = [], suggestions = [] }) {
  const handleChange = (e) => {
    console.log(
      e.type,
      " ==> ",
      e.detail.tagify.value.map((item) => item.value)
    );
  };

  const settings = {
    ...baseTagifySettings,
    whitelist: suggestions,
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      edit: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange,
    },
  };

  return (
    <Form onSubmit="handleSubmit">
      <label htmlFor={"field-" + name}>{label}</label>
      <Tags
        settings={settings}
        initialValue={initialValue}
        className="taginput"
      />
      <Button type="Submit" className="tagsearch">
        Search
      </Button>
    </Form>
  );
}

function Forum() {
  const suggestions = [
    "Pfizer",
    "CoronaVac",
    "Moderna",
    "Coping with side-effects",
    "Diabetics",
    "Allergies",
    "Cured Covid Patients",
    "",
  ];
  return (
    <Col>
      <Row>
        <h1>Experience of Vaacinated People</h1>
        <TagField suggestions={suggestions} />
        <Experience />
      </Row>

      <Button variant="success" className="buttonplus">
        <PlusCircleFill />
      </Button>
    </Col>
  );
}

export default Forum;
