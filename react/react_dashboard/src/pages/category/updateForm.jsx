import React from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'



function UpdateForm(props){
    const {categoryName} = props

    UpdateForm.propTypes = {
        // categorys:PropTypes.array.isRequired,
        categoryName: PropTypes.string.isRequired,
        // setClasses:PropTypes.func.isRequired,
        // setInput:PropTypes.func.isRequired
    }


    // const {categorys}= props
    return (
        <div>
            <Form>
                <Form.Item>
                    <Input  defaultValue={categoryName} placeholder='Please enter category name'>
                    </Input>
                </Form.Item>
                
            </Form>
        </div>
    )
}

export default UpdateForm;