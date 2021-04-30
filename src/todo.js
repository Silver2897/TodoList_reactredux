import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';
import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Input,Row,Col } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined
  } from '@ant-design/icons';

const Todolistoutput = (mapStateToProps)=>{
    
     const handleChange=(event)=> {
         setvalue(event.target.value)
         console.log(event.target.value);
      }
    const[value,setvalue]= useState('');
        return (
            
          <div>
            <h2>Type in a new Message:</h2>
            <input onChange={handleChange}/>
            <button onClick={() => mapStateToProps.addMessage(value)}>Submit</button>
               {/* The messages state is mapped to Presentational's props; therefore, when rendering,
                   you should access the messages state through props, instead of Presentational's
                   local state. */}
              {mapStateToProps.list.list.map( (message, idx) => {
                  return (
               
                    <div key={idx} className="image-item"> 
                     <Row>
                <Col span={20} xs={20} sm={16} md={12} lg={16} xl={20}><p className="title-text"><p className="title-text">{idx}-{message}</p></p></Col>
                <Col span={4}  xs={4} sm={4} md={6} lg={8} xl={4}><p className="delete-tag" onClick={() => mapStateToProps.deleteMessage(idx)}><CheckCircleOutlined /></p></Col>
                </Row> 
                    </div>
                  )
                })
              }
          </div>
        );
}

export default Todolistoutput;
