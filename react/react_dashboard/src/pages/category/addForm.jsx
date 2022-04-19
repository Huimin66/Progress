import React from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'



function AddForm(props){


    AddForm.propTypes = {
        // categorys:PropTypes.array.isRequired,
        // categoryName: PropTypes.string.isRequired,
        // setClasses:PropTypes.func.isRequired,
        // setInput:PropTypes.func.isRequired
    }

    // const onFinish = ()=>{

    // }
    // const {categorys}= props
    return (
        <div>
            <Form>
                <Form.Item>
                    <Select defaultValue={0}>
                        <Select.Option value={0}>Main Category</Select.Option>
                        <Select.Option value={1}>电脑</Select.Option>
                        <Select.Option value={2}>图书</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Input  defaultValue={''} placeholder='Please enter category name'>
                    </Input>
                </Form.Item>
                
            </Form>
        </div>
    )
}

export default AddForm;