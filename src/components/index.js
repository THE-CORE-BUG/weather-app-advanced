import React,{useState,useEffect} from 'react';
import {InputGroup,FormControl,Button} from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import { IoSunnyOutline, IoRainy } from "react-icons/io5";
import { WiSunset,WiHumidity,WiDayCloudy, WiDayHaze } from "react-icons/wi";
import { BiWind } from "react-icons/bi";
import { GiSpeedometer } from "react-icons/gi";

import './style.css'

const Index = () => {
    const [city,setCity] = useState("Kolkata");
    const [datas,setDatas] = useState("sunny");
    const [temp3,setTemp3] = useState("Kolkata");
    const [info,setInfo] = useState("");

    useEffect(()=>{
        const set = async() =>
        {
            try {
                const url=`https://api.openweathermap.org/data/2.5/weather?q=${temp3}&units=metric&appid=25fc3358b185748a4b8452df1ac2ff6c`;
                const res = await fetch(url);
                const data = await res.json();
                console.log(data);
                const { main:mood } = data.weather[0];
                const { country, sunset } = data.sys;
                const { speed } = data.wind;
                const { humidity, temp, pressure } = data.main;

                let sec = sunset;
                let date = new Date(sec*1000);
                let time = `${date.getHours()}:${date.getMinutes()}`;

                let date2=new Date();
                let date3=`${date2.getDate()}-${date2.getMonth()}-${date2.getFullYear()}`;

                let img="";
                if(mood)
                {
                    switch(mood)
                    {
                        case 'Cloudy':
                            img = <WiDayCloudy />;
                            break;
                        case 'Rain':
                            img = <IoRainy />;
                            break;
                        case 'Haze':
                            img = <WiDayHaze />;
                            break;
                        default:
                            img = <IoSunnyOutline />;
                    }
                    setInfo(img);
                }


                const temp2 = { mood, country, sunset, speed, humidity, temp, pressure,time, date3 };
                setDatas(temp2);
            } catch (error) {
                console.log(error);
            }
        }
        set();
        
    },[temp3]);
    
    
    

    return (
        <Container>
            <Row>
                
                <div className="input">
                    <InputGroup className="mb-3" onChange={e => setCity(e.target.value)}>
                        <FormControl placeholder="Search City..." />
                        <Button variant="outline-secondary" onClick={() => setTemp3(city)}>
                            Search
                        </Button>
                    </InputGroup>
                </div>
            </Row>


            <Row>
                <div className="main">
                   
                    <div className="main-icon">
                        {info}
                        
                    </div>
                        
                    <div className="main-temp" md="6">
                        
                        
                        
                        <Row>
                            <Col>
                                <h1 style={{'paddingLeft': '10px'}}>{datas.temp}&deg;c </h1>
                            </Col>

                            <Col>
                                <h3>{temp3}<br /></h3>
                                {datas.country}                     
                            </Col>

                            <Col>
                                <br /> 
                            </Col>

                            <Col>
                                <h2>{datas.mood}</h2>
                            </Col>
                        </Row>
                    </div>

                    <div className="main-date" md="6">
                        {datas.date3}
                    </div>

                    <div className="main-info mt-3">
                        <Row>

                            <Col>
                                <Row style={{'justifyContent': 'center'}}>
                                    <Col>
                                    <WiSunset />
                                    </Col>
                                    <Col>
                                        <Row>
                                            {datas.time} <br/>
                                        </Row>
                                        <Row>
                                        <h4 style={{'marginLeft': '-25px','fontSize': '13px'}}>Sunset</h4>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            

                            <Col>
                                <Row style={{'justifyContent': 'center'}}>
                                    <Col>
                                    <BiWind />
                                    </Col>
                                    <Col>
                                        <Row>
                                            {datas.speed} <br/>
                                        </Row>
                                        <Row>
                                        <h4 style={{'marginLeft': '-25px','fontSize': '13px'}}>Wind Speed</h4>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>

                            
                            <Col>
                                <Row style={{'justifyContent': 'center'}}>
                                    <Col>
                                    <WiHumidity />
                                    </Col>
                                    <Col>
                                        <Row>
                                            {datas.humidity} <br/>
                                        </Row>
                                        <Row>
                                        <h4 style={{'marginLeft': '-25px','fontSize': '13px'}}>Humidity</h4>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>


                            <Col>
                                <Row style={{'justifyContent': 'center'}}>
                                    <Col>
                                        <GiSpeedometer />
                                    </Col>
                                    <Col>
                                        <Row>
                                            {datas.pressure} <br/>
                                        </Row>
                                        <Row>
                                        <h4 style={{'marginLeft': '-25px','fontSize': '13px'}}>Pressure</h4>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                   
                    
                    
                </div>
            </Row>
        </Container>
    )
}

export default Index
