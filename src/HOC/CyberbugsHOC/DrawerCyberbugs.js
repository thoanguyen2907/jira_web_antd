import React, { useState } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

export default function DrawerCyberbugs() {
const {visible, ComponentDrawerContent, callBackSubmit} = useSelector(state => state.DrawerReducer); 
const dispatch =  useDispatch(); 
    const showDrawer = () => {
        dispatch({
             type: "OPEN_DRAWER"
    });
  };
  const onClose = () => {
    dispatch({
        type: "CLOSE_DRAWER"
});
  };

    return (
        <>
        <Button type="primary" onClick={showDrawer}>
          <PlusOutlined /> New account
        </Button>
        <Drawer
          title="Create a new account"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              {/* <Button onClick={ () => {callBackSubmit()}} type="primary">
                Submit
              </Button> */}
              <Button onClick={ (e)=>{
                    callBackSubmit(e)
              }  } type="primary">
                Submit
              </Button>
            </div>
          }
        >
          {ComponentDrawerContent}
        </Drawer>
      </>
    )
}
