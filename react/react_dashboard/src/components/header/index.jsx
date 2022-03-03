import React, { useState } from 'react';
import './index.less'
import LinkButton from '../link-button'
import axios from 'axios'
import { CloudOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom"
import menuList from '../../config/menuConfig'
import { Modal} from 'antd';
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions";

import { ExclamationCircleOutlined} from "@ant-design/icons";


const { confirm } = Modal;

function Header(props) {
    let navigate = useNavigate();
    const location = useLocation().pathname
    const user = props.user.username;
    const[currentTime, setCurrentTime] = useState(new Date().toLocaleString())
    const[city] = useState('Munich') // to be improved
    const[weather, setWeather]= useState('')


    // get weather
    const getWeather =() =>{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1b6a1aadf60567b67f4431b80eb8cd7b`

        axios.get(url).then((Response)=>{
            setWeather(Response.data.weather[0].main)       
        }).catch((Error)=>{
            console.log(Error)
        })
    }

    
    React.useEffect(()=>{
        getWeather()

        //set the current time, this will render the page every second,but is this function really necessory?
        // let timer = setInterval(() => {
        //     setCurrentTime(new Date().toLocaleString()) 
        // }, 1000)

        // return ()=>{
        //     clearInterval(timer)
        // }
    }, [])

    //get title
    const getTitle = (()=>{
        let title
        menuList.forEach(item=>{
            if(item.key === location){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem=>cItem.key===location)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        if(title === undefined){
            title = "Dashboard"
        }
        return title
    })

    const logout = ()=>{
        confirm({
            title: 'Do you Want to logout?',
            icon: <ExclamationCircleOutlined />,
 
            onOk() {
                props.logout()
                navigate("/Login", { replace: true });
            },
            onCancel() {
              //do nothing
            },
          });
    }


    return (
        <>
            <div className="header">
            <div className="header-top">
                <span>Welcome, {user}</span> 
                <LinkButton onClick={logout}>Sign Out</LinkButton>
            </div>
            <div className="header-bottom">
                <div className="header-bottom-left">
                <span>{getTitle()}</span>
                </div>
                <div className="header-bottom-right">
                <span>{currentTime} </span>
                <CloudOutlined
                    style={{ width: "30px", height: "20px", margin: "15 15 15 15" }}
                />
                <span>{weather}</span>
                </div>
            </div>
            </div>
        </>
        
    );
}

export default connect((state) => ({ user: state.user }), { logout })(Header);