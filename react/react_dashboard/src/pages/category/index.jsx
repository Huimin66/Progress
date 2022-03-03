import React from 'react';
import { Card , Button, Table, message} from 'antd';
import LinkButton from '../../components/link-button'
import { useState } from 'react';
import {reqCategories} from '../../api/index'

function Category(){
    const title = 'Main Category'
    const extra = (
        <Button type='primary'>
            <a href="#">More</a>
        </Button>
    )

    const [category] = useState('')
    const [column, setColumn] = useState([])
    const[loading, setLoading] = useState(false) 
    const[parentId] = useState('0')
    const[parentName] = useState('')

    const dataSource = [
        {
            "_id": "5e12b8bce31bb727e4b0e348",
            "parentId": "0",
            "name": "Domestic Appliances",
            "__v": 0
        },
        {
            "_id":  "5e130e60e31bb727e4b0e34b",
            "parentId": "0",
            "name": "Smart Phone",
            "__v": 0
        },
        {
            "_id": "5e1346533ed02518b4db0cd7",
            "parentId": "0",
            "name": "Books",
            "__v": 0
        },
        {
            "_id": "5e144dc7297c1138787e96ab",
            "parentId": "0",
            "name": "Apparels",
            "__v": 0
        },
        {
            "_id": "5e144de1297c1138787e96ac",
            "parentId": "0",
            "name": "Toys",
            "__v": 0
        }
    ];

    React.useEffect(()=>{
        initColumns()
        console.log(column)
    },[])
      
    const initColumns = ()=>{
        setColumn(
           [ {
                title: 'Category Name',
                dataIndex: 'name',
            },
            {
                title: 'Action',
                width:'40%',
                render:()=>(
                <>
                    
                    <LinkButton>Change Category</LinkButton>&nbsp;&nbsp;&nbsp;
                    <LinkButton>Find Subcategories</LinkButton>
                </>
                )
            }]
        ) 
    } 

    //get first class category
    const getCategories = async()=>{
        setLoading(true)
        const result = await reqCategories('0')
        setLoading(false)
        if(result.status ===0){
            const categories =  result.data
        }else{
            console.log("get first class category failed")
        }
    }
    return (
        <Card title={title} extra={extra}>
            <Table 
                bordered
                rowKey='_id'
                // dataSource={category} 
                dataSource={dataSource} 
                loading={loading}
                columns={column} 
                pagination = {{defaultPageSize:10, showQuickJumper:true}}/>;
        </Card>
    );
}

export default Category;