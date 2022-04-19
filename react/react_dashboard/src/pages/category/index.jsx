import React from 'react';
import { Card , Button, Table} from 'antd';
import LinkButton from '../../components/link-button'
import { useState } from 'react';
import {reqCategories, reqUpdateCategory} from '../../api/index'
import {ArrowRightOutlined} from "@ant-design/icons";
import { Modal } from 'antd';
import AddForm from './addForm';
import UpdateForm from './updateForm'

function Category(){

    const showAdd = ()=>{
        setIsModalVisible(1);
    }
    const extra = (
        //add category button
        <Button type='primary' onClick={showAdd}>More</Button>
    )

    const [category,setCategory] = useState('')
    const [curCategory, setCurCategory] = useState('')
    const [subcategory,setSubCategory] = useState('')
    const [column, setColumn] = useState([])
    const [loading, setLoading] = useState(false) 
    const [parentId, setParentId] = useState('0')
    const [parentName, setParentName] = useState('') 
    const [isModalVisible, setIsModalVisible] = useState(0) //0 do not show both, 1 show add, 2 show modify

    // we want to get the subcategories after we get parentId and parentName
    // getting parentId and parentName are asynchronous operations
    React.useEffect(()=>{
        setColumn(initColumns())
        getCategories()
    },[parentId,parentName])
      
    const initColumns = ()=>{
        return (
           [ {
                title: 'Category Name',
                dataIndex: 'name',
            },
            {
                title: 'Action',
                width:'40%',
                render:(category)=>(
                <>
                    
                    <LinkButton onClick={()=>showUpdate(category)}>Change Category</LinkButton>&nbsp;&nbsp;&nbsp;
                    {parentId==='0'?(<LinkButton onClick={()=>{showSubCategory(category)}}>Find Subcategories</LinkButton>):null
                    }
                </>
                )
            }]
        ) 
    } 

    const showSubCategory = (category)=>{
        setParentId(category._id)
        setParentName(category.name)
    }

    //get category
    const getCategories = async()=>{
        setLoading(true)//wenn loading,showing this to get a better user experience
        const result = await reqCategories(parentId)
        setLoading(false)//hide loading,after getting data
        if(result.status ===0){
            if(parentId === '0'){
                setCategory(result.data)
            }else{
                setSubCategory(result.data)
            }
        }else{
            console.log("get main category failed")  
        }
    }

    const goBackToMain = ()=>{
        setParentId('0')
        setParentName('')
        setSubCategory([])
    }

    const getTitle = ()=>{
        return (
            parentId==='0'
            ?'Main Category'
            :(<>
                <LinkButton onClick={goBackToMain}>Main Category</LinkButton>
                <ArrowRightOutlined/> &nbsp;
                <span>{parentName}</span>
            </>)
        )
    }

    const handleCancel = () => {
        setIsModalVisible(0);
    };
    const showUpdate = (curCategory)=>{
        setCurCategory(curCategory)//wenn click on update button, get and save the current category information
        setIsModalVisible(2);
    }
    const updateCategory = async (category) => {
        setIsModalVisible(0);
        const result = await reqUpdateCategory(category._id, category.name)
        if(result.status ===0){
            getCategories()
        }
    };
    
    const addCategory = () => {
        console.log('addCategory')
    };

    return (
        <Card title={getTitle()} extra={extra}>
            <Table 
                bordered
                rowKey='_id'
                dataSource={parentId==='0'?category:subcategory} 
                loading={loading}
                columns={column} 
                pagination = {{defaultPageSize:10, showQuickJumper:true}}/>

        <Modal title="Add new Items" visible={isModalVisible===1} onOk={addCategory} onCancel={handleCancel}>
            <AddForm categoryName = {category.name}/>
        </Modal>

        <Modal title="Modify Items" visible={isModalVisible===2} onOk={()=>updateCategory(category)} onCancel={handleCancel}>
            <UpdateForm categoryName={curCategory.name}/>
        </Modal>

        </Card>
        
    );
}

export default Category;