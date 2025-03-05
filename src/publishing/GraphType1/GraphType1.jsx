import React, {useState, useEffect, useRef, useId } from 'react';
import InputNum from "../../components/InputNum/InputNum";
import Select from "../../components/Select/Select";
import Button from "../../components/Button/Button";
import useHeaderStore from '../../store/useHeaderStore';
import styles from "./graphType1.module.scss";

const GraphType1 = () => {
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
                EUA Price
            </div>
        </div>
        <div className='grayBox'>
            <div className='grayBox__line'>
                <div className='grayBox__inner'>
                    <div className='grayBox__box'>
                        <div className='grayBox__tit'>EUA Price</div>
                        <InputNum placeholder="숫자를 입력하세요" size="160px"/>
                    </div>
                    <div className='grayBox__box'>
                        <div className='grayBox__tit'>Exchange rate(1 EUR to USD)</div>
                        <InputNum placeholder="숫자를 입력하세요" size="160px"/>
                    </div>
                    <div className='grayBox__box'>
                        <div className='grayBox__tit'>EUA Select</div>
                        <Select options={options} value={selectedOption} onChange={handleSelctChange} placeholder="Last Price" size="106px"/>
                    </div>
                </div>
                <div className='grayBox__btn'>
                    <Button children="apply" onClick={handleClick} variant="blue" size="medium" icon='apply'/>
                </div>
            </div>
        </div>
        <div style={{display:"flex", justifyContent: "center" ,alignItems: "center",  height: "539px",border: "1px solid #ddd"}}>
            Graph
        </div>
    </section>
  );
};

export default GraphType1;
