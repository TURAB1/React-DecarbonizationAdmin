import { useState } from 'react';
import Button from '../../../components/Button/Button'
import OptionRow from './OptionRow';
import styles from "./options_list.module.scss"
const  OptionBlock=()=>{
    const [rows,setRows]=useState([]);
    
    const addRows=()=>{
        setRows((row)=>[...row,4])
    }

    return(
        
        <div className={styles.optionBlock}>
        <div className={styles.title}>Ship Type</div>
        <div className={styles.optionItems}>Message1</div>
        <div className={styles.optionItems}>Message2</div>
        <div style={{display:"flex",flexDirection:"column"}}>
                 {
                    rows.map(()=><OptionRow/>)
                 }
                 </div>
        <Button onClick={addRows} children="  +  "  variant="blue" size="medium" />
       </div>
    )
} 
export default OptionBlock