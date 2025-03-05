import { create } from "zustand";

const useOMSetupstore=create((set)=>({
    option:[],
    addOption:()=>set((state)=>({option:[...state.option,0]})),
    deleteOption:(index)=>set((state)=>({option:state.option.filter((_, i) => i !== index)})),
    setOption: (value) => set({ option: value }),
    rowsData: [
        { "ShipTypes": "Measures1" },
        { "ShipTypes": "Measures2" }
       ],
    addRows:()=>set((state)=>({rowsData:[...state.rowsData, { "ShipTypes": "Measures3" }]})), 
    deleteRow:(index)=>set((state)=>({option:state.rowsData.splice(index,1)})),  
}))

export default useOMSetupstore;