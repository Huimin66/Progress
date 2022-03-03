import React, { useState } from 'react'
import './index.less'
import logo from '../../assets/image/logo.png'
import {Link} from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import { useLocation } from "react-router-dom"

const { SubMenu } = Menu


function LeftNav(){
    const location = useLocation().pathname
    const [menuNodes]=useState(getMenuNodes(menuList))
   
    //which submenu should be opened, according to the path  
    function getOpenKey(menuList){
        return menuList.map(item=>{
            if(item.children?.find(cItem=>cItem.key===location))
                //console.log(item.key)
                return item.key 
        })
    }

    // map menuConfig to menu 
    function getMenuNodes(menuList){
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }else{              
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }



    return (
        <>
            <Link to='./' className='left-nav'>
                <header className='left-nav-header'>
                <img src={logo} alt="logo" />
                <h1>Admin</h1>
                </header>
            </Link>
            <Menu
                mode="inline"
                theme='dark'
                // onClick={this.handleClick}
                style={{ width: 256 }}
                selectedKeys={[location]} 
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={[getOpenKey(menuList)]}
               
            >
                {
                    // get menu from menuConfig file
                    menuNodes
                }                    
            </Menu>
        </>
    );
}

export default LeftNav;