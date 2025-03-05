import React,{useEffect, useState} from 'react'
import OptionsGrid from './OptionsGrid'
import Button from '../../../components/Button/Button'
import styles from "./options_list.module.scss"
import OptionBlock from './OptionBlock'
import OptionRow from './OptionRow'
import useOMSetupstore from '../../../store/useOMSetupStore'

const OptionsList = () => {
    //const [optionBlock,setOptionBlock]=useState([])
    const option=useOMSetupstore((state)=>(state.option));
    const addOption=useOMSetupstore((state)=>(state.addOption));
    const rowsData=useOMSetupstore((state)=>(state.rowsData));

    useEffect(()=>{

    },[option,rowsData])
    return (
        <div>
            <section className="sample">
                <div className="titleBox titleBox--type1">
                    <h2 className="title">Options List</h2>
                </div>
                    <Button onClick={addOption} children="Add Options" variant="blue" size="medium" styles={{display:"flex",alignSelf:"center"}}/>
                <div style={{display:"flex",flexDirection:"row"}}>
                 {/* <OptionBlock/> */}
                 <OptionsGrid optionNumber={1}/>
                 {  
                    //  optionBlock.map(()=><OptionBlock/>)
                    option.map((item,index)=><OptionsGrid key={index} optionNumber={index+2}/>)
                 }
                 </div>
            </section>
        </div>
    )
}

export default OptionsList
