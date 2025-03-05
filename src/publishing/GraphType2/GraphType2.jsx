import React, {useState, useEffect, useRef, useId } from 'react';
import InputNum from "../../components/InputNum/InputNum";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import InputSearch from "../../components/InputSearch/InputSearch";
import InputCalendar from "../../components/InputCalendar/InputCalendar";
import useHeaderStore from '../../store/useHeaderStore';
import styles from "./graphType2.module.scss";

const GraphType2 = () => {
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
                Navigation
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
                        <InputSearch placeholder="68.73" size="160px"/>
                    </div>
                    <div className='grayBox__box'>
                        <div className='grayBox__tit'>Period</div>
                        <div className='grayBox__calendar'>
                            <InputCalendar id="InputCalendar1" defaultValue="2023-01-01" size="134px"/>
                            <div className='grayBox__calendar-wave'>~</div>
                            <InputCalendar id="InputCalendar2" defaultValue="2023-01-01" size="134px"/>
                        </div>
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
        <div className={styles["box"]}>
            <div className={styles["box__big"]}>
                Graph
            </div>
            <div className={styles["box__right"]}>
                <div className={styles["box__inner"]}>
                    <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Ship a" size="100%"/>
                    <div className={styles["box__graph"]}>Graph</div>
                </div>
                <div className={styles["box__inner"]}>
                    <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Ship a" size="100%"/>
                    <div className={styles["box__graph"]}>Graph</div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default GraphType2;
