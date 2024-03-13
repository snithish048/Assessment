import React, { useState } from "react";
import styles from "../styles/modal.module.css";
import stl from "../styles/App.module.css";
import Axios from'axios'; 


function Modal({ setIsOpen }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [addedSchemas, setAddedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const handleSchemaAdd = () => {
    if (selectedSchema) {
      setAddedSchemas([...addedSchemas, selectedSchema]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== selectedSchema)
      );
      setSelectedSchema("");
    }
  };

  const handleSave = () => {
    const url = 'https://webhook.site/0e87b760-de18-4540-a511-367e69f02706'
    const formattedSchemas = addedSchemas.map((schema) => ({
      [schema]:
        availableSchemas.find((item) => item.value === schema)?.label || schema,
    }));

    const data = {
      segmentName,
      selectedSchemas: formattedSchemas,
    };

    const jsonData = JSON.stringify(data)
    Axios.post(url,jsonData).then(
      response => {
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
    setSegmentName("")
    setAddedSchemas([])
    setIsOpen(false)
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>

          <p className={styles.header}>
            <span className={styles.arrow} onClick={() => setIsOpen(false)}>{"< "}</span>
            Saving Segment
          </p>

          <div className={styles.form}>
            Enter the name of the segment

            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              className={styles.input}
              onChange={(e) => setSegmentName(e.target.value)}
            />

            <p>
              To save your segment you need to add the schemas to built the
              query
            </p>

            <label>
              <select
                className={styles.select}
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
              >
                <option value="">Add schema to segment</option>
                {availableSchemas.map((schema) => (
                  <option key={schema.value} value={schema.value}>
                    {schema.label}
                  </option>
                ))}
              </select>
              <h5 onClick={handleSchemaAdd} className={styles.addSchema}>
                +Add new schema
              </h5>
            </label>

            {addedSchemas.length > 0 && (
              <div className={styles.schemas}>
                {addedSchemas.map((schema) => (
                  <select 
                  key={schema} 
                  value={schema} 
                  className={styles.select}
                  onChange={() => {}}>
                    <option>{schema}</option>
                    {availableSchemas.map((availableSchema) => (
                      <option
                        key={availableSchema.value}
                        value={availableSchema.value}
                      >
                        {availableSchema.label}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            )}
          </div>

          <div className={styles.footer}>
            <button className={stl.button} onClick={handleSave}>
              Save the segment
            </button>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsOpen(false)}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
