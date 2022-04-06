import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import "./AddGetWord.css"

export const AddGetWord: React.FC<any> = (params) => {
  const [wordCode,setWordCode] = useState("");
  const [listLang,setListLang] = useState("");
  const [text,setText] = useState("");

  const handleSubmit = (event:any)=>{
    event.preventDefault();
    event.stopPropagation();
  }

  const validForm =()=> /[a-z|A-Z]{2,}/.test(wordCode) && listLang.length; 

  const add = ()=>{
   
    if(validForm()){
      if(text.length<2){
        alert("Check field Text!");
        return;
      }
      params.db.add(wordCode,listLang,text).then( (result:any) =>{
          if(result.success) alert("Added!") 
          else alert("Error: "+result.message);
        })
    }
        
  }

  const get = () =>{
    if(validForm())
      params.db.get(wordCode,listLang).then(
        (result:any) =>{
          if(result.success) alert("Text: "+result.message) 
          else alert("Error: "+result.message);
        }
      );
  }

    return (
        <>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="wordCode">
                <Form.Label className='label-left'>Word code</Form.Label>
                <Form.Control required pattern='[a-z|A-Z]{2,}' value = {wordCode} onChange={(e)=>setWordCode(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="listLang">
                <Form.Label>Code lang</Form.Label>
                <Form.Select required value = {listLang} onChange={(e)=>setListLang(e.target.value)} >
                  <option value="">Choise...</option>
                  <option value='en'>English</option>
                  <option value='ru'>Russian</option>
                  <option value='he'>Hebrew</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="text">
                <Form.Label>Text</Form.Label>
                <Form.Control  value = {text} onChange={(e)=>setText(e.target.value)} />
              </Form.Group>
            </Col>
            <Col sm={1} className="col-btn">
              <Button type="submit" variant="primary" onClick={add}>Add</Button>
            </Col>
            <Col sm={1} className="col-btn">
              <Button type="submit" variant="primary" onClick={get}>Get</Button>
            </Col>
          </Row>
        </Form>

        </>
    );
}

