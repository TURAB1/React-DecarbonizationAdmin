import React, {useState, useEffect, useRef, useId } from 'react';
import InputNum from "../../components/InputNum/InputNum";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import InputSearch from "../../components/InputSearch/InputSearch";
import Switch from "../../components/Switch/Switch";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import useHeaderStore from '../../store/useHeaderStore';
import styles from "./graphType3.module.scss";

const GraphType3 = () => {
    const { setHeaderShow } = useHeaderStore();

    const handleClick = () => {
        alert("테스트")
    }

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelctChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    useEffect(() => {
        setHeaderShow(false);

    }, [setHeaderShow]);

  return (
    <section className='sample'>
        <div className="titleBox titleBox--type1">
            <div className='title'>
                Fuel Consumption
            </div>
        </div>
        <div className='grayBox'>
            <div className='grayBox__line'>
                <div className='grayBox__inner'>
                    <div className='grayBox__box'>
                        <div className='grayBox__tit'>Ship Selection</div>
                        <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Ship a" size="92px"/>
                    </div>
                    <div className='grayBox__box'>
                        <div className='grayBox__tit'>Ship Name</div>
                        <InputSearch placeholder="68.73" size="168px"/>
                    </div>
                    <div className='grayBox__box'>
                        <div className='grayBox__tit'>Period</div>
                        <div className='grayBox__calendar'>
                            <InputCalendar id="InputCalendar1" defaultValue="2023-01-01" size="134px"/>
                            <div className='grayBox__calendar-wave'>~</div>
                            <InputCalendar id="InputCalendar2" defaultValue="2023-01-01" size="134px"/>
                        </div>
                    </div>
                    <div className='grayBox__box'>
                        <div className='grayBox__tit'>Port Code</div>
                        <div className='grayBox__inputSearch'>
                            <InputSearch placeholder="search" size="168px"/>
                            <InputSearch placeholder="search" size="168px"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grayBox__line'>
                <div className='grayBox__box'>
                    <div className='grayBox__tit'>Status</div>
                    <div className='grayBox__switch'>
                        <Switch id="toggle1" defaultChecked={false} label="Reparture" />
                        <Switch id="toggle2" defaultChecked={false} label="COSP" />
                        <Switch id="toggle3" defaultChecked={false} label="Noon" />
                        <Switch id="toggle4" defaultChecked={false} label="EOSP" />
                        <Switch id="toggle5" defaultChecked={false} label="Arrival" />
                        <Switch id="toggle6" defaultChecked={false} label="Anchoring" />
                    </div>
                </div>
            </div>

            <div className='grayBox__line'>
                 <div className='grayBox__box'>
                    <div className='grayBox__tit'>Type</div>
                    <div className='grayBox__switch'>
                        <Switch id="toggle7" defaultChecked={false} label="HFO" />
                        <Switch id="toggle8" defaultChecked={false} label="LFP" />
                        <Switch id="toggle9" defaultChecked={false} label="MOD" />
                        <Switch id="toggle10" defaultChecked={false} label="LPG" />
                        <Switch id="toggle11" defaultChecked={false} label="Methanol" />
                        <Switch id="toggle12" defaultChecked={false} label="Ethanol" />
                        <Switch id="toggle13" defaultChecked={false} label="LNG" />
                        <Switch id="toggle14" defaultChecked={false} label="Other" />
                    </div>
                </div>
                <div className='grayBox__btn'>
                    <Button children="apply" onClick={handleClick} variant="blue" size="medium" icon='apply'/>
                </div>
            </div>
        </div>
        <div className='btnBox'>
            <Button children="Ship a" onClick={handleClick} icon="blueClose" />
            <Button children="Ship bbbbbb" onClick={handleClick} icon="blueClose" />
            <Button children="Ship accc" onClick={handleClick} icon="blueClose" />
            <Button children="Ship a_123" onClick={handleClick} icon="blueClose" />
        </div>
        <div style={{display:"flex", justifyContent: "center" ,alignItems: "center",  height: "539px",border: "1px solid #ddd"}}>
            Graph
        </div>
    </section>
  );
};

export default GraphType3;
